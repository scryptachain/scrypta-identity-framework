import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/identities',
    name: 'Identities',
    component: () => import(/* webpackChunkName: "identities" */ '../views/Identities.vue')
  },
  {
    path: '/share/:identity',
    name: 'Share',
    component: () => import(/* webpackChunkName: "share" */ '../views/Share.vue')
  },
  {
    path: '/check',
    name: 'Check',
    component: () => import(/* webpackChunkName: "check" */ '../views/Check.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
