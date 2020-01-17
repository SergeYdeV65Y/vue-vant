<template>
  <v-touch
    v-on:swipeleft="onSwipeLeft"
    v-on:swiperight="onSwipeRight"
    tag="div"
  >
  </v-touch>
</template>
<script>
export default {
  methods: {
    // 左右滑动返回上一层
    onSwipeLeft() {
      // this.$router.go(-1);
    },
    onSwipeRight() {
      //  console.log("右滑")
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.touch {
  height: 100%;
}
</style>
