<template>
  <div class="products">
    <b-row>
      <b-col lg="12">
        <h2>Add New Product</h2>
      </b-col>
      <b-col lg="12">
        <b-row>
          <b-col lg="12">
            <div v-if="loading" class="text-center text-danger my-2">
              <b-spinner class="align-middle" />
              <strong>Loading...</strong>
            </div>
          </b-col>
        </b-row>
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
              <label class="col-form-label" for="model">Model *</label>
              <b-form-select
                id="model"
                :plain="true"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.model,
                  'is-invalid': isValidated && !validated.model
                }"
                :options="filteredModelOptions"
                :value="formData.model || null"
                @change="updateFormData($event, 'model')"
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
        <b-row>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Economy</label>
              <b-input-group>
                <b-form-input
                  id="economy"
                  type="number"
                  :value="formData.economy"
                  @change="updateFormData($event, 'economy')"
                />
                <b-input-group-append>
                  <b-input-group-text>Km / L</b-input-group-text>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Motor</label>
              <b-input-group>
                <b-form-input
                  id="motor"
                  type="number"
                  :value="formData.motor"
                  @change="updateFormData($event, 'motor')"
                />
                <b-input-group-append>
                  <b-input-group-text>hk</b-input-group-text>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" for="fuelType">Fuel Type</label>
              <b-form-select
                id="fuelType"
                :plain="true"
                class="form-control"
                :options="fuelTypeOptions"
                :value="formData.fuelType || null"
                @change="updateFormData($event, 'fuelType')"
              />
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" for="fuelType">Gear Type</label>
              <b-form-select
                id="gear"
                :plain="true"
                class="form-control"
                :options="gearOptions"
                :value="formData.gear || null"
                @change="updateFormData($event, 'gear')"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Doors</label>
              <b-form-input
                id="doors"
                type="number"
                :value="formData.doors"
                @change="updateFormData($event, 'doors')"
              />
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Energy Label</label>
              <input
                id="energyLabel"
                type="text"
                class="form-control"
                :value="formData.energyLabel"
                @change="updateFormData($event)"
              >
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Cargo Size</label>
              <b-form-input
                id="cargoSize"
                type="number"
                :value="formData.cargoSize"
                @change="updateFormData($event, 'cargoSize')"
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
                <div v-for="index in 6" :key="index" class="custom-control custom-checkbox custom-control-inline">
                  <input
                    :id="`leasingperiods${index}`"
                    type="checkbox"
                    class="custom-control-input"
                    name="leasingPeriods"
                    :value="index * 12"
                    @change="updateMultiCheckFormData"
                  >
                  <label class="custom-control-label" :for="`leasingperiods${index}`">{{ 12 * index }} months</label>
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
          <template v-for="(item, index) in formData.scrapValues">
            <b-col v-if="item !== undefined" :key="index" lg="3">
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text>{{ 12 * (index + 1) }} months</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input id="elementsPrependAppend" type="number" name="scrapValues" :value="formData.scrapValues[index]" @change="updateArrayFormData('scrapValues', $event, index)" />
              </b-input-group>
            </b-col>
          </template>
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
        <b-button type="submit" variant="primary" @click="createProduct()">
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

import * as _ from 'lodash'

