<template>
  <div class="equipments">
    <b-row>
      <b-col lg="12">
        <h2>Edit Equipment - {{ formData.name }}</h2>
      </b-col>
      <b-col lg="12">
        <b-row class="form-group">
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Equipment Name *</label>
              <input
                id="name"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.name,
                  'is-invalid': isValidated && !validated.name
                }"
                :value="formData.name"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Price *</label>
              <b-input-group
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.price,
                  'is-invalid': isValidated && !validated.price
                }"
              >
                <b-input-group-prepend>
                  <b-input-group-text>$</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  id="price"
                  type="number"
                  :value="formData.price"
                  @change="updateFormData(parseInt($event, 10), 'price')"
                />
              </b-input-group>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>
              <label class="col-form-label">Icon</label>
              <input
                id="icon"
                type="text"
                class="form-control"
                :value="formData.icon"
                @change="updateFormData($event)"
              >
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
        <b-button type="submit" variant="primary" @click="updateEquipment()">
          <i class="fa fa-dot-circle-o" /> Save
        </b-button>
        &nbsp;&nbsp;
        <b-button type="button" variant="danger" @click="deleteEquipment()">
          <i class="fa fa-trash" /> Delete
        </b-button>
      </div>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import * as _ from 'lodash'

export default {
  name: 'EditEquipment',
  middleware: 'guest',
  data: () => ({
    loading: false,
    formData: {},
    validated: {
      name: null,
      price: null
    },
    isValidated: false,
    equipmentId: undefined
  }),
  mounted() {
    this.equipmentId = this.$route.params.id
    this.loading = true
    axios.get(`/api/v1/equipments/${this.equipmentId}`).then(response => {
      this.formData = response.data.data
      this.loading = false
    })
  },
  methods: {
    updateEquipment() {
      const valid = this.validateData()
      if (valid) {
        this.resetValidate()
        this.loading = true
        // const data = _.pickBy(this.formData, _.identity)
        axios.put(`/api/v1/equipments/${this.equipmentId}`, {
          name: this.formData.name,
          price: this.formData.price,
          icon: this.formData.icon || ''
        })
          .then(response => {
            this.loading = false
            this.$message.success('Update Succeed!', 1, () => {
              this.$router.push('/equipments')
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
      axios.get(`/api/v1/equipments/${this.equipmentId}`).then(response => {
        this.formData = response.data.data
      })
    },
    deleteEquipment() {
      this.loading = true
      axios.delete(`/api/v1/equipments/${this.equipmentId}`)
        .then(response => {
          this.loading = false
          this.$message.success('Successfully Removed!', 1, () => {
            this.$router.push('/equipments')
          })
        })
        .catch(() => {
          this.loading = false
          this.$message.error('Failed to remove!', () => {
            this.$router.push('/equipments')
          })
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
        if (this.formData[key]) {
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
.equipments {
  margin-bottom: 80px;
}
.actions-group {
  padding: 15px;
}
</style>
