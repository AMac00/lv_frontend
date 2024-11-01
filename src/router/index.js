import Vue from 'vue'
import VueRouter from 'vue-router'
import MainFrameWork from '../views/MainFrameWork.vue'
import SignupFrameWork from '../views/SignupFrameWork.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainFrameWork',
    component: MainFrameWork
  },
  {
    path: '/signup',
    name: 'SignupFrameWork',
    component: SignupFrameWork
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