export default {
  name: 'NewProduct',
  middleware: 'guest',
  data: () => ({
    formData: {},
    brandOptions: [
      {
        text: 'Select a brand',
        value: null,
        disabled: true
      }
    ],
    modelOptions: [
      {
        text: 'Select a model',
        value: null,
        disabled: true
      }
    ],
    filteredModelOptions: [],
    sizeOptions: [
      {
        text: 'Select a size',
        value: null,
        disabled: true
      }
    ],
    professionsArr: [],
    colorsArr: [],
    categoriesArr: [],
    equipmentsArr: [],
    fuelTypeOptions: [
      {
        text: 'Select a Fuel Type',
        value: null,
        disabled: true
      },
      {
        text: 'Benzin',
        value: 'benzin'
      },
      {
        text: 'Diesel',
        value: 'diesel'
      },
      {
        text: 'Elektrisk',
        value: 'elektrisk'
      }
    ],
    gearOptions: [
      {
        text: 'Select a Gear type',
        value: null,
        disabled: true
      },
      {
        text: 'Manuelt',
        value: 'manuelt'
      },
      {
        text: 'Automatisk',
        value: 'automatisk'
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
    productId: undefined,
    loading: false
  }),
  mounted() {
    this.loading = true
    this.formData.scrapValues = new Array(6).fill(undefined) // 12, 24, 36, 48, 60, 72
    this.formData.leasingPeriods = []
    this.$axios.get(`/brands`).then(response => {
      const data = response.data.results || []
      data.forEach(item => {
        this.brandOptions.push({ text: this.capitalize(item.name), value: item.id })
      })
    })
    this.$axios.get(`/models`).then(response => {
      const data = response.data.results || []
      data.forEach(item => {
        this.modelOptions.push({ text: this.capitalize(item.modelTitle), value: item.id, brand: item.brand.id })
        this.filteredModelOptions = _.cloneDeep(this.modelOptions)
        this.loading = false
      })
    })
    this.$axios.get(`/sizes`).then(response => {
      const data = response.data.results || []
      data.forEach(item => {
        this.sizeOptions.push({ text: this.capitalize(item.name), value: item.id })
      })
    })
    this.$axios.get(`/professions`).then(response => {
      this.professionsArr = response.data.results || []
    })
    this.$axios.get(`/colors`).then(response => {
      this.colorsArr = response.data.results || []
    })
    this.$axios.get(`/categories`).then(response => {
      this.categoriesArr = response.data.results || []
    })
    this.$axios.get(`/equipments`).then(response => {
      this.equipmentsArr = response.data.results || []
    })
  },
  methods: {
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    createProduct() {
      const valid = this.validateData()
      if (valid) {
        this.resetValidate()
        // const data = _.pickBy(this.formData, _.identity)
        this.$axios.post('/products/', {
          brand: this.formData.brand,
          model: this.formData.model,
          oVariant: this.formData.oVariant,
          variant: this.formData.variant,
          year: this.formData.year,
          primaryImage: this.formData.primaryImage,
          acquisitionCost: this.formData.acquisitionCost,
          leasingPeriods: _.sortBy(this.formData.leasingPeriods),
          startKilometer: this.formData.startKilometer,
          endKilometer: this.formData.endKilometer,
          intervalKilometer: this.formData.intervalKilometer,
          intervalPrice: this.formData.intervalPrice,
          size: this.formData.size,
          colors: this.formData.colors,
          scrapValues: _.filter(this.formData.scrapValues, value => value !== undefined),
          thumbnail1: this.formData.thumbnail1 || '',
          thumbnail2: this.formData.thumbnail2 || '',
          thumbnail3: this.formData.thumbnail3 || '',
          thumbnail4: this.formData.thumbnail4 || '',
          shortDescription: this.formData.shortDescription || '',
          longDescription: this.formData.longDescription || '',
          professions: this.formData.professions || [],
          categories: this.formData.categories || [],
          equipments: this.formData.equipments || [],
          economy: this.formData.economy || '',
          fuelType: this.formData.fuelType || '',
          doors: this.formData.doors || '',
          motor: this.formData.motor || '',
          cargoSize: this.formData.cargoSize || '',
          gear: this.formData.gear || '',
          energyLabel: this.formData.energyLabel || ''
        }).then(response => {
          this.$router.push('/products')
        })
      }
    },
    reset() {
      this.formData = {}
      this.resetValidate()
    },
    cancel() {
      this.$router.push('/products')
    },
    updateFormData(e, property = undefined) {
      this.resetValidate()
      const name = property || e.target.id
      const value = _.isObject(e) ? e.target.value : e
      this.formData = _.cloneDeep(this.formData)
      this.formData[name] = value
      if (property === 'brand') {
        const brandObj = _.find(this.brandOptions, { value })
        this.filteredModelOptions = this.modelOptions.filter(item => item.brand === brandObj.value)
        this.formData.model = null
        this.filteredModelOptions.unshift({
          text: 'Select a model',
          value: null,
          disabled: true
        })
      }
      if (property === 'model') {
        const modelObj = _.find(this.modelOptions, { value })
        const brandObj = _.find(this.brandOptions, { value: modelObj.brand })
        this.formData.brand = brandObj.value
      }
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
          this.formData.scrapValues[value / 12 - 1] = 0
        }
      } else {
        const removeItemIndex = this.formData[name].indexOf(value)
        if (removeItemIndex > -1) {
          this.formData[name].splice(removeItemIndex, 1)
          if (name === 'leasingPeriods') {
            this.formData.scrapValues[value / 12 - 1] = undefined
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
      _.map(this.validated, (value, key) => {
        this.validated[key] = false
        if (this.formData[key]) {
          this.validated[key] = true
        }
        if (key === 'leasingPeriods' || key === 'colors') {
          if (this.formData[key] && this.formData[key].length > 0) {
            this.validated[key] = true
          } else {
            this.validated[key] = false
          }
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
