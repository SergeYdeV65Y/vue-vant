<template>
  <div class="address">
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
  }
};
</script>
<style scoped lang="scss"></style>
