import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout/index.vue'
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
      path: '/MyColumnDetailes',
      name: 'MyColumnDetailes',
      meta: { requireLogin: true, headerBg: 'rgba(0,0,0,1)' },
      component: () => import(/* webpackChunkName: "about" */ '../views/Community/index.vue')
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
      meta: { requireLogin: true, headerBg: '#ff9914' },
      component: () => import(/* webpackChunkName: "about" */ '../views/Community/MyColumn.vue')
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
