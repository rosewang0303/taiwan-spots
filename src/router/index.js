import Vue from 'vue'
import VueRouter from 'vue-router'
// layout
import Layout from '@/components/shared/Layout'
// view
import Index from '@/views/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout, // 引入layout
    children: [
      {
        // 預設路徑
        path: '/',
        redirect: '/index',
      },
      {
        // 首頁
        path: 'index',
        name: 'Index',
        component: Index,
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
