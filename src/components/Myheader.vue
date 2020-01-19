<template>
  <div>
    <van-nav-bar :title="titleName" fixed v-show="showAbs">
      <van-icon name="arrow-left" slot="left" @click="$router.go(-1)" />
    </van-nav-bar>
    <van-nav-bar
      :title="titleName"
      fixed
      v-show="!showAbs"
      :style="opacityStyle"
    >
      <van-icon name="arrow-left" slot="left" @click="$router.go(-1)" />
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  props: ["titleName"],
  data() {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const top = document.documentElement.scrollTop;
      if (top > 60) {
        this.opacityStyle = { opacity: "0.7" };
        this.showAbs = false;
      } else {
        this.showAbs = true;
      }
    }
  }
};
</script>
<style></style>
