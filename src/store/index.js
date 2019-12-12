import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Qs from "qs";
Vue.use(Vuex);

// 每次刚进入网站便会调用 main.js，在调用的时候，先从本地存储中把地址的数据读出来，放到 store 中
const address = JSON.parse(localStorage.getItem("address") || "[]");
export default new Vuex.Store({
  state: {
    // this.$store.state.属性
    address: address
    // address: ""
  },
  mutations: {
    // 专门负责修改state中的变量
    // this.$store.commit('方法的名称', '按需传递唯一的参数')
    // 初始化
    setAddr(state, address) {
      state.address = address;
      localStorage.setItem("address", JSON.stringify(state.address));
    },
    // 添加地址
    addAddr(state, addrInfo) {
      state.address = state.address.map(item => {
        if (addrInfo.isDefault === true) {
          // 取消所有默认
          item.isDefault = false;
        }
        return item;
      });
      state.address.unshift(addrInfo);
      // 当更新之后，把对象数组存储到本地的 localStorage 中
      localStorage.setItem("address", JSON.stringify(state.address));
    },
    // 更新地址
    updateAddr(state, addrInfo) {
      state.address = state.address.map(item => {
        if (addrInfo.isDefault === true) {
          item.isDefault = false;
        }
        if (item.id == addrInfo.id) {
          item = addrInfo;
        }
        return item;
      });
      localStorage.setItem("address", JSON.stringify(state.address));
    },
    // 删除地址
    delAddr(state, addrInfo) {
      state.address = state.address.filter(item => {
        return item.id !== addrInfo.id;
      });
      localStorage.setItem("address", JSON.stringify(state.address));
    }
  },
  getters: {
    // this.$store.getters.方法名
    // 获取默认地址
    getAddress(state) {
      return state.address.filter(item => item.isDefault === true)[0];
    }
  },
  actions: {
    // 专门负责发送异步ajax请求，从服务器端获取数据
    // this.$store.dispatch('方法名')
    getAddr(context) {
      // context代表整个vuex对象
      (async function() {
        let result = await axios.get("/address?_sort=id&_order=desc");
        context.commit("setAddr", result.data);
      })();
    },
    postAddr(context, addrInfo) {
      (async function() {
        let result = await axios.post("/address", addrInfo);
        // var result2 = await context.dispatch("getAddr");
        context.dispatch("getAddr");
      })();
    },
    async putAddr(context, addrInfo) {
      // let s1 = await axios.get("/address?_sort=id&_order=desc");
      // for (var i = 0; i <= s1.data[0].id; i++) {
      //   axios.patch(`/address/${i}`, { isDefault: false });
      // }
      let result = await axios.put(
        `/address/${addrInfo.id}`,
        // Qs.stringify(addrInfo)
        addrInfo
      );
      context.dispatch("getAddr");
    },
    async deleteAddr(context, addrInfo) {
      let result = await axios.delete(`/address/${addrInfo.id}`);
      context.dispatch("getAddr");
    }
  },
  modules: {}
});
