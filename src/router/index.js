import Vue from 'vue'
import VueRouter from 'vue-router'

import { supabase } from '@/supabase'
import { user } from '@/store/modules/user.module'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'feed',
    component: () => import('@/views/FeedView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/subs',
    name: 'subs',
    component: () => import('@/views/SubsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('@/views/Auth/SignInView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import('@/views/Auth/SignUpView.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// meta login
router.beforeEach((to, from, next) => {
  let has_user = supabase.auth.user();

  if(to.name == 'signIn' || to.name == 'signUp') {
    if(has_user) {
      next('/subs');
    } else {
      next();
    }
  }

  if(to.matched.some((record) => { return record.meta.requiresAuth; })) {
    if(has_user) {
      user.state.user_data = has_user;
      next();
    } else {
      next({
        name: 'signIn',
      });
    }
  } else {
    next();
  }
});

export default router
