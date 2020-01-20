<template>
  <div class="layout">
    <router-view></router-view>
    <!-- 底部 tabbar区域 -->
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">
        发现
      </van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o" :info="getAllCount">
        购物车
      </van-tabbar-item>
      <van-tabbar-item to="/member" icon="user-circle-o">
        个人中心
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      flag: false
    };
  },
  created() {
    this.flag = this.$route.path === "/home" ? false : true;
    if (localStorage.getItem("token")) {
      this.getAddr();
      this.getCart();
    }
  },
  methods: {
    ...mapActions([
      // 去 vuex 的 actions 中取出名为 getAddr 的函数放到此地
      "getAddr",
      "getCart"
    ]),
    /**
     * login(user){
     *   this.$store.dispatch("login",user)
     * },
     * logout(){...},
     * register(){...}
     */
    // 点击后退
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapGetters(["getAllCount"])
  },
  watch: {
    // 不能使用箭头函数
    "$route.path": function(val) {
      this.flag = val === "/home" ? false : true;
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  overflow-x: hidden;
  padding-bottom: 50px;
  .van-tabbar-item {
    background: #e9e9e9;
  }
}
</style>
