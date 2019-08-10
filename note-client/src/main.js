import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import xhr from './axios'
import Cookies from 'js-cookie'

Vue.config.productionTip = false;
Vue.use(MintUI);
Vue.prototype.$axios = xhr;
Vue.prototype.$cookie = Cookies;

window.onresize = setHtmlFontSize;
function setHtmlFontSize(){
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize = htmlWidth / 10 + 'px';
};
setHtmlFontSize();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
