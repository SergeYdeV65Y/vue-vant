<template>
  <van-nav-bar :title="title" fixed>
    <van-icon name="arrow-left" slot="left" @click="goBack" />
  </van-nav-bar>
</template>
<script>
export default {
  props: ["title"],
  methods: {
    // 点击后退
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
