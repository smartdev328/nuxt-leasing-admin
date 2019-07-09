<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">
                  Sign In to your account
                </p>
                <b-form @submit.stop.prevent="login($event)">
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
                  <b-form-group class="mt-3 mb-3">
                    <b-row>
                      <b-col cols="6">
                        <b-button type="submit" variant="primary" class="px-4">
                          Login
                        </b-button>
                      </b-col>
                    <!-- <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">
                        Forgot password?
                      </b-button>
                    </b-col> -->
                    </b-row>
                  </b-form-group>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  layout: 'clean',
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      validated: {
        username: null,
        password: null
      },
      isValidated: false
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'localStorage/loggedInUser'
    })
  },
  mounted() {
    const redirectTo = this.$nuxt.$route.query.redirect_to
    if (this.loggedInUser && redirectTo) {
      this.$router.push(redirectTo)
    }
  },
  methods: {
    async login(event) {
      event.preventDefault()
      const valid = this.validateData()
      if (valid) {
        this.resetValidate()
        try {
          const resp = await this.$axios.post('/users/token', {
            username: this.formData.username,
            password: this.formData.password
          })
          this.$store.commit('localStorage/setLogin', resp.data.data)
          this.$message.success('Successfully Login!')
          this.$router.push('/')
        } catch (e) {
          switch (e.response.status) {
            case 401:
              this.error = 'Username or Password is invalid'
              break
            default:
              this.error = 'Server Error'
          }
          this.$message.error(this.error)
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
