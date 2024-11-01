<template>
  <v-app id='LVMainFrameWork'>
    <v-navigation-drawer
        v-model="drawerRight"
        app
        clipped-left
        color="ciscodark"
      >
    <v-list
        dense
        nav>
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title" color="ciscowhite">
            Operations
          </v-list-item-title>
          <v-list-item-subtitle color="ciscowhite">
             portal
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
        <v-list-item-group v-model="nav_item" color="ciscowhite">
          <v-list-item
            v-for="(nav_item, i) in nav_items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="nav_item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="openpage(nav_item.text)" v-text="nav_item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
<!-- Top Banner FrameWork-->
    <v-app-bar class="pb-0 mb-0"
      app
      clipped-right
      color="ciscowhite"
    >
    <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight" />
      <img class="pa-md-4 mx-lg-auto" src="../assets/img/WxCCETitle.png" alt="Log Analyzer" height="65px" width="85px">
      <v-toolbar-title class="title">Log Analytics</v-toolbar-title>
      <v-spacer /><v-btn rounded text small color="warn" @click="logout">{{ getLoginUser() }} | Log out</v-btn>
    </v-app-bar>
<!-- Content Body - Components-->
    <v-content class="pt-0 mt-0 pl-0 ml-0">
      <component v-bind:is="component"/>
    </v-content>
<!--Footer FrameWork-->
    <v-footer
      class="justify-center pl-0"
      inset
      app
    >
      <v-spacer />
      <div style="font-size: 0.8em;">&copy; 2019-{{ new Date().getFullYear() }}. All rights reserved.</div>
    </v-footer>
<!--SnackBar FrameWork-->
    <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
        :color="snackbar_color"
        :top="'top'"
        :timeout="snackbar_timeout"
      >
        {{ snackbar_text }}
        <v-btn
          color="red"
          text
          @click="snackbar = false"
        >close
        </v-btn>
      </v-snackbar>
  </v-app>
</template>

<script>
import LVMainWorkflow from './LVLogSelection'
import LVLogContent from './LVLogContent'
import Dashboard from './Dashboard'
import About from './About'
import { EventBus } from '@/utils'

export default {
  name: 'LVMainFrameWork',
  props: {
    source: String
  },
  // components: {
  //  LVMainWorkflow
  // },
  data: () => ({
    drawer: null,
    drawerRight: false,
    background: true,
    right: false,
    left: false,
    snackbar: false,
    multiLine: true,
    loginuser: '',
    snackbar_text: 'snackbar_text',
    snackbar_color: 'blue',
    snackbar_timeout: 6000,
    LVMainWorkflow: LVMainWorkflow,
    ae_status: {
      ae_backend_bg: 'success',
      ae_backend_icon: 'done',
      ae_database_bg: 'success',
      ae_database_icon: 'done',
      ae_call_server_bg: 'success',
      ae_call_server_icon: 'done'
    },
    nav_item: 0,
    nav_items: [
      { text: 'Log Collection', icon: 'computer' }
      // { text: 'Dashboard', icon: 'dashboard' },
      // { text: 'About', icon: 'help' }
    ],
    items: [
      { title: 'LogOut' }
    ],
    mini: true,
    computed: {
      bg () {
        return this.background ? '../assets/spaceballs.jpg' : undefined
      }
    },
    component: LVMainWorkflow
  }),
  methods: {
    logout () {
      // console.log('logout call')
      this.$store.dispatch('logout')
    },
    getservicestatus (service) {
      this.$store.dispatch('getservicestatus', service)
    },
    getLoginUser () {
      return this.$store.getters.getLoginUser
    },
    openpage (pageinfo) {
      // console.log(pageinfo)
      if (pageinfo === 'Dashboard') {
        // EventBus.$emit('gotodashboard')
        this.created()
        this.component = Dashboard
      } else if (pageinfo === 'About') {
        this.created()
        this.component = About
      } else if (pageinfo === 'Log Collection') {
        // this.created()
        // this.component = LVMainWorkflow
        EventBus.$emit('logcollection')
      }
    },
    created () { window.scrollTo(0, 0) }
  },
  mounted () {
    EventBus.$on('snackbar_msg', (msg) => {
      // console.log('Pop snackbar messaging ' + msg.message)
      this.snackbar_text = msg.message
      this.snackbar_color = msg.status
      this.snackbar = true
    })

    EventBus.$on('getlog', () => {
      // console.log('Received getlog in Parent!')
      this.created()
      this.component = LVLogContent
    })

    EventBus.$on('logcollection', () => {
      // console.log('Received logcollection in Parent!')
      this.created()
      this.component = LVMainWorkflow
    })
    // Gets Server status
    this.getservicestatus('ae_backend.service')
  }
}

</script>

<style scoped>
.wxcce_icon {
  margin: 15px;
  font-size: 0.6em;
}
</style>
