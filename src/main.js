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
import utils  from './utils/index'


window.Cookies = cookie;
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(plugin, {});




//路由拦截
router.beforeEach((to, from, next) => {
    next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
