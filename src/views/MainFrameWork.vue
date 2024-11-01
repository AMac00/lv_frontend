<template>
  <v-container class="container">
<!--    <v-layout>-->
<!--&lt;!&ndash;      <h1></h1>&ndash;&gt;-->
<!--    </v-layout>-->
      <keep-alive>
      <!--    <Login class="mt-5" :dark="true" /> we used the is attribute to switch between components in a tabbed interface -->
          <component v-bind:is="component" v-on:toggle2="toggle2"/>
      </keep-alive>
  </v-container>
</template>

<script>
import Login from '../components/Login'
import Signup from '../components/Signup'
import LVMainFrameWork from '../components/LVMainFrameWork'
import { EventBus } from '@/utils'
import store from '@/store'

export default {
  components: {
    Login,
    Signup,
    LVMainFrameWork
  },
  data () {
    return {
      component: Login
    }
  },
  //
  // },
  methods: {
    toggle2 () {
      // console.log('Toggle Hit')
      if (this.component === Login) {
        // console.log('load login component')
        this.component = Signup
      } else {
        // console.log('load Signup component')
        this.component = Login
      }
    }
  },
  mounted () {
    EventBus.$on('Authenticated_user', (msg) => {
      // console.log('Event Buss msg = ' + msg)
      if (!store.getters.isAuthenticated) {
        // console.log('Did NOT find Auth User')
        this.component = Login
      } else {
        // console.log('Found Auth User')
        this.component = LVMainFrameWork
      }
    })
    EventBus.$on('Logout', (msg) => {
      // console.log('EventBus Log Out')
      this.component = Login
    })
  },
  AuthValid () {
    if (!store.getters.isAuthenticated) {
      // console.log('Didnt find token, you need to auth')
    } else {
      // console.log('Found token, lets try')  // background-image: url('~@/assets/spaceballs.jpg');
      this.component = LVMainFrameWork
    }
  }
}

</script>

<style>
.container {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
