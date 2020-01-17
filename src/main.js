import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/vant/vant-ui";

import VueTouch from "vue-touch";
Vue.use(VueTouch, { name: "v-touch" });
VueTouch.config.swipe = {
  threshold: 100 //手指左右滑动距离
};
// 图片验证
import SlideVerify from 'vue-monoplasty-slide-verify'; 
Vue.use(SlideVerify);

Vue.config.productionTip = false;

// axios 拦截器
// import axios from "./assets/api/axios";
// Vue.use(axios);

// 导入axios第三方ajax模块
import axios from "axios";
// 配置axios基础路径
axios.defaults.baseURL = "http://localhost:3000";
// 配置axios保存session信息
axios.defaults.withCredentials = true;
// 将axios注册到vue实例中，由于axios不支持use，所以将实例添加到vue原型
Vue.prototype.axios = axios;



import VuePreview from "vue-preview";

// with parameters install
Vue.use(VuePreview, {
  mainClass: "pswp--minimal--dark",
  barsSize: { top: 0, bottom: 0 },
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
