import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import Vuelidate from 'vuelidate'
import titleMixin from './mixins/title.mixin'
import Toaster from 'v-toaster'

Vue.use(Vuelidate)
Vue.mixin(titleMixin)
Vue.use(Toaster, {timeout: 60000})

Vue.config.productionTip = false

Vue.use(ArgonDashboard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
