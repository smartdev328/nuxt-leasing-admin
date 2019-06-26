<template>
  <div class="categories">
    <b-row>
      <b-col lg="12">
        <h2>Add New Category</h2>
      </b-col>
      <b-col lg="12">
        <b-row class="form-group">
          <b-col cols="4">
            <b-form-group>
              <label class="col-form-label">Category Name *</label>
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
        <b-button type="submit" variant="primary" @click="createCategory()">
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
  name: 'NewCategories',
  middleware: 'guest',
  data: () => ({
    formData: {},
    validated: {
      name: null
    },
    isValidated: false,
    loading: false
  }),
  mounted() {
    this.formData.scrapValues = []
  },
  methods: {
    createCategory() {
      const valid = this.validateData()
      if (valid) {
        this.resetValidate()
        this.loading = true
        axios.post('/api/v1/categories/', {
          ...this.formData
        })
          .then(response => {
            this.loading = false
            this.$message.success('Successfully Created!', 1, () => {
              this.$router.push('/categories')
            })
          })
          .catch(() => {
            this.loading = false
            this.$message.error('Failed to create!', () => {
              this.$router.push('/categories')
            })
          })
      }
    },
    reset() {
      this.formData = {}
      this.resetValidate()
    },
    cancel() {
      this.$router.push('/categories')
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
.row.form-group {
  margin-bottom: 1rem;
  margin: 2.5rem -15px;
}
.categories {
  margin-bottom: 80px;
}
.actions-group {
  padding: 15px;
}
</style>
