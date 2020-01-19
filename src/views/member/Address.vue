<template>
  <div class="address">
    <navbar title="我的收货地址"></navbar>
    <van-cell-group> </van-cell-group>
    <van-swipe-cell>
      <van-address-list
        v-model="chosenAddressId"
        :list="address"
        @add="onAdd"
        @edit="onEdit"
      />
    </van-swipe-cell>
  </div>
</template>
<script>
import navbar from "../../components/Navbar";
import { mapState } from "vuex";
export default {
  data() {
    return {
      chosenAddressId: "" // 默认地址
    };
  },
  created() {
    this.getChosenAddressId();
  },
  methods: {
    getChosenAddressId() {
      this.chosenAddressId =
        this.address.filter(item => item.isDefault == 1).length > 0
          ? this.address.filter(item => item.isDefault == 1)[0].id
          : "";
    },
    onAdd() {
      this.$router.push("/member/addressadd");
    },
    onEdit(item, index) {
      this.$router.push(`/member/addressedit/${item.id}`);
    }
  },
  computed: {
    ...mapState(["address"])
  },
  components: {
    navbar
  }
};
</script>
<style lang="scss">
.address {
  padding: 50px 0 0 0;
  .van-radio__icon--round .van-icon {
    border-radius: 100%;
    border: 1px solid #666;
  }
}
</style>
