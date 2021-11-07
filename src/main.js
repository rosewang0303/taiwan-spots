import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入normalize reset預設樣式
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
