// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'

Vue.prototype.$http = axios

//引入表单验证插件
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate);

//引入elementUI插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//import { Button, Select } from 'element-ui';
//Vue.use(Button)
//Vue.use(Select)


//WebSocket封装方法
import * as socketApi from './api/socket'
Vue.prototype.socketApi = socketApi

//加解密封装方法
import * as secretApi from './api/secret'
Vue.prototype.secretApi = secretApi

//表单验证封装方法
import * as validate from './api/validate'
Vue.prototype.validate = validate

//公共方法
import util from './api/util'
Vue.use(util)

//所有的配置项
import global_ from './api/allConfigs'
Vue.prototype.CONFIGS=global_

Vue.config.productionTip = false


Vue.prototype.CryptoJS = require('crypto-js');  //引用AES源码js

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
