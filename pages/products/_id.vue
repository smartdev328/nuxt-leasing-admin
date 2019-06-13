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
                @change="updateFormData($event, 'brand')"
                :value="formData.brand || null">
              </b-form-select>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group>
              <label class="col-form-label" >Model *</label>
              <input
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.model,
                  'is-invalid': isValidated && !validated.model
                }"
                id="model"
                @change="updateFormData($event)"
                :value="formData.model"
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
              <label class="col-form-label" >oVariant *</label>
              <input
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.oVariant,
                  'is-invalid': isValidated && !validated.oVariant,
                }"
                id="oVariant"
                @change="updateFormData($event)"
                :value="formData.oVariant"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Variant *</label>
              <input
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.variant,
                  'is-invalid': isValidated && !validated.variant,
                }"
                id="variant"
                @change="updateFormData($event)"
                :value="formData.variant"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Year *</label>
              <input
                type="number"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.year,
                  'is-invalid': isValidated && !validated.year,
                }"
                id="year"
                @change="updateFormData($event)"
                :value="formData.year"
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
              <label class="col-form-label" >Primary Image *</label>
              <input
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.primaryImage,
                  'is-invalid': isValidated && !validated.primaryImage,
                }"
                id="primaryImage"
                @change="updateFormData($event)"
                :value="formData.primaryImage"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6"></b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Thumbnail1</label>
              <input
                type="text"
                class="form-control"
                id="thumbnail1"
                @change="updateFormData($event)"
                :value="formData.thumbnail1"
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Thumbnail2</label>
              <input
                type="text"
                class="form-control"
                id="thumbnail2"
                @change="updateFormData($event)"
                :value="formData.thumbnail2"
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Thumbnail3</label>
              <input
                type="text"
                class="form-control"
                id="thumbnail3"
                @change="updateFormData($event)"
                :value="formData.thumbnail3"
              />
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Thumbnail4</label>
              <input
                type="text"
                class="form-control"
                id="thumbnail4"
                @change="updateFormData($event)"
                :value="formData.thumbnail4"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="6">
            <b-form-group>
              <label class="col-form-label" >Short Description of Product</label>
              <b-form-textarea
                :value="formData.shortDescription"
                id="shortDescription"
                @change="updateFormData($event, 'shortDescription')"
                placeholder="Enter something..."
                rows="6"
                max-rows="9"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>
              <label class="col-form-label" >Long Description of Product</label>
              <b-form-textarea
                id="longDescription"
                @change="updateFormData($event, 'longDescription')"
                :value="formData.longDescription"
                placeholder="Enter something..."
                rows="6"
                max-rows="9"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Acquisition Cost *</label>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text>$</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  type="number"
                  id="acquisitionCost"
                  :class="{
                    'is-valid': isValidated && validated.acquisitionCost,
                    'is-invalid': isValidated && !validated.acquisitionCost
                  }"
                  @change="updateFormData(parseInt($event, 10), 'acquisitionCost')"
                  :value="formData.acquisitionCost"
                ></b-form-input>
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
                    type="checkbox"
                    class="custom-control-input"
                    :id="`leasingperiods${index}`"
                    :checked="formData.leasingPeriods && formData.leasingPeriods[index]"
                    name="leasingPeriods"
                    :value="item"
                    @change="updateMultiCheckFormData" >
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
              <b-form-input id="elementsPrependAppend" type="number" name="scrapValues" :value="formData.scrapValues[index]" @change="updateArrayFormData('scrapValues', $event, index)"  ></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" >Start Kilometer *</label>
              <b-form-input
                type="number"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.startKilometer,
                  'is-invalid': isValidated && !validated.startKilometer,
                }"
                id="startKilometer"
                @change="updateFormData(parseInt($event, 10), 'startKilometer')"
                :value="formData.startKilometer"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" >End Kilometer *</label>
              <b-form-input
                type="number"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.endKilometer,
                  'is-invalid': isValidated && !validated.endKilometer,
                }"
                id="endKilometer"
                @change="updateFormData(parseInt($event, 10), 'endKilometer')"
                :value="formData.endKilometer"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" >Interval Kilometer *</label>
              <b-form-input
                type="number"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.intervalKilometer,
                  'is-invalid': isValidated && !validated.intervalKilometer,
                }"
                id="intervalKilometer"
                @change="updateFormData(parseInt($event, 10), 'intervalKilometer')"
                :value="formData.intervalKilometer"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" >Interval Price *</label>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text>$</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  type="number"
                  id="intervalPrice"
                  :class="{
                    'is-valid': isValidated && validated.intervalPrice,
                    'is-invalid': isValidated && !validated.intervalPrice,
                  }"
                  @change="updateFormData(parseInt($event, 10), 'intervalPrice')"
                  :value="formData.intervalPrice"
                ></b-form-input>
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
              <label class="col-form-label" >Size *</label>
              <b-form-select
                :plain="true"
                :options="sizeOptions"
                id="size"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.size,
                  'is-invalid': isValidated && !validated.size,
                }"
                @change="updateFormData($event, 'size')"
                :value="formData.size || null">
              </b-form-select>
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
              <label class="col-form-label" >Product Professions</label>
              <b-form-checkbox-group stacked id="professions-checkboxes">
                <div v-for="(item, index) in professionsArr" :key="index" class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    :id="`professions${index}`"
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
              <label class="col-form-label" >Colors *</label>
              <b-form-checkbox-group
                stacked
                id="colors-checkboxes"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.colors,
                  'is-invalid': isValidated && !validated.colors,
                }"
              >
                <div v-for="(item, index) in colorsArr" :key="index" class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    :id="`colors${index}`"
                    name="colors"
                    :value="item.id"
                    :checked="formData.colors && formData.colors.indexOf(item.id) > -1"
                    @change="updateMultiCheckFormData"
                  />
                  <label class="custom-control-label" :for="`colors${index}`" >{{ item.name }}</label>
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
              <label class="col-form-label" >Categories</label>
              <b-form-checkbox-group stacked id="categories-checkboxes">
                <div v-for="(item, index) in categoriesArr" :key="index" class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    :id="`categories${index}`"
                    name="categories"
                    :value="item.id"
                    :checked="formData.categories && formData.categories.indexOf(item.id) > -1"
                    @change="updateMultiCheckFormData"
                  />
                  <label class="custom-control-label" :for="`categories${index}`">{{ item.name }}</label>
                </div>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <!-- Equipments -->
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" >Equipments</label>
              <b-form-checkbox-group stacked id="equipments-checkboxes">
                <div v-for="(item, index) in equipmentsArr" :key="index" class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    :id="`equipments${index}`"
                    name="equipments"
                    :value="item.id"
                    :checked="formData.equipments && formData.equipments.indexOf(item.id) > -1"
                    @change="updateMultiCheckFormData"
                  />
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
        <b-button type="button" variant="success" @click="reset()"><i class="fa fa-ban"></i> Reset</b-button>
      </div>
      <div>
        <b-button type="submit" variant="primary" @click="updateProduct()"><i class="fa fa-dot-circle-o"></i> Save</b-button>
        &nbsp;&nbsp;
        <b-button type="button" variant="danger" @click="deleteProduct()"><i class="fa fa-trash"></i> Delete</b-button>
      </div>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import * as _ from 'lodash';

