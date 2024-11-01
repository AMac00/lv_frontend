import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa' // 'mdiSvg'
  },
  theme: {
    themes: {
      light: {
        primary: '#607d8B',
        secondary: '#607d8B',
        accent: '#00A0D1',
        error: '#FF5252',
        info: '#0ab7d7',
        ciscoblue: '#0ab7d7',
        ciscodark: '#292929',
        ciscowhite: '#fff',
        ciscotext: '#000000',
        // success: '#4CAF50',
        link_primary: '#00A0D1',
        success: '#607d8B',
        warning: '#FFC107',
        template_white: '#fff',
        dark_1: '#292929',
        test_2: '#ff1bc4',
        loginbutton: '#0ab7d7'
      },
      dark: {
        primary: '#00A0D1',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        ciscoblue: '#0ab7d7',
        template_white: '#fafafa'
      }
    }
  }
})
