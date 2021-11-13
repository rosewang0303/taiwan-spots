import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import functions from './functions'
// 引入normalize reset預設樣式
import 'normalize.css/normalize.css'
// 引入 google map vue套件
import * as VueGoogleMaps from "vue2-google-maps"

Vue.config.productionTip = false

// google map
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAYz6RNSNCNnyF_CJPfZQjxSzjlUXBEOQw",
    libraries: "places"
  }
});

new Vue({
  router,
  store,
  functions,
  render: h => h(App)
}).$mount('#app')
