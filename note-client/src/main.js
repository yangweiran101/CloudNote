import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
// import "lib-flexible";
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
let formatDateTime = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h=h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return y + '-' + m + '-' + d+' '+h+':'+minute;
};
Vue.prototype.$formatDateTime = formatDateTime;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
