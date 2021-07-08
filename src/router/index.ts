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
      path: '/ColumnDetailes',
      name: 'ColumnDetailes',
      component: () => import(/* webpackChunkName: "about" */ '../views/Columns/index.vue')
    },
    {
      path: 'Create',
      name: 'CreatePosts',
      component: () => import(/* webpackChunkName: "about" */ '../views/CreatePost/index.vue')
    }

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/index.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
