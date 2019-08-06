import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import xhr from './axios'
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import Cookies from 'js-cookie'
Vue.use(ElementUI);

Vue.prototype.$axios = xhr;
Vue.prototype.$cookie = Cookies;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
