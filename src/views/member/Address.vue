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
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          href: "/home"
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
          href: "/home"
        }
      ]
    };
  },
  methods: {
    onAdd() {
      Toast("新增地址");
      this.$router.push("/member/addressadd");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index + item.href);
      this.$router.push("/member/addressedit");
    }
  }
};
</script>
<style scoped lang="scss"></style>
