import Vue from 'vue'
import App from './App.vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

Vue.config.productionTip = false
Vue.use(AmplifyPlugin, AmplifyModules)

new Vue({
  render: h => h(App)
}).$mount('#app')