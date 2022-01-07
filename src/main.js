import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ApiService from './services/api.service'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import ViaCep from 'vue-viacep'

import VueTheMask from 'vue-the-mask'

import vSelect from 'vue-select'

import money from 'v-money'

import Notifications from 'vue-notification'

import 'vue-select/dist/vue-select.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ViaCep)
Vue.use(VueTheMask)
Vue.component('v-select', vSelect)
Vue.use(money, {precision: 4})
Vue.use(Notifications)

Vue.config.productionTip = false

ApiService.init()
Vue.prototype.$api = ApiService

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
