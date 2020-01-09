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

// 引入样式文件
import '@/common/stylus/index.styl'

// 配置axios到原型链中
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(Vant)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})
