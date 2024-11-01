<template>
<div id="register">
  <div id="fullPage">
      <div id="contentWrapper" class="float">
        <div id="content">
          <div id="header">
            <img class="logoImage" src="../assets/login2.png" alt="Log Analyzer Login" />
          </div>
          <div id="workArea">
            <div id="authArea" class="groupMargin">
              <div id="loginArea">
                <div id="loginMessage" class="groupMargin login-notice">Sign up local account</div>
                <v-card-text>
                <v-form>
                  <v-text-field
                    id="login"
                    v-model="login"
                    label="Username"
                    name="username_name"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions
              class= "justify-center"
              >
                <!-- Login Button  -->
                <div id="submissionArea">
                    <span id="submitButton" class="submit"
                        @click="register">Sign up</span>
                </div>
                <v-overlay
                  :absolute="absolute"
                  :opacity=".5"
                  :value="overlay"
                >
                  <v-btn
                    color="red lighten-2"
                    @click="overlay = false"
                  >
                    {{errorMsg}}
                  </v-btn>
                </v-overlay>
              </v-card-actions>
              <div>
                <v-progress-circular v-if="showpc"
                  :size="50"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
                </div>
                <div id="introduction" class="groupMargin">
                   <p class='description-notice'>By using Log Anaylzer, you accept the documented Terms of Services and Privcay Statements.</p>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { EventBus } from '@/utils'

export default ({
  opts: {
    theme: {
      goDark: false
    }
  },
  name: 'register',
  data () {
    return {
      diaglog: true,
      goDark: this.$vuetify.theme.dark,
      info: null,
      valid: true,
      login: '',
      password: '',
      name: '',
      on: null,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      absolute: true,
      opacity: 1,
      overlay: false,
      errorMsg: '',
      showpc: false
    }
  },
  methods: {
    register () {
      // console.log(this.login)
      // console.log(this.password)
      this.$store.dispatch('register', { usrid: this.login, password: this.password })
      this.showpc = true
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    }
  },
  mounted () {
    EventBus.$on('failedRegistering', (msg) => {
      this.errorMsg = msg
      this.overlay = true
    })
  },
  beforeDestroy () {
    EventBus.$off('failedRegistering')
  }
})
</script>

<style scoped>

</style>
