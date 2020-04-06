import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import '../public/js/resizeRoot.js'
new Vue({
  render: h => h(App),
}).$mount('#app')
