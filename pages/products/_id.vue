<template>
  <div class="products">
    <b-row>
      <b-col lg="12">
        <h2>Brand + Model</h2>
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
          <b-col cols="4">
            <b-form-group>
              <label class="col-form-label">Model *</label>
              <input
                id="model"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.model,
                  'is-invalid': isValidated && !validated.model
                }"
                :value="formData.model"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">oVariant *</label>
              <input
                id="oVariant"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.oVariant,
                  'is-invalid': isValidated && !validated.oVariant,
                }"
                :value="formData.oVariant"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Variant *</label>
              <input
                id="variant"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.variant,
                  'is-invalid': isValidated && !validated.variant,
                }"
                :value="formData.variant"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Year *</label>
              <input
                id="year"
                type="number"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.year,
                  'is-invalid': isValidated && !validated.year,
                }"
                :value="formData.year"
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
              <label class="col-form-label">Primary Image *</label>
              <input
                id="primaryImage"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.primaryImage,
                  'is-invalid': isValidated && !validated.primaryImage,
                }"
                :value="formData.primaryImage"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" />
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Thumbnail1</label>
              <input
                id="thumbnail1"
                type="text"
                class="form-control"
                :value="formData.thumbnail1"
                @change="updateFormData($event)"
              >
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Thumbnail2</label>
              <input
                id="thumbnail2"
                type="text"
                class="form-control"
                :value="formData.thumbnail2"
                @change="updateFormData($event)"
              >
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Thumbnail3</label>
              <input
                id="thumbnail3"
                type="text"
                class="form-control"
                :value="formData.thumbnail3"
                @change="updateFormData($event)"
              >
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Thumbnail4</label>
              <input
                id="thumbnail4"
                type="text"
                class="form-control"
                :value="formData.thumbnail4"
                @change="updateFormData($event)"
              >
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="6">
            <b-form-group>
              <label class="col-form-label">Short Description of Product</label>
              <b-form-textarea
                id="shortDescription"
                :value="formData.shortDescription"
                placeholder="Enter something..."
                rows="6"
                max-rows="9"
                @change="updateFormData($event, 'shortDescription')"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>
              <label class="col-form-label">Long Description of Product</label>
              <b-form-textarea
                id="longDescription"
                :value="formData.longDescription"
                placeholder="Enter something..."
                rows="6"
                max-rows="9"
                @change="updateFormData($event, 'longDescription')"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Acquisition Cost *</label>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text>$</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  id="acquisitionCost"
                  type="number"
                  :class="{
                    'is-valid': isValidated && validated.acquisitionCost,
                    'is-invalid': isValidated && !validated.acquisitionCost
                  }"
                  :value="formData.acquisitionCost"
                  @change="updateFormData(parseInt($event, 10), 'acquisitionCost')"
                />
              </b-input-group>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="12">
            <b-form-group>
              <label class="col-form-label" for="leasingperiods-checkboxes">Leasing Periods *</label>
              <b-form-checkbox-group
                id="leasingperiods-checkboxes"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.leasingPeriods,
                  'is-invalid': isValidated && !validated.leasingPeriods,
                }"
              >
                <div v-for="(item, index) in [12,24,36,48,60,72]" :key="index" class="custom-control custom-checkbox custom-control-inline">
                  <input
                    :id="`leasingperiods${index}`"
                    type="checkbox"
                    class="custom-control-input"
                    :checked="formData.leasingPeriods && formData.leasingPeriods[index]"
                    name="leasingPeriods"
                    :value="item"
                    @change="updateMultiCheckFormData"
                  >
                  <label class="custom-control-label" :for="`leasingperiods${index}`">{{ item }} months</label>
                </div>
              </b-form-checkbox-group>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <label class="col-form-label">Scrap values *</label>
          </b-col>
          <b-col v-for="(item, index) in formData.leasingPeriods" :key="index" lg="3">
            <b-input-group>
              <b-input-group-prepend>
                <b-input-group-text>{{ item }} months</b-input-group-text>
              </b-input-group-prepend>
              <b-form-input id="elementsPrependAppend" type="number" name="scrapValues" :value="formData.scrapValues[index]" @change="updateArrayFormData('scrapValues', $event, index)" />
            </b-input-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Start Kilometer *</label>
              <b-form-input
                id="startKilometer"
                type="number"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.startKilometer,
                  'is-invalid': isValidated && !validated.startKilometer,
                }"
                :value="formData.startKilometer"
                @change="updateFormData(parseInt($event, 10), 'startKilometer')"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">End Kilometer *</label>
              <b-form-input
                id="endKilometer"
                type="number"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.endKilometer,
                  'is-invalid': isValidated && !validated.endKilometer,
                }"
                :value="formData.endKilometer"
                @change="updateFormData(parseInt($event, 10), 'endKilometer')"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Interval Kilometer *</label>
              <b-form-input
                id="intervalKilometer"
                type="number"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.intervalKilometer,
                  'is-invalid': isValidated && !validated.intervalKilometer,
                }"
                :value="formData.intervalKilometer"
                @change="updateFormData(parseInt($event, 10), 'intervalKilometer')"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Interval Price *</label>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text>$</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  id="intervalPrice"
                  type="number"
                  :class="{
                    'is-valid': isValidated && validated.intervalPrice,
                    'is-invalid': isValidated && !validated.intervalPrice,
                  }"
                  :value="formData.intervalPrice"
                  @change="updateFormData(parseInt($event, 10), 'intervalPrice')"
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
              <label class="col-form-label">Size *</label>
              <b-form-select
                id="size"
                :plain="true"
                :options="sizeOptions"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.size,
                  'is-invalid': isValidated && !validated.size,
                }"
                :value="formData.size || null"
                @change="updateFormData($event, 'size')"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <!-- Product Professions -->
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Product Professions</label>
              <b-form-checkbox-group id="professions-checkboxes" stacked>
                <div v-for="(item, index) in professionsArr" :key="index" class="custom-control custom-checkbox">
                  <input
                    :id="`professions${index}`"
                    type="checkbox"
                    class="custom-control-input"
                    name="professions"
                    :checked="formData.professions && formData.professions.indexOf(item.id) > -1"
                    :value="item.id"
                    @change="updateMultiCheckFormData"
                  >
                  <label class="custom-control-label" :for="`professions${index}`">{{ item.name }}</label>
                </div>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <!-- Colors -->
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Colors *</label>
              <b-form-checkbox-group
                id="colors-checkboxes"
                stacked
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.colors,
                  'is-invalid': isValidated && !validated.colors,
                }"
              >
                <div v-for="(item, index) in colorsArr" :key="index" class="custom-control custom-checkbox">
                  <input
                    :id="`colors${index}`"
                    type="checkbox"
                    class="custom-control-input"
                    name="colors"
                    :value="item.id"
                    :checked="formData.colors && formData.colors.indexOf(item.id) > -1"
                    @change="updateMultiCheckFormData"
                  >
                  <label class="custom-control-label" :for="`colors${index}`">{{ item.name }}</label>
                </div>
              </b-form-checkbox-group>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <!-- Categories -->
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Categories</label>
              <b-form-checkbox-group id="categories-checkboxes" stacked>
                <div v-for="(item, index) in categoriesArr" :key="index" class="custom-control custom-checkbox">
                  <input
                    :id="`categories${index}`"
                    type="checkbox"
                    class="custom-control-input"
                    name="categories"
                    :value="item.id"
                    :checked="formData.categories && formData.categories.indexOf(item.id) > -1"
                    @change="updateMultiCheckFormData"
                  >
                  <label class="custom-control-label" :for="`categories${index}`">{{ item.name }}</label>
                </div>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <!-- Equipments -->
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Equipments</label>
              <b-form-checkbox-group id="equipments-checkboxes" stacked>
                <div v-for="(item, index) in equipmentsArr" :key="index" class="custom-control custom-checkbox">
                  <input
                    :id="`equipments${index}`"
                    type="checkbox"
                    class="custom-control-input"
                    name="equipments"
                    :value="item.id"
                    :checked="formData.equipments && formData.equipments.indexOf(item.id) > -1"
                    @change="updateMultiCheckFormData"
                  >
                  <label class="custom-control-label" :for="`equipments${index}`">{{ item.name }}</label>
                </div>
              </b-form-checkbox-group>
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
        <b-button type="submit" variant="primary" @click="updateProduct()">
          <i class="fa fa-dot-circle-o" /> Save
        </b-button>
        &nbsp;&nbsp;
        <b-button type="button" variant="danger" @click="deleteProduct()">
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
  name: 'Products',
  data: () => ({
    formData: {},
    brandOptions: [
      {
        text: 'Select a brand',
        value: null,
        disabled: true
      },
      {
        text: 'Volkswagen',
        value: 'Volkswagen'
      },
      {
        text: 'Volvo',
        value: 'Volvo'
      },
      {
        text: 'Mazda',
        value: 'Mazda'
      },
      {
        text: 'BMW',
        value: 'BMW'
      },
      {
        text: 'Mercedes',
        value: 'Mercedes'
      },
      {
        text: 'Ford',
        value: 'Ford'
      },
      {
        text: 'Nissan',
        value: 'Nissan'
      }
    ],
    sizeOptions: [
      {
        text: 'Select a size',
        value: null,
        disabled: true
      },
      {
        text: 'Small',
        value: 'small'
      },
      {
        text: 'Medium',
        value: 'medium'
      },
      {
        text: 'Large',
        value: 'large'
      }
    ],
    professionsArr: [
      {
        id: 1,
        name: 'Plumber'
      },
      {
        id: 2,
        name: 'Carpenter'
      },
      {
        id: 3,
        name: 'Electrician'
      }
    ],
    colorsArr: [
      {
        id: 1,
        name: 'White'
      },
      {
        id: 2,
        name: 'Black'
      },
      {
        id: 3,
        name: 'Red'
      }
    ],
    categoriesArr: [
      {
        id: 1,
        name: 'A Smiths Choice'
      },
      {
        id: 2,
        name: 'A Plumbers Favorite'
      },
      {
        id: 3,
        name: 'Easy and Handy'
      }
    ],
    equipmentsArr: [
      {
        id: 1,
        name: 'Snow Tires'
      },
      {
        id: 2,
        name: 'Tow'
      },
      {
        id: 3,
        name: 'Seat Warmer'
      }
    ],
    validated: {
      brand: null,
      model: null,
      oVariant: null,
      variant: null,
      year: null,
      primaryImage: null,
      acquisitionCost: null,
      leasingPeriods: null,
      startKilometer: null,
      endKilometer: null,
      intervalKilometer: null,
      intervalPrice: null,
      size: null,
      colors: null
    },
    isValidated: false,
    productId: undefined
  }),
  mounted() {
    this.formData.scrapValues = []
    this.formData.leasingPeriods = []
    this.productId = this.$route.params.id
    axios.get(`/api/v1/products/${this.productId}`).then(response => {
      this.formData = response.data.data
      if (this.formData.colors) {
        this.formData.colors = this.formData.colors.map(color => color.id)
      }
      if (this.formData.professions) {
        this.formData.professions = this.formData.professions.map(color => color.id)
      }
      if (this.formData.categories) {
        this.formData.categories = this.formData.categories.map(color => color.id)
      }
      if (this.formData.equipments) {
        this.formData.equipments = this.formData.equipments.map(color => color.id)
      }
      console.log('----------- form data:', this.formData)
    })
  },
  methods: {
    updateProduct() {
      const valid = this.validateData()
      if (valid) {
        console.log('---------- upudate product')
        this.resetValidate()
        axios.put(`/api/v1/products/${this.productId}`, {
          ...this.formData
        }).then(response => {
          this.$router.push('/products')
        })
      }
    },
    reset() {
      this.resetValidate()
      axios.get(`/api/v1/products/${this.productId}`).then(response => {
        this.formData = response.data.data
      })
    },
    deleteProduct() {
      axios.delete(`/api/v1/products/${this.productId}`).then(response => {
        this.$router.push('/products')
      })
    },
    updateFormData(e, property = undefined) {
      this.resetValidate()
      const name = property || e.target.id
      const value = _.isObject(e) ? e.target.value : e
      this.formData = _.cloneDeep(this.formData)
      this.formData[name] = value
    },
    updateArrayFormData(name, value, index) {
      this.resetValidate()
      this.formData = _.cloneDeep(this.formData)
      this.formData[name][index] = parseInt(value, 10)
    },
    updateMultiCheckFormData(e) {
      this.resetValidate()
      const name = e.target.name
      const checked = e.target.checked
      const value = parseInt(e.target.value, 10)
      this.formData = _.cloneDeep(this.formData)
      if (checked) {
        if (!this.formData[name]) {
          this.formData[name] = []
        }
        this.formData[name].push(value)
        if (name === 'leasingPeriods') {
          this.formData.scrapValues.push(0)
        }
      } else {
        const removeItemIndex = this.formData[name].indexOf(value)
        if (removeItemIndex > -1) {
          this.formData[name].splice(removeItemIndex, 1)
          if (name === 'leasingPeriods') {
            this.formData.scrapValues.splice(removeItemIndex, 1)
          }
        }
      }
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
        if (key === 'leasingPeriods' || key === 'colors') {
          if (value && value.length > 0) {
            this.validated[key] = true
          }
        }
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
.products select.form-control {
  height: 36px;
}
.row.form-group {
  margin-bottom: 1rem;
  margin: 2.5rem -15px;
}
.products {
  margin-bottom: 80px;
}
.actions-group {
  padding: 15px;
}
.actions-group .btn {
  border-radius: 5px;
  padding: 6px 15px;
}
.custom-control.custom-checkbox {
  margin: 0 15px;
}
#leasingperiods-checkboxes {
  margin: 0 -15px;
  background: transparent;
  border: none;
}
#colors-checkboxes {
  background: transparent;
  border: none;
  height: auto;
}
</style>
