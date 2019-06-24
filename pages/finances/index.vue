<template>
  <div class="finances">
    <b-row>
      <b-col lg="12">
        <h2>Edit Finances</h2>
      </b-col>
      <b-col lg="12">
        <b-row class="form-group">
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Rate *</label>
              <b-input-group
                class="form-control append"
                :class="{
                  'is-valid': isValidated && validated.rate,
                  'is-invalid': isValidated && !validated.rate
                }"
              >
                <b-form-input
                  id="rate"
                  type="number"
                  :value="formData.rate"
                  @change="updateFormData(parseFloat($event, 10), 'rate')"
                />
                <b-input-group-append>
                  <b-input-group-text>%</b-input-group-text>
                </b-input-group-append>
              </b-input-group>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Downpayment1 *</label>
              <b-input-group
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.downpayment1,
                  'is-invalid': isValidated && !validated.downpayment1
                }"
              >
                <b-input-group-prepend>
                  <b-input-group-text>$</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  id="downpayment1"
                  type="number"
                  placeholder="Enter amount of first downpayment choice"
                  :value="formData.downpayment1"
                  @change="updateFormData(parseInt($event, 10), 'downpayment1')"
                />
              </b-input-group>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Downpayment2</label>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text>$</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  id="downpayment2"
                  type="number"
                  placeholder="Enter amount of second downpayment choice"
                  :value="formData.downpayment2"
                  @change="updateFormData(parseInt($event, 10), 'downpayment2')"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Downpayment3</label>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text>$</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  id="downpayment3"
                  type="number"
                  placeholder="Enter amount of third downpayment choice"
                  :value="formData.downpayment3"
                  @change="updateFormData(parseInt($event, 10), 'downpayment3')"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <div v-if="loading" class="text-center text-danger my-2">
              <b-spinner class="align-middle" />
              <strong>Loading...</strong>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="justify-content-between align-items-center actions-group">
      <div>
        <b-button type="button" variant="success" @click="reset()">
          <i class="fa fa-ban" /> Reset
        </b-button>
      </div>
      <div>
        <b-button type="submit" variant="primary" @click="updateFinance()">
          <i class="fa fa-dot-circle-o" /> Save
        </b-button>
      </div>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import * as _ from 'lodash'

export default {
  name: 'EditFinance',
  data: () => ({
    loading: false,
    formData: {},
    validated: {
      rate: null,
      downpayment1: null
    },
    isValidated: false,
    financeId: 1
  }),
  mounted() {
    this.loading = true
    axios.get(`/api/v1/finances/${this.financeId}`).then(response => {
      this.formData = response.data.data
      this.loading = false
    })
  },
  methods: {
    updateFinance() {
      const valid = this.validateData()
      if (valid) {
        this.resetValidate()
        this.loading = true
        // const data = _.pickBy(this.formData, value => value !== undefined && value !== null && !isNaN(value))
        // console.log('------- data:', data)
        axios.put(`/api/v1/finances/${this.financeId}`, {
          rate: this.formData.rate,
          downpayment1: this.formData.downpayment1,
          downpayment2: this.formData.downpayment2,
          downpayment3: this.formData.downpayment3
        })
          .then(response => {
            this.loading = false
            this.$message.success('Update Succeed!', 1, () => {
              this.$router.push('/finances')
            })
          })
          .catch(() => {
            this.loading = false
            this.$message.error('Update Failed!')
          })
      }
    },
    reset() {
      this.resetValidate()
      axios.get(`/api/v1/finances/${this.financeId}`).then(response => {
        this.formData = response.data.data
      })
    },
    updateFormData(e, property = undefined) {
      this.resetValidate()
      const name = property || e.target.id
      const value = _.isObject(e) ? e.target.value : e
      this.formData = _.cloneDeep(this.formData)
      this.formData[name] = value
    },
    resetValidate() {
      this.isValidated = false
      _.map(this.validated, (value, key) => {
        this.validated[key] = null
      })
    },
    validateData() {
      let valid = true
      this.isValidated = true
      _.map(this.validated, (value, key) => {
        if (this.formData[key] || this.formData[key] === 0) {
          this.validated[key] = true
        }
      })
      _.map(this.validated, (value, key) => {
        if (!value) {
          valid = false
        }
      })
      return valid
    }
  }
}
</script>
<style scope>
.row.form-group {
  margin-bottom: 1rem;
  margin: 2.5rem -15px;
}
.finances {
  margin-bottom: 80px;
}
.actions-group {
  padding: 15px;
}
</style>
