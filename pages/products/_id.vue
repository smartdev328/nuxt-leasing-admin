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
              <b-form-select id="brand"
                :plain="true"
                class="form-control is-valid"
                :options="brandOptions"
                :value="null">
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group>
              <label class="col-form-label" >Model *</label>
              <input type="text" class="form-control is-valid" id="inputIsValid">
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
              <input type="text" class="form-control is-valid" id="inputIsValid">
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Variant *</label>
              <input type="text" class="form-control is-valid" id="inputIsValid">
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Year *</label>
              <input type="number" class="form-control is-valid" id="inputIsValid">
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
              <input type="text" class="form-control is-valid" id="inputIsValid">
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6"></b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Thumbnail1</label>
              <input type="text" class="form-control" id="inputIsValid">
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Thumbnail2</label>
              <input type="text" class="form-control" id="inputIsValid">
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Thumbnail3</label>
              <input type="text" class="form-control" id="inputIsValid">
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Thumbnail4</label>
              <input type="text" class="form-control" id="inputIsValid">
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="6">
            <b-form-group>
              <label class="col-form-label" >Short Description of Product</label>
              <b-form-textarea
                id="textarea"
                v-model="text"
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
                id="textarea"
                v-model="text"
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
                <b-form-input id="elementsPrependAppend" type="number"></b-form-input>
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
                          <b-form-checkbox-group id="leasingperiods-checkboxes">
                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="leasingperiods1" value="1">
                  <label class="custom-control-label" for="leasingperiods1">12 months</label>
                </div>
                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="leasingperiods2" value="2" checked>
                  <label class="custom-control-label" for="leasingperiods2">24 months</label>
                </div>
                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="leasingperiods3" value="3">
                  <label class="custom-control-label" for="leasingperiods3">36 months</label>
                </div>
                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="leasingperiods4" value="4">
                  <label class="custom-control-label" for="leasingperiods4">48 months</label>
                </div>
                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="leasingperiods5" value="5">
                  <label class="custom-control-label" for="leasingperiods5">60 months</label>
                </div>
                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="leasingperiods6" value="6">
                  <label class="custom-control-label" for="leasingperiods6">72 months</label>
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
          <b-col lg="3">
            <b-input-group>
              <b-input-group-prepend>
                <b-input-group-text>12 Months</b-input-group-text>
              </b-input-group-prepend>
              <b-form-input id="elementsPrependAppend" type="number"></b-form-input>
            </b-input-group>
          </b-col>
          <b-col lg="3">
            <b-input-group>
              <b-input-group-prepend>
                <b-input-group-text>24 Months</b-input-group-text>
              </b-input-group-prepend>
              <b-form-input id="elementsPrependAppend" type="number"></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" >Start Kilometer *</label>
              <input type="number" class="form-control" id="inputIsValid">
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" >End Kilometer *</label>
              <input type="number" class="form-control" id="inputIsValid">
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" >Interval Kilometer *</label>
              <input type="number" class="form-control" id="inputIsValid">
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
                <b-form-input id="inputIsValid" type="number"></b-form-input>
              </b-input-group>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <!-- Size -->
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label" >Size</label>
              <b-form-select id="basicSelectLg"
                :plain="true"
                :options="sizeOptions"
                :value="null">
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <!-- Product Professions -->
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" >Product Professions</label>
              <b-form-checkbox-group stacked id="professions-checkboxes">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="professions1" value="1" checked>
                  <label class="custom-control-label" for="professions1">Plumber</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="professions2" value="2">
                  <label class="custom-control-label" for="professions2">Carpenter</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="professions3" value="3">
                  <label class="custom-control-label" for="professions3">Electrician</label>
                </div>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <!-- Colors -->
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" >Colors</label>
              <b-form-checkbox-group stacked id="colors-checkboxes">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="colors1" value="1" checked>
                  <label class="custom-control-label" for="colors1">White</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="colors2" value="2">
                  <label class="custom-control-label" for="colors2">Black</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="colors3" value="3">
                  <label class="custom-control-label" for="colors3">Red</label>
                </div>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <!-- Categories -->
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" >Categories</label>
              <b-form-checkbox-group stacked id="categories-checkboxes">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="categories1" value="1" checked>
                  <label class="custom-control-label" for="categories1">A Smiths Choice</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="categories2" value="2">
                  <label class="custom-control-label" for="categories2">A Plumbers Favorite</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="categories3" value="3">
                  <label class="custom-control-label" for="categories3">Easy and Handy</label>
                </div>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <!-- Equipments -->
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label" >Equipments</label>
              <b-form-checkbox-group stacked id="equipments-checkboxes">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="equipments1" value="1" checked>
                  <label class="custom-control-label" for="equipments1">Snow Tires</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="equipments2" value="2">
                  <label class="custom-control-label" for="equipments2">Tow</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="equipments3" value="3">
                  <label class="custom-control-label" for="equipments3">Seat Warmer</label>
                </div>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="justify-content-between align-items-center actions-group">
      <div>
        <b-button type="button" variant="success"><i class="fa fa-ban"></i> Reset</b-button>
      </div>
      <div>
        <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Save</b-button>
        &nbsp;&nbsp;
        <b-button type="button" variant="danger"><i class="fa fa-trash"></i> Delete</b-button>
      </div>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'products',
  data: () => ({
    brandOptions: [
      {
        text: 'Select a brand',
        value: null,
        disabled: true,
      },
      {
        text: 'Volkswagen',
        value: 1
      },
      {
        text: 'Volvo',
        value: 2
      },
      {
        text: 'Mazda',
        value: 3
      },
      {
        text: 'BMW',
        value: 4
      },
      {
        text: 'Mercedes',
        value: 5
      },
      {
        text: 'Ford',
        value: 6
      },
      {
        text: 'Nissan',
        value: 7
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
        value: 1
      },
      {
        text: 'Medium',
        value: 2
      },
      {
        text: 'Large',
        value: 3
      },
    ]
  }),
  mounted() {
    this.getProducts(1)
  },
  methods: {
    getProducts(pageNum) {
      this.currentPage = pageNum
      this.loading = true
      axios.get('/api/v1/products/', {
        params: {
          limit: this.perPage,
          offset: (this.currentPage - 1) * this.perPage + 0,
        }
      }).then(response => {
        this.products = response.data.results
        this.totalRows = response.data.total
        this.loading = false
        const startIndex = (this.currentPage - 1) * this.perPage + 1
        const endIndex = this.currentPage * this.perPage > this.totalRows ? this.totalRows : this.currentPage * this.perPage
        this.header = `List of All Products (${startIndex} - ${endIndex} / ${this.totalRows})`
      })
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
}
</style>
