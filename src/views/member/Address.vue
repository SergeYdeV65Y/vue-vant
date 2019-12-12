<template>
  <div class="address">
    <van-cell-group> </van-cell-group>
    <van-swipe-cell>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
      />
    </van-swipe-cell>
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      chosenAddressId: "",
      list: []
    };
  },
  created() {
    this.getAddressList();
    this.getChosenAddressId();
  },
  methods: {
    getAddressList() {
      this.list =
        JSON.parse(localStorage.getItem("address")) ||
        JSON.parse(sessionStorage.getItem("address")) ||
        this.address;
    },
    getChosenAddressId() {
      var o = this.list.filter(item => {
        return item.isDefault === true;
      });
      this.chosenAddressId = o[0].id;
    },
    onAdd() {
      Toast("新增地址");
      this.$router.push("/member/addressadd");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index + item.id);
      this.$router.push(`/member/addressedit/${item.id}`);
    }
  },
  computed: {
    ...mapState(["address"])
  }
};
</script>
<style scoped lang="scss"></style>
