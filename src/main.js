import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 共用函數
import './functions'
// 引入 normalize reset預設樣式
import 'normalize.css/normalize.css'
// 引入 google map vue套件
import * as VueGoogleMaps from "vue2-google-maps"

Vue.config.productionTip = false

// google map 設定
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAYz6RNSNCNnyF_CJPfZQjxSzjlUXBEOQw",
    libraries: "places"
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
