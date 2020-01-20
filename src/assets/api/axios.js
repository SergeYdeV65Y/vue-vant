import axios from "axios";
import qs from "qs";
import store from "../../store/index";

// const instance = axios.create({
//   baseURL: "http://localhost:3000",
//   withCredentials: true
// });

// 配置 axios 基础路径
axios.defaults.baseURL = "http://localhost:3000";
// 配置 axios 保存 session 信息
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    console.log("进入请求拦截器...");
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    if (localStorage.getItem("token")) {
      config.headers.token = localStorage.getItem("token");
    }
    if (sessionStorage.getItem("token")) {
      config.headers.token = sessionStorage.getItem("token");
    }
    return config;
  },
  error => {
    console.log("===发送请求拦截器报错===");
    console.log(error);
    console.log("===end===");
    Promise.reject(error);
  }
);
axios.interceptors.response.use(
  res => {
    console.log("触发响应拦截器...");
    if (res.data.status == 403) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      store.commit("setCart", []);
      store.commit("setUname", "");
    } else if (res.data.code == -1) {
      // store.commit("setUname", "");
      alert(res.data.msg + " 请先登录 !");
    } else if (res.data.token) {
      store.commit("setUname", res.data.uname);
      localStorage.setItem("token", res.data.token);
      // if (res.remember === "true") {
      //   localStorage.setItem("token", res.data.token);
      // } else {
      //   sessionStorage.setItem("token", res.data.token);
      // }
    }
    return res;
  },
  error => {
    Promise.reject(error);
  }
);

export default axios;

// export default {
//   install: function(Vue, Option) {
//     Object.defineProperty(Vue.prototype, "axios", { value: instance });
//     // Vue.prototype.axios = instance;
//   }
// };
