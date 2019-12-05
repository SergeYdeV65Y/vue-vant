<template>
  <div class="home">
    <!-- 轮播图 swiper -->
    <swiper :bannerlist="bannerlist" :isfull="true"></swiper>
    <!-- grid 宫格 -->
    <van-grid :border="false" :column-num="3" class="mt">
      <van-grid-item to="/search">
        <van-image
          round
          width="4rem"
          height="4rem"
          src="/img/index/menu1.png"
        />
        <span>新闻资讯</span>
      </van-grid-item>
      <van-grid-item to="/search">
        <van-image
          round
          width="4rem"
          height="4rem"
          src="/img/index/menu2.png"
        />
        <span>图片分享</span>
      </van-grid-item>
      <van-grid-item>
        <van-image
          round
          width="4rem"
          height="4rem"
          src="/img/index/menu3.png"
        />
        <span>商品购买</span>
      </van-grid-item>
      <van-grid-item>
        <van-image
          round
          width="4rem"
          height="4rem"
          src="/img/index/menu4.png"
        />
        <span>视频专区</span>
      </van-grid-item>
      <van-grid-item>
        <van-image
          round
          width="4rem"
          height="4rem"
          src="/img/index/menu5.png"
        />
        <span>留言反馈</span>
      </van-grid-item>
      <van-grid-item>
        <van-image
          round
          width="4rem"
          height="4rem"
          src="/img/index/menu6.png"
        />
        <span>联系我们</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { getBanner } from "../../assets/api/home.js";
//      对象解构        模块对象，其中包含getIndex()
import swiper from "../../components/Swiper";
export default {
  data() {
    return {
      bannerlist: [{ imgsrc: "" }]
    };
  },
  created() {
    getBanner().then(res => (this.bannerlist = res));
  },
  methods: {},
  components: {
    swiper
  }
};
</script>
<style lang="scss" scoped>
.mt {
  margin-top: 10px;
}
</style>
