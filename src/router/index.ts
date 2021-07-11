import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout/index.vue'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'Home',
      component: Home

    },
    {
      path: '/ColumnDetailes',
      name: 'ColumnDetailes',
      meta: { requireLogin: true },
      component: () => import(/* webpackChunkName: "about" */ '../views/Columns/index.vue')
    },
    {
      path: 'Create',
      name: 'CreatePosts',
      meta: { requireLogin: true },
      component: () => import(/* webpackChunkName: "about" */ '../views/CreatePost/index.vue')
    },
    {
      path: '/MyColum',
      name: 'MyColum',
      meta: { requireLogin: true },
      component: () => import(/* webpackChunkName: "about" */ '../views/Columns/MyColum.vue')
    }

    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { redirectAlreadyLogin: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { redirectAlreadyLogin: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/Register/index.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const { requireLogin, redirectAlreadyLogin } = to.meta
  if (localStorage.getItem('token')) {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  } else {
    if (requireLogin) {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
