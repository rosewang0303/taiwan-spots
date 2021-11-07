import Vue from 'vue'
import VueRouter from 'vue-router'
// layout
import Layout from '@/components/shared/Layout'
// view
import Index from '@/views/Index'
import Spot from '@/views/Spot'
import Event from '@/views/Event'
import Food from '@/views/Food'

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
      {
        // 探索景點
        path: 'spot',
        name: 'Spot',
        component: Spot,
      },
      {
        // 節慶活動
        path: 'event',
        name: 'Event',
        component: Event,
      },
      {
        // 品嚐美食
        path: 'food',
        name: 'Food',
        component: Food,
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
