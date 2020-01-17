<template>
  <div class="member">
    <van-nav-bar title="个人中心" fixed> </van-nav-bar>
    <van-cell-group>
      <van-cell
        title="订单管理"
        icon="orders-o"
        size="large"
        is-link
        to="/member/address"
      >
      </van-cell>
      <van-cell
        title="收货地址管理"
        icon="location-o"
        size="large"
        is-link
        to="/member/address"
      >
      </van-cell>
      <van-cell
        title="我的购物车"
        icon="cart-o"
        size="large"
        is-link
        to="/cart"
      >
      </van-cell>
      <van-cell
        title="账号与安全"
        icon="user-o"
        size="large"
        is-link
        to="/member/account"
      >
      </van-cell>
    </van-cell-group>
    <van-divider></van-divider>
    <van-button type="primary" size="large">退出登录</van-button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  created() {
    // this.getAddr()
  },
  methods: {
    ...mapActions([
      // 去vuex的actions中取出名为getAddr的函数放到此地
      "getAddr"
    ])
    /**
     * login(user){
     *   this.$store.dispatch("login",user)
     * },
     * logout(){...},
     * register(){...}
     */
  }
};
</script>
<style lang="scss" scoped>
.member {
  padding-top: 50px;
}
</style>
