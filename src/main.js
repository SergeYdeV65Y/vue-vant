import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/vant/vant-ui";

Vue.config.productionTip = false;

// 导入axios第三方ajax模块
import axios from "axios";
// 配置axios基础路径
axios.defaults.baseURL = "http://127.0.0.1:3000";
// 配置axios保存session信息
axios.defaults.withCredentials = true;
// 将axios注册到vue实例中，由于axios不支持use，所以将实例添加到vue原型
Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
