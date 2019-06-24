<template>
  <div class="models">
    <b-row>
      <b-col lg="12">
        <h2>Add New Model</h2>
      </b-col>
      <b-col lg="12">
        <b-row class="form-group">
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" for="brand">Brand *</label>
              <b-form-select
                id="brand"
                :plain="true"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.brand,
                  'is-invalid': isValidated && !validated.brand
                }"
                :options="brandOptions"
                :value="formData.brand || null"
                @change="updateFormData($event, 'brand')"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Title *</label>
              <input
                id="modelTitle"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.modelTitle,
                  'is-invalid': isValidated && !validated.modelTitle,
                }"
                :value="formData.modelTitle"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Image *</label>
              <input
                id="modelImage"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.modelImage,
                  'is-invalid': isValidated && !validated.modelImage,
                }"
                :value="formData.modelImage"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="6">
            <b-form-group>
              <label class="col-form-label">Short Description of Model *</label>
              <b-form-textarea
                id="modelDescription"
                :value="formData.modelDescription"
                placeholder="Enter Description for Model ..."
                rows="6"
                max-rows="9"
                :class="{
                  'is-valid': isValidated && validated.modelDescription,
                  'is-invalid': isValidated && !validated.modelDescription,
                }"
                @change="updateFormData($event, 'modelDescription')"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="6">
            <b-form-group>
              <label class="col-form-label">Meta Description of Model</label>
              <b-form-textarea
                id="metaDescription"
                :value="formData.metaDescription"
                placeholder="Enter Meta Description for Model ..."
                rows="6"
                max-rows="9"
                @change="updateFormData($event, 'metaDescription')"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>
              <label class="col-form-label">SEO text of Model *</label>
              <b-form-textarea
                id="seoText"
                :value="formData.seoText"
                placeholder="Enter SEO text for model ..."
                rows="6"
                max-rows="9"
                :class="{
                  'is-valid': isValidated && validated.seoText,
                  'is-invalid': isValidated && !validated.seoText,
                }"
                @change="updateFormData($event, 'seoText')"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Title Tag</label>
              <input
                id="titleTag"
                type="text"
                class="form-control"
                :value="formData.titleTag"
                @change="updateFormData($event)"
              >
            </b-form-group>
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
        <b-button type="submit" variant="primary" @click="createModel()">
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
  name: 'NewModel',
  data: () => ({
    formData: {},
    brandOptions: [
      {
        text: 'Select a brand',
        value: null,
        disabled: true
      }
    ],
    validated: {
      brand: null,
      modelTitle: null,
      modelImage: null,
      modelDescription: null,
      seoText: null
    },
    isValidated: false,
    modelId: undefined,
    loading: false
  }),
  mounted() {
    axios.get(`/api/v1/brands`).then(response => {
      const data = response.data.results || []
      data.forEach(item => {
        this.brandOptions.push({ text: this.capitalize(item.name), value: item.id })
      })
    })
  },
  methods: {
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    createModel() {
      const valid = this.validateData()
      if (valid) {
        this.resetValidate()
        const data = _.pickBy(this.formData, _.identity)
        axios.post('/api/v1/models/', {
          ...data
        }).then(response => {
          this.$router.push('/models')
        })
      }
    },
    reset() {
      this.formData = {}
      this.resetValidate()
    },
    cancel() {
      this.$router.push('/models')
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
      _.map(this.formData, (value, key) => {
        this.validated[key] = false
        if (value) {
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
select {
  border: 1px solid #c2cfd6;
}
.models select.form-control {
  height: 36px;
}
.row.form-group {
  margin-bottom: 1rem;
  margin: 2.5rem -15px;
}
.models {
  margin-bottom: 80px;
}
.actions-group {
  padding: 15px;
}
.actions-group .btn {
  border-radius: 5px;
  padding: 6px 15px;
}
</style>
