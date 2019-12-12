<template>
  <div class="about">
    <!-- 轮播图 -->
    <!-- <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" @click="getImg" />
      </van-swipe-item>
    </van-swipe> -->
    <!-- 联系人 -->
      <van-swipe-cell>
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
        />
      </van-swipe-cell>
    {{$store.getters.getAddress}}
    <!-- <van-divider /> -->
    <van-panel title="支付方式" status="在线支付">
    </van-panel>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
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
    // onAdd() {
    //   Toast("新增地址");
    //   this.$router.push("/member/addressadd");
    // },
    // onEdit(item, index) {
    //   Toast("编辑地址:" + index + item.href);
    //   this.$router.push("/member/addressedit");
    // }
  }

  // data() {
  //   return {
  //     images: [
  //       "https://img.yzcdn.cn/vant/apple-1.jpg",
  //       "https://img.yzcdn.cn/vant/apple-2.jpg"
  //     ]
  //   };
  // },
  // methods: {
  //   getImg() {
  //     ImagePreview(this.images);
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.about {
  img {
    width: 100%;
  }
}
</style>
