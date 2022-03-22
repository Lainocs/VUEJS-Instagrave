import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'feed',
    component: () => import('@/views/FeedView.vue')
  },
  {
    path: '/subs',
    name: 'subs',
    component: () => import('@/views/SubsView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('@/views/Auth/SignInView.vue')
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import('@/views/Auth/SignUpView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
