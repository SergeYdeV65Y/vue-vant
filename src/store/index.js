import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

// 每次刚进入网站便会调用 main.js，在调用的时候，先从本地存储中把地址的数据读出来，放到 store 中
const address = JSON.parse(localStorage.getItem("address") || "[]");
const cart = JSON.parse(localStorage.getItem("cart") || "[]");
const uname = JSON.parse(localStorage.getItem("uname") || null);
export default new Vuex.Store({
  state: {
    // this.$store.state.属性
    address: address,
    cart: cart,
    uname: uname
  },
  mutations: {
    // 专门负责修改 state 中的变量
    // this.$store.commit('方法的名称', '按需传递唯一的参数')
    // 初始化
    setAddr(state, address) {
      state.address = address;
      localStorage.setItem("address", JSON.stringify(state.address));
    },
    setCart(state, cart) {
      state.cart = cart;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setUname(state, uname) {
      state.uname = uname;
      localStorage.setItem("uname", JSON.stringify(state.uname));
    },
    // 添加地址
    addAddr(state, addrInfo) {
      state.address = state.address.map(item => {
        if (addrInfo.isDefault == 1) {
          // 取消所有默认
          item.isDefault = 0;
        }
        return item;
      });
      state.address.unshift(addrInfo);
      // 当添加之后，把对象数组存储到本地的 localStorage 中
      localStorage.setItem("address", JSON.stringify(state.address));
    },
    // 更新地址
    updateAddr(state, addrInfo) {
      state.address = state.address.map(item => {
        if (addrInfo.isDefault == 1) {
          item.isDefault = 0;
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
    },
    // 商品加入购物车
    addToCart(state, goodsinfo) {
      // 如果购物车中，之前就已经有这个对应的商品了，那么只需要更新数量
      // 如果没有，则直接把商品数据，push 到 cart 中即可
      // 假设在购物车中，没有找到对应的商品
      var flag = false;
      state.cart.some(item => {
        if (item.id == goodsinfo.id) {
          item.num += parseInt(goodsinfo.num);
          flag = true;
          return true;
        }
      });
      // 如果最终循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到购物车中
      if (!flag) {
        state.cart.unshift(goodsinfo);
      }
      // 当添加之后，把对象数组存储到本地的 localStorage 中
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateGoodsInfo(state, goodsinfo) {
      // 修改购物车中商品的数量值
      state.cart.some(item => {
        if (item.id == goodsinfo.id) {
          item.num = parseInt(goodsinfo.num);
          return true;
        }
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    // 删除购物车商品
    removeGoodsInfo(state, obj) {
      if (obj instanceof Array) {
        // 如果是数组，则是批量删除
        obj.forEach(objItem => {
          state.cart.forEach((item, i) => {
            if (item.id == objItem) {
              state.cart.splice(i, 1);
            }
          });
        });
      } else {
        // 单项删除
        state.cart.forEach((item, i) => {
          if (item.id == obj.id) {
            state.cart.splice(i, 1);
            return true;
          }
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  },
  getters: {
    // this.$store.getters.方法名
    // 获取默认地址
    getAddress(state) {
      return state.address.filter(item => item.isDefault == 1).length > 0
        ? state.address.filter(item => item.isDefault == 1)[0]
        : "";
    },
    // 获取商品总件数
    getAllCount(state) {
      return state.cart.reduce((prev, cur) => {
        prev += cur.num;
        return prev;
      }, 0);
    }
  },
  actions: {
    // 专门负责发送异步 ajax 请求，从服务器端获取数据
    // this.$store.dispatch('方法名')
    getAddr(context) {
      // context 代表整个 vuex 对象
      (async function() {
        var result = await axios.get("/user/address");
        context.commit("setAddr", result.data);
      })();
    },
    postAddr(context, addrInfo) {
      (async function() {
        await axios.post("/user/address", addrInfo);
        context.dispatch("getAddr");
      })();
    },
    async putAddr(context, addrInfo) {
      await axios.put(`/user/address/${addrInfo.id}`, addrInfo);
      context.dispatch("getAddr");
    },
    async deleteAddr(context, addrInfo) {
      await axios.delete(`/user/address/${addrInfo.id}`);
      context.dispatch("getAddr");
    },
    async getCart(context) {
      var result = await axios.get("/cart/list");
      context.commit("setCart", result.data);
    },
    async postCart(context, goodsInfo) {
      await axios.post("/cart/addcart", goodsInfo);
      context.dispatch("getCart");
    },
    async putCart(context, goodsInfo) {
      await axios.put("/cart/updatecart", goodsInfo);
      context.dispatch("getCart");
    },
    async deleteCart(context, goodsInfo) {
      await axios.delete("/cart/delcart", { data: goodsInfo });
      context.dispatch("getCart");
    }
  },
  modules: {}
});
