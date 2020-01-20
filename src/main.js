import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// vant 组件库
import "./assets/vant/vant-ui";
// 手机滑动
import VueTouch from "vue-touch";
Vue.use(VueTouch, { name: "v-touch" });
VueTouch.config.swipe = {
  threshold: 100 //手指左右滑动距离
};
// 图片验证
import SlideVerify from "vue-monoplasty-slide-verify";
Vue.use(SlideVerify);
//  图片预览
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

// axios 拦截器
import axios from "./assets/api/axios";
Vue.use(axios);
// Vue.prototype.axios = axios;

// 导入 axios 第三方 ajax 模块
// import axios from "./assets/api/axios";
// 配置 axios 基础路径
// axios.defaults.baseURL = "http://localhost:3000";
// 配置 axios 保存 session 信息
// axios.defaults.withCredentials = true;
// 将 axios 注册到 vue 实例中，由于 axios 不支持 use，所以将实例添加到 vue 原型
// Vue.prototype.axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
