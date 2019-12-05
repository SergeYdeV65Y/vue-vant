<template>
  <div>
    <div @click="onChange">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <!-- 谁使用此轮播图组件，谁传递 bannerlist -->
      <!-- bannerlist 应该是父组件向子组件传值来设置 -->
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="item in bannerlist" :key="item.id">
          <img
            v-lazy="item.imgsrc"
            :data-href="item.href"
            :class="{ full: isfull }"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
export default {
  props: ["bannerlist", "isfull"],
  methods: {
    onChange(e) {
      if (e.target.nodeName === "IMG") {
        this.$router.push(e.target.dataset.href);
      }
    }
  }
};
</script>
<style scoped lang="scss">
.van-swipe {
  height: 200px;
  .van-swipe-item {
    text-align: center;
  }
  img {
    height: 100%;
  }
  .full {
    width: 100%;
  }
}
</style>
