import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Qs from "qs";
Vue.use(Vuex);

// const address = JSON.parse(localStorage.getItem("address") || "[]");
export default new Vuex.Store({
  state: {
    // this.$store.state.属性
    // address: address
    address: ""
  },
  mutations: {
    // 专门负责修改state中的变量
    // this.$store.commit('方法的名称', '按需传递唯一的参数')
    // 初始化
    setAddr(state, address) {
      state.address = address;
    },
    // 添加地址
    addAddr(state, addrInfo) {
      state.address = state.address.map(item => {
        // 取消所有默认
        for (var key in item) {
          if (key === "isDefault") {
            item[key] = false;
          }
        }
        return item;
      });
      state.address.unshift(addrInfo);
      // 当更新之后，把数组存储到本地的 localStorage 中
      localStorage.setItem("address", JSON.stringify(state.address));
    },
    // 更新地址
    updateAddr(state, addrInfo) {
      state.address = state.address.map(item => {
        // 取消所有默认
        for (var key in item) {
          if (key === "isDefault") {
            item[key] = false;
          }
        }
        if (item.id == addrInfo.id) {
          item = addrInfo;
        }
        return item;
      });
      localStorage.setItem("address", JSON.stringify(state.address));
    }
  },
  getters: {
    // this.$store.getters.方法名
    // 获取默认地址
    getAddress(state) {
      return state.address.filter(item => {
        return item.isDefault === true;
      });
    }
  },
  actions: {
    // 专门负责发送异步ajax请求，从服务器端获取数据
    // this.$store.dispatch('方法名')
    getAddr(context) {
      // context代表整个vuex对象
      (async function() {
        var result = await axios.get("/address");
        context.commit("setAddr", result.data);
      })();
    },
    postAddr(context, addrInfo) {
      (async function() {
        var result = await axios.post("/address", Qs.stringify(addrInfo));
        return result;
      })();
    }
  },
  modules: {}
});
