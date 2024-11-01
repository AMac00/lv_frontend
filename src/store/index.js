/*
    Imports Vue and Vuex
*/
import Vue from 'vue'
import Vuex from 'vuex'
// import of AJAX functions will go here
import { isValidJwt, EventBus } from '@/utils'
import { authenticate, register, getdbdata, agentupload } from '@/api'
/*
  Adds the promise polyfill for IE 11
*/
require('es6-promise').polyfill()
/*
    Initializes Vuex on Vue.
*/
Vue.use(Vuex)

const state = {
  userData: {},
  jwt: '',
  componentSelect: [],
  logTimeSpan: 120
}

const actions = {
  login (context, userData) {
    context.commit('setUserData', { userData })
    return authenticate(userData)
      .then(function (response) {
        // console.log('Got response from promise.')
        if (response.data.authenticated === true) {
          // console.log('Found Auth as true')
          context.commit('setJwtToken', { jwt: response.data.token })
          EventBus.$emit('Authenticated_user', response.data.authenticated)
        } else {
          // console.log('In store failedAuth = ' + response.data.err_msg)
          EventBus.$emit('failedAuthentication', response.data.err_msg)
        }
      })
      .catch(error => {
        // console.log('Error Authenticating: ', error)
        EventBus.$emit('failedAuthentication', error)
      })
  },
  logout (context) {
    context.commit('unsetJwtToken')
    EventBus.$emit('Logout')
  },
  register (context, userData) {
    context.commit('setUserData', { userData })
    // console.log(userData)
    return register(userData)
      .then(function (response) {
        // console.log('Got response from promise.')
        if (response.data.status.indexOf('error') !== -1) {
          // console.log('Found error in status return')
          EventBus.$emit('failedRegistering', response.data.err_msg)
        } else {
          // console.log('Return Status is good')
          setTimeout(() => {
            // this.$router.push('/')
            EventBus.$emit('Logout', 'success')
          }, 5000)
        }
      })
      .catch(error => {
        // console.log('Error Registering: ', error)
        EventBus.$emit('failedRegistering: ', error)
      })
  },
  agentupload (context, formData) {
    context.commit('setUserData', { formData })
    return agentupload(formData, context.state.jwt)
      .then(function (response) {
        // console.log('AgentUpload MsgBus 01')
        EventBus.$emit('UploadedFileStatus', response.data)
        EventBus.$emit('snackbar_msg', response.data)
      })
  },
  getdbdata (context, dbname) {
    return getdbdata(dbname, context.state.jwt)
      .then(function (response) {
        EventBus.$emit(String(dbname) + '_dbreturn', response.data)
      })
  },
  getservicestatus (servicname) {
    return 'Running'
  }
}
const mutations = {
  setUserData (state, payload) {
    // console.log('setUserData payload = ', payload)
    state.userData = payload.userData
    // console.log('store userDate = ', state.userData)
  },
  setJwtToken (state, payload) {
    localStorage.token = payload.jwt
    state.jwt = payload.jwt
    // console.log('JWT state = ' + state.jwt)
  },
  unsetJwtToken (state) {
    localStorage.removeItem('token')
    state.jwt = ''
    // console.log('JWT state = ' + state.jwt)
  }
}

const getters = {
  // reusable data accessors
  isAuthenticated (state) {
    return isValidJwt(state.jwt)
  },
  getLoginUser (state) {
    return state.userData.usrid
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

/*
    Standard Export store.
*/
// export default new Vuex.Store({
//   state,
//   actions,
//   mutations,
//   getters
// })
export default store
