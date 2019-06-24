<template>
  <div class="professions">
    <b-row>
      <b-col lg="12">
        <h2>Add New Profession</h2>
      </b-col>
      <b-col lg="12">
        <b-row class="form-group">
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Profession Name *</label>
              <input
                id="name"
                type="text"
                class="form-control"
                placeholder="Enter profession name"
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
                  placeholder="Enter price of profession"
                  :value="formData.price"
                  @change="updateFormData(parseInt($event, 10), 'price')"
                />
              </b-input-group>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Icon</label>
              <input
                id="icon"
                type="text"
                placeholder="Enter URL of icon"
                class="form-control"
                :value="formData.icon"
                @change="updateFormData($event)"
              >
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Link</label>
              <input
                id="link"
                type="text"
                placeholder="Enter URL of link"
                class="form-control"
                :value="formData.link"
                @change="updateFormData($event)"
              >
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="8">
            <b-form-group>
              <label class="col-form-label">Short Description</label>
              <b-form-textarea
                id="shortDescription"
                :value="formData.shortDescription"
                placeholder="Enter short description of the profession ..."
                rows="6"
                max-rows="9"
                @change="updateFormData($event, 'shortDescription')"
              />
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
        <b-button type="submit" variant="primary" @click="createProfession()">
          <i class="fa fa-dot-circle-o" /> Create
        </b-button>
        &nbsp;&nbsp;
        <b-button type="button" variant="danger" @click="cancel()">
          <i class="fa fa-close" /> Cancel
        </b-button>
      </div>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import * as _ from 'lodash'

export default {
  name: 'NewProfession',
  data: () => ({
    formData: {},
    validated: {
      name: null,
      price: null
    },
    isValidated: false,
    loading: false
  }),
  methods: {
    createProfession() {
      const valid = this.validateData()
      if (valid) {
        this.resetValidate()
        this.loading = true
        // const data = _.pickBy(this.formData, _.identity)
        axios.post('/api/v1/professions/', {
          name: this.formData.name,
          price: this.formData.price,
          icon: this.formData.icon || '',
          shortDescription: this.formData.shortDescription || '',
          link: this.formData.link || ''
        })
          .then(response => {
            this.loading = false
            this.$message.success('Successfully Created!', 1, () => {
              this.$router.push('/professions')
            })
          })
          .catch(() => {
            this.loading = false
            this.$message.error('Failed to create!', () => {
              this.$router.push('/professions')
            })
          })
      }
    },
    reset() {
      this.formData = {}
      this.resetValidate()
    },
    cancel() {
      this.$router.push('/professions')
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
        this.validated[key] = false
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
.professions {
  margin-bottom: 80px;
}
.actions-group {
  padding: 15px;
}
</style>
