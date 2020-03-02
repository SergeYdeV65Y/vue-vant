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
    <van-button type="primary" size="large" @click="logout">
      退出登录
    </van-button>
    <h3>欢迎{{ uname }}</h3>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      this.$store.state.cart = [];
      this.$router.push({ path: `/home` });
    }
  },
  computed: {
    ...mapState(["uname"])
  }
};
</script>
<style lang="scss" scoped>
.member {
  padding-top: 50px;
}
</style>
