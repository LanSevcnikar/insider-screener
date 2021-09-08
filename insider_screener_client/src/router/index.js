import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/searchdb',
    name: 'Search DB',
    component: () => import('../views/SearchDB.vue')
  },
  {
    path: '/stockaa',
    name: 'Stock Analysis',
    component: () => import('../views/StockAA.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
