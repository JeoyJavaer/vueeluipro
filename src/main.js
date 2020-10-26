import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from "@/store/store"

import ZkTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false

Vue.component('tree-table',ZkTable)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
