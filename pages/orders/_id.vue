<template>
  <div class="page order-edit">
    <b-row>
      <b-col lg="12">
        <h2>Edit Order</h2>
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
        <b-row class="justify-content-end">
          <a-radio-group :key="count" :value="formData.status" button-style="solid" @change="showMsgBoxOne($event)">
            <a-radio-button value="AWAITING_CONTACT" class="AWAITING_CONTACT">
              Awaiting Contact
            </a-radio-button>
            <a-radio-button value="WAITING" class="WAITING">
              Waiting
            </a-radio-button>
            <a-radio-button value="FINISHED" class="FINISHED">
              Finished
            </a-radio-button>
            <a-radio-button value="NOT_INTERESTED" class="NOT_INTERESTED">
              Not Interested
            </a-radio-button>
          </a-radio-group>
        </b-row>
        <b-row class="form-group">
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">First Name *</label>
              <input
                id="firstName"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.firstName,
                  'is-invalid': isValidated && !validated.firstName
                }"
                :value="formData.firstName"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Last Name *</label>
              <input
                id="lastName"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.lastName,
                  'is-invalid': isValidated && !validated.lastName
                }"
                :value="formData.lastName"
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
              <label class="col-form-label">Email *</label>
              <input
                id="email"
                type="email"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.email,
                  'is-invalid': isValidated && !validated.email
                }"
                :value="formData.email"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Phone *</label>
              <input
                id="phone"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.phone,
                  'is-invalid': isValidated && !validated.phone
                }"
                :value="formData.phone"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="12">
            <h4>Shipping Address</h4>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Street *</label>
              <input
                id="addressStreet"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.addressStreet,
                  'is-invalid': isValidated && !validated.addressStreet
                }"
                :value="formData.addressStreet"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">City *</label>
              <input
                id="addressCity"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.addressCity,
                  'is-invalid': isValidated && !validated.addressCity
                }"
                :value="formData.addressCity"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Zipcode *</label>
              <input
                id="addressZipcode"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.addressZipcode,
                  'is-invalid': isValidated && !validated.addressZipcode
                }"
                :value="formData.addressZipcode"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="12">
            <h4>Company Info</h4>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Company Name *</label>
              <input
                id="companyName"
                type="text"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.companyName,
                  'is-invalid': isValidated && !validated.companyName
                }"
                :value="formData.companyName"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">CVR *</label>
              <input
                id="cvr"
                type="number"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.cvr,
                  'is-invalid': isValidated && !validated.cvr
                }"
                :value="formData.cvr"
                @change="updateFormData(parseInt($event.target.value, 10), 'cvr')"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Company Industry *</label>
              <b-form-select
                id="companyIndustry"
                :plain="true"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.companyIndustry,
                  'is-invalid': isValidated && !validated.companyIndustry
                }"
                :options="companyIndustryOptions"
                :value="formData.companyIndustry || null"
                @change="updateFormData($event, 'companyIndustry')"
              />
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">Number of Employees *</label>
              <input
                id="numberOfEmployees"
                type="number"
                class="form-control"
                :class="{
                  'is-valid': isValidated && validated.numberOfEmployees,
                  'is-invalid': isValidated && !validated.numberOfEmployees
                }"
                :value="formData.numberOfEmployees"
                @change="updateFormData(parseInt($event.target.value, 10), 'numberOfEmployees')"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group>
              <label class="col-form-label">NewsLetter</label>
              <input
                id="newsletter"
                type="checkbox"
                class="form-control"
                :checked="formData.newsletter"
                @change="updateCheckboxFormData($event)"
              >
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="12">
            <h4>Order Comments</h4>
          </b-col>
          <b-col lg="6">
            <b-form-group>
              <label class="col-form-label">Message</label>
              <b-form-textarea
                id="message"
                :value="formData.message"
                placeholder="Enter message ..."
                rows="6"
                max-rows="9"
                @change="updateFormData($event, 'message')"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>
              <label class="col-form-label">Comments</label>
              <b-form-textarea
                id="comments"
                :value="formData.comments"
                placeholder="Enter comments ..."
                rows="6"
                max-rows="9"
                @change="updateFormData($event, 'comments')"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="form-group">
          <b-col lg="12">
            <h4>Ordered Product Details</h4>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Brand *</label>
              <input
                id="brand"
                type="text"
                class="form-control"
                :value="formData.brand"
                disabled
                @change="updateFormData($event)"
              >
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Model *</label>
              <input
                id="model"
                type="text"
                :value="formData.model"
                class="form-control"
                disabled
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Variant *</label>
              <input
                id="variant"
                type="text"
                class="form-control"
                :value="formData.variant"
                disabled
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Leasing Period *</label>
              <input
                id="leasingPeriod"
                type="number"
                class="form-control"
                disabled
                :value="formData.leasingPeriod"
                @change="updateFormData(parseInt($event.target.value, 10), 'leasingPeriod')"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Kilometers *</label>
              <input
                id="kilometers"
                type="number"
                disabled
                class="form-control"
                :value="formData.kilometers"
                @change="updateFormData(parseInt($event.target.value, 10), 'kilometers')"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Color *</label>
              <input
                id="color"
                type="text"
                class="form-control"
                disabled
                :value="formData.color.hexValue"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Profession *</label>
              <input
                id="profession"
                type="text"
                class="form-control"
                disabled
                :value="formData.profession"
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Equipment *</label>
              <input
                id="equipment"
                type="text"
                class="form-control"
                :value="formData.equipment"
                disabled
                @change="updateFormData($event)"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">DownPayment *</label>
              <input
                id="downPayment"
                type="number"
                class="form-control"
                disabled
                :value="formData.downPayment"
                @change="updateFormData(parseInt($event.target.value, 10), 'downPayment')"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group>
              <label class="col-form-label">Monthly Price *</label>
              <input
                id="monthlyPrice"
                type="number"
                disabled
                class="form-control"
                :value="formData.monthlyPrice"
                @change="updateFormData(parseInt($event.target.value, 10), 'monthlyPrice')"
              >
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
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
        <b-button type="submit" variant="primary" @click="updateOrder()">
          <i class="fa fa-dot-circle-o" /> Save
        </b-button>
        &nbsp;&nbsp;
        <b-button type="button" variant="danger" @click="deleteOrder()">
          <i class="fa fa-trash" /> Delete
        </b-button>
      </div>
    </b-row>
  </div>
