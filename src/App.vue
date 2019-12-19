<template>
  <div class="app-container">
    <!-- 顶部 header区域 -->
    <van-nav-bar title="vant-ui" fixed>
      <van-icon v-show="flag" name="arrow-left" slot="left" @click="goBack" />
    </van-nav-bar>
    <!-- 中间路由区域 -->
    <transition>
      <router-view></router-view>
    </transition>
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
import { Toast } from "vant";
export default {
  data() {
    return {
      flag: false
    };
  },
  created() {
    this.flag = this.$route.path === "/home" ? false : true;
    this.getAddr();
    this.getCart();
  },
  methods: {
    ...mapActions([
      // 去vuex的actions中取出名为 getAddr的函数放到此地
      "getAddr",
      "getCart"
    ]),
    // 点击后退
    goBack() {
      this.$router.go(-1);
      Toast({
        message: "自定义图标",
        icon: "like-o"
      });
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
.app-container {
  overflow-x: hidden;
  padding-top: 50px;
  padding-bottom: 100px;
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  // .v-enter-active,
  // .v-leave-active {
  //   transition: transform 0.1s ease;
  // }
}
</style>
