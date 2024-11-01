<template>
  <div class="cui" >
    <div id="fullPage">
      <div id="contentWrapper" class="float">
        <div id="content">
          <div id="header">
            <img class="logoImage" src="../assets/login2.png" alt="Log Analyzer Login" />
          </div>
          <div id="workArea">
            <div id="authArea" class="groupMargin">
              <div id="loginArea">
                <div id="loginMessage" class="groupMargin login-notice">Sign in with your organizational account</div>
                <v-card-text>
                <v-form>
                  <v-text-field
                    id="login"
                    label="Login"
                    name="login"
                    v-model="login"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Password"
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
                        @click="authenticate">Sign in</span>
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

export default {
  name: 'login',
  data () {
    return {
      goDark: this.$vuetify.theme.dark,
      info: null,
      valid: true,
      login: '',
      password: '',
      name: '',
      on: null,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      absolute: true,
      opacity: 1,
      overlay: false,
      errorMsg: ''
    }
  },
  computed: {
    setTheme () {
      if (this.goDark === true) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.$vuetify.theme.dark = true)
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return (this.$vuetify.theme.dark = false)
      }
    }
  },
  methods: {
    authenticate () {
      // console.log(this.login)
      // console.log(this.password)
      // Actions are triggered with the store.dispatch method: store.dispatch('login').
      this.$store
        .dispatch('login', { usrid: this.login, password: this.password })
        .then(() => this.$router.push('/'))
    }
  },
  mounted () {
    EventBus.$on('failedAuthentication', msg => {
      this.errorMsg = msg
      this.overlay = true
    })
  },
  beforeDestroy () {
    EventBus.$off('failedRegistering')
    EventBus.$off('failedAuthentication')
  }
}
</script>

<style scoped>
.login_box{
      box-shadow: 5px 5px #b60000,
                4px 4px white,
                3px 3px white,
                2px 2px white,
                1px 1px white,
                5px 5px 5px black;
    border:1px solid white;
}
</style>
