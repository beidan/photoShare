import Vue from 'vue'
import router from './router/router'
import store from './store/store'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.config.debug = true
window.log = console.log
// 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
// VueResource官方不再维护，所以使用axios

let data = {
  router,
  store
}

new Vue(data).$mount('#app')