</template>

<script>

import * as _ from 'lodash'

export default {
  name: 'EditOrder',
  middleware: 'guest',
  data: () => ({
    loading: false,
    formData: {
      color: {}
    },
    validated: {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      companyName: null,
      numberOfEmployees: null,
      companyIndustry: null,
      cvr: null,
      addressStreet: null,
      addressZipcode: null,
      addressCity: null
    },
    isValidated: false,
    orderId: undefined,
    companyIndustryOptions: [
      {
        text: 'Select a Company Industry',
        value: null,
        disabled: true
      },
      {
        text: 'Bussiness',
        value: 'bussiness'
      },
      {
        text: 'Enterprise',
        value: 'enterprise'
      },
      {
        text: 'Company',
        value: 'company'
      }
    ],
    defaultFormData: {},
    count: 0
  }),
  mounted() {
    this.loading = true
    this.orderId = this.$route.params.id
    this.$axios.get(`/orders/${this.orderId}`).then(response => {
      this.formData = response.data.data
      if (this.formData.address) {
        this.formData.addressStreet = this.formData.address.street
        this.formData.addressCity = this.formData.address.city
        this.formData.addressZipcode = this.formData.address.zipcode
      }
      this.defaultFormData = response.data.data
      this.loading = false
    })
  },
  methods: {
    updateOrder() {
      const valid = this.validateData()
      if (valid) {
        this.resetValidate()
        this.$axios.put(`/orders/${this.orderId}`, {
          brand: this.formData.brand,
          model: this.formData.model,
          variant: this.formData.variant,
          leasingPeriod: this.formData.leasingPeriod,
          kilometers: this.formData.kilometers,
          color: this.formData.color,
          profession: this.formData.profession,
          equipment: this.formData.equipment,
          downPayment: this.formData.downPayment,
          monthlyPrice: this.formData.monthlyPrice,
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          phone: this.formData.phone,
          companyName: this.formData.companyName,
          numberOfEmployees: this.formData.numberOfEmployees,
          companyIndustry: this.formData.companyIndustry,
          cvr: this.formData.cvr,
          address: this.formData.address,
          newsletter: this.formData.newsletter,
          message: this.formData.message
        }).then(response => {
          this.$router.push('/orders')
        })
      }
    },
    reset() {
      this.formData = _.cloneDeep(this.defaultFormData)
    },
    updateCheckboxFormData(e, property = undefined) {
      const name = property || e.target.id
      const value = e.target.checked
      this.formData = _.cloneDeep(this.formData)
      this.formData[name] = value
    },
    updateFormData(e, property = undefined) {
      this.resetValidate()
      const name = property || e.target.id
      const value = _.isObject(e) ? e.target.value : e
      this.formData = _.cloneDeep(this.formData)
      this.formData[name] = value
    },
    deleteOrder() {
      this.loading = true
      this.$axios.delete(`/orders/${this.orderId}`)
        .then(response => {
          this.loading = false
          this.$message.success('Successfully Removed!', 1, () => {
            this.$router.push('/orders')
          })
        })
        .catch(() => {
          this.loading = false
          this.$message.error('Failed to remove!', () => {
            this.$router.push('/orders')
          })
        })
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
    },
    showMsgBoxOne(event) {
      this.count++
      const value = event.target.value
      this.$bvModal.msgBoxConfirm(
        'Do you really want to change Order Status?',
        {
          size: 'md',
          okVariant: 'danger',
          okTitle: 'Confirm',
          cancelTitle: 'Cancel',
          buttonSize: 'sm',
          footerClass: 'p-2 border-top-0',
          hideHeaderClose: true,
          centered: true
        }
      )
        .then(res => {
          if (res) {
            this.formData.status = value
            this.$axios.put(`/orders/${this.orderId}`, {
              status: this.formData.status
            })
          } else {
            this.formData.status = this.defaultFormData.status
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
<style scope>
.row.form-group {
  margin-bottom: 1rem;
  margin: 2.5rem -15px;
}
.orders {
  margin-bottom: 80px;
}
.actions-group {
  padding: 15px;
}
select {
  border: 1px solid #c2cfd6;
}
.page select.form-control {
  height: 36px;
}
</style>
