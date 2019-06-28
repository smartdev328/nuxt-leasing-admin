<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col md="6" sm="8">
        <b-card no-body class="mx-4">
          <b-card-body class="p-4">
            <h1>Register</h1>
            <p class="text-muted">
              Create your account
            </p>
            <b-form-group class="mb-3">
              <label class="col-form-label">Username *</label>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-user" /></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  id="username"
                  type="text"
                  :class="{
                    'is-valid': isValidated && validated.username,
                    'is-invalid': isValidated && !validated.username,
                  }"
                  :value="formData.username"
                  @change="updateFormData($event, 'username')"
                />
              </b-input-group>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group class="mb-3">
              <label class="col-form-label">Email *</label>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text>@</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  id="email"
                  type="email"
                  :class="{
                    'is-valid': isValidated && validated.email,
                    'is-invalid': isValidated && !validated.email,
                  }"
                  :value="formData.email"
                  @change="updateFormData($event, 'email')"
                />
              </b-input-group>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group class="mb-3">
              <label class="col-form-label">Password *</label>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-lock" /></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  id="password"
                  type="password"
                  :class="{
                    'is-valid': isValidated && validated.password,
                    'is-invalid': isValidated && !validated.password,
                  }"
                  :value="formData.password"
                  @change="updateFormData($event, 'password')"
                />
              </b-input-group>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group class="mb-4">
              <label class="col-form-label">Confirm Password *</label>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-lock" /></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  id="confirm_password"
                  type="password"
                  :class="{
                    'is-valid': isValidated && validated.confirm_password,
                    'is-invalid': isValidated && !validated.confirm_password,
                  }"
                  :value="formData.confirm_password"
                  @change="updateFormData($event, 'confirm_password')"
                />
              </b-input-group>
              <b-form-invalid-feedback>
                * Required Field
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group class="mt-3 mb-3">
              <b-button variant="success" block @click="register">
                Create Account
              </b-button>
            </b-form-group>
          </b-card-body>
          <!-- <b-card-footer class="p-4">
            <b-row>
              <b-col cols="6">
                <b-button block class="btn btn-facebook">
                  <span>facebook</span>
                </b-button>
              </b-col>
              <b-col cols="6">
                <b-button block class="btn btn-twitter" type="button">
                  <span>twitter</span>
                </b-button>
              </b-col>
            </b-row>
          </b-card-footer>
        </b-card> -->
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'Register',
  layout: 'default',
  middleware: 'guest',
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      validated: {
        username: null,
        email: null,
        password: null,
        confirm_password: null
      },
      isValidated: false
    }
  },

  methods: {
    async register() {
      const valid = this.validateData()
      if (valid) {
        this.resetValidate()
        try {
          await this.$axios.post('/users', {
            username: this.formData.username,
            email: this.formData.email,
            password: this.formData.password
          })
          const resp = await this.$axios.post('/users/token', {
            username: this.formData.username,
            password: this.formData.password
          })
          this.$store.commit('localStorage/setLogin', resp.data.data)
          this.$message.success('Successfully Created New User!')
          this.$router.push('/')
        } catch (e) {
          this.error = e.response.data.message
        }
      }
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
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validateData() {
      let valid = true
      this.isValidated = true
      _.map(this.validated, (value, key) => {
        this.validated[key] = false
        if (this.formData[key]) {
          this.validated[key] = true
        }
        if (key === 'email' && this.formData.email && !this.validateEmail(this.formData.email)) {
          this.validated.email = false
          this.$message.error('Email is invalid')
        }
        if (key === 'password' && this.formData.password && this.formData.password.length < 6) {
          this.validated.password = false
          this.formData.password = undefined
          this.$message.error('Password should have at least 6 letters')
        }
        if (this.formData.confirm_password) {
          if (this.formData.confirm_password !== this.formData.password) {
            this.validated.confirm_password = false
            this.formData.confirm_password = undefined
            this.$message.error('Passwords don\'t match')
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
