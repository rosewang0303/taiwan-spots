import Vue from 'vue'
import VueRouter from 'vue-router'
// layout
import Layout from '@/components/shared/Layout'
// view
import Index from '@/views/Index'
import Spot from '@/views/Spot'
import SpotDetail from '@/views/SpotDetail'
import Event from '@/views/Event'
import EventDetail from '@/views/EventDetail'
import Food from '@/views/Food'
import FoodDetail from '@/views/FoodDetail'

Vue.use(VueRouter)

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

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
        // 景點詳細
        path: 'spot/:id',
        name: 'SpotDetail',
        component: SpotDetail,
      },
      {
        // 節慶活動
        path: 'event',
        name: 'Event',
        component: Event,
      },
      {
        // 活動詳細
        path: 'event/:id',
        name: 'EventDetail',
        component: EventDetail,
      },
      {
        // 品嚐美食
        path: 'food',
        name: 'Food',
        component: Food,
      },
      {
        // 美食詳細
        path: 'food/:id',
        name: 'FoodDetail',
        component: FoodDetail,
      },
      // 不符合router表預設轉址到首頁:放最後
      { 
        path: '/*', 
        redirect: '/index'
      }
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 換頁面畫面置頂
router.afterEach((to, from, next) => {
  console.log(to, from, next);
  window.scrollTo(0, 0);
});

export default router
