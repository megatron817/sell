// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入axios
import axios from 'axios'
// 引入Vuex
import Vuex from 'vuex'
import store from '@/store/store'

// 引入样式文件
import '@/common/stylus/index.styl'

// 引入mock文件，正式发布时，注释掉该处即可
import '@/mock'

// 配置axios到原型链中
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(Vant)

// 使用Vuex
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 使用store
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})
