import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import store from './store'
import store from './store/index'
import './plugins/element.js'
import axios from 'axios'
import Element from 'element-ui'
import message from 'element-ui'
import './assets/css/global.less'
import './assets/font/iconfont'
import $ from '../node_modules/jquery'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$message = message
import echarts from '../node_modules/echarts'
Vue.prototype.$echarts = echarts
Vue.use(Element)
axios.defaults.baseURL = 'http://rap2.taobao.org:38080/app/mock/249477'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})