export default {
  name: 'products',
  data: () => ({
    formData: {},
    brandOptions: [
      {
        text: 'Select a brand',
        value: null,
        disabled: true,
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
      },
    ],
    sizeOptions: [
      {
        text: 'Select a size',
        value: null,
        disabled: true,
      },
      {
        text: 'Small',
        value: 'small'
      },
      {
        text: 'Medium',
        value: 'medium',
      },
      {
        text: 'Large',
        value: 'large',
      },
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
        name: 'A Smiths Choice',
      },
      {
        id: 2,
        name: 'A Plumbers Favorite',
      },
      {
        id: 3,
        name: 'Easy and Handy',
      },
    ],
    equipmentsArr: [
      {
        id: 1,
        name: 'Snow Tires',
      },
      {
        id: 2,
        name: 'Tow',
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
      colors: null,
    },
    isValidated: false,
    productId: undefined,
  }),
  mounted() {
    this.formData['scrapValues'] = [];
    this.formData['leasingPeriods'] = [];
    this.productId = this.$route.params.id;
    axios.get(`/api/v1/products/${this.productId}`).then(response => {
      this.formData = response.data.data;
      if (this.formData.colors) {
        this.formData.colors = this.formData.colors.map(color => color.id);
      }
      if (this.formData.professions) {
        this.formData.professions = this.formData.professions.map(color => color.id);
      }
      if (this.formData.categories) {
        this.formData.categories = this.formData.categories.map(color => color.id);
      }
      if (this.formData.equipments) {
        this.formData.equipments = this.formData.equipments.map(color => color.id);
      }
      console.log('----------- form data:', this.formData)
    });
  },
  methods: {
    updateProduct() {
      const valid = this.validateData();
      if (valid) {
        console.log('---------- upudate product');
        this.resetValidate();
        axios.put(`/api/v1/products/${this.productId}`, {
          ...this.formData,
        }).then(response => {
          this.$router.push('/products');
        });
      }
    },
    reset() {
      resetValidate();
      axios.get(`/api/v1/products/${this.productId}`).then(response => {
        this.formData = response.data.data;
      });
    },
    deleteProduct() {
      axios.delete(`/api/v1/products/${this.productId}`).then(response => {
        this.$router.push('/products');
      });
    },
    updateFormData(e, property = undefined) {
      this.resetValidate();
      const name = property ? property : e.target.id;
      const value = _.isObject(e) ? e.target.value : e;
      this.formData = _.cloneDeep(this.formData);
      this.formData[name] = value;
    },
    updateArrayFormData(name, value, index) {
      this.resetValidate();
      this.formData = _.cloneDeep(this.formData);
      this.formData[name][index] = parseInt(value, 10);
    },
    updateMultiCheckFormData(e) {
      this.resetValidate();
      const name = e.target.name;
      const checked = e.target.checked;
      const value = parseInt(e.target.value, 10);
      this.formData = _.cloneDeep(this.formData);
      if (checked) {
        if (!this.formData[name]) {
          this.formData[name] = [];
        }
        this.formData[name].push(value);
        if (name === 'leasingPeriods') {
          this.formData['scrapValues'].push(0);
        }
      } else {
        const removeItemIndex = this.formData[name].indexOf(value);
        if (removeItemIndex > -1) {
          this.formData[name].splice(removeItemIndex, 1);
          if (name === 'leasingPeriods') {
            this.formData['scrapValues'].splice(removeItemIndex, 1);
          }
        }
      }
    },
    resetValidate() {
      this.isValidated = false;
      _.map(this.validated, (value, key) => {
        this.validated[key] = null;
      });
    },
    validateData() {
      let valid = true;
      this.isValidated = true;
      _.map(this.formData, (value, key) => {
        if (key === 'leasingPeriods' || key === 'colors') {
          if (value && value.length > 0) {
            this.validated[key] = true;
          }
        }
        if (value) {
          this.validated[key] = true;
        }
      });
      _.map(this.validated, (value, key) => {
        if (!value) {
          valid = false;
        }
      });
      return valid;
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
