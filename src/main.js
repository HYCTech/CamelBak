// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import plugin from '@/plugins'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/base.scss'

import cookie from 'cookies-js'
import utils from './utils/index'
import echarts from 'echarts'

//富文本编辑器样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


window.Cookies = cookie;
Vue.config.productionTip = false


Vue.prototype.$echarts = echarts

Vue.use(ElementUI)

Vue.use(plugin, {});




//路由拦截
router.beforeEach((to, from, next) => {

  let ui = Cookies('UI')
  let userInfo = null
  console.log(!ui && !to.meta.auth)
  if (!to.meta.auth && !ui) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }else {
    next()
  }



})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
