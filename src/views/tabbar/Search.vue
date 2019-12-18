<template>
  <div class="about">
    <h1 @click="addToCart(goodsinfo)">商品1加入购物车</h1>
    <h1 @click="addToCart(goodsinfo2)">商品2加入购物车</h1>
    <h1 @click="addToCart(goodsinfo3)">商品3加入购物车</h1>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      product: {
        id: 1,
        proName: "144757c三星标黑色", // 商品名称
        proDesc: "指南针运动 NIKE HYPERSHIFT篮球鞋 844392-010-607-164-017现货", // 商品描述
        market_price: 999, // 市场价
        sell_price: 699, // 销售价
        statu: 1, // 是否上架
        updateTime: "2017-01-05 00:28:29", // 上架时间
        stock: 500, // 库存
        isDelete: 0,
        src: "/img/1.jpg", // 图片
        msrc: "/img/1-small.jpg", // 小图
        click: 15 // 点击数
      },
      goodsinfo: {
        id: 1,
        uid: 1,
        productId: 1,
        num: 1, // 购买数量
        value: 3,
        size: 42,
        isDelete: 0,
        isSelected: 1,
        price: 6999,
        desc: "酷睿双核i5处理器|256GB SSD|8GB内存|英特尔HD显卡620含共享显卡内存",
        title: "Apple MacBook Air系列",
        name: "apple",
        thumb: "http://112.74.206.213/img/product/md/57ad359dNd4a6f130.jpg"
      },
      goodsinfo2: {
        id: 2,
        uid: 1,
        productId: 2,
        num: 2, // 购买数量
        value: 3,
        size: 42,
        isDelete: 0,
        isSelected: 1,
        price: 3899,
        desc: "酷睿双核i5处理器|512GB SSD|2GB内存|英特尔HD独立显卡",
        title: "小米Air 金属超轻薄",
        name: "huawei",
        thumb: "http://112.74.206.213/img/product/md/57ad8846N64ac3c79.jpg"
      },
      goodsinfo3: {
        id: 3,
        uid: 1,
        productId: 3,
        num: 1, // 购买数量
        value: 3,
        size: 42,
        isDelete: 0,
        isSelected: 1,
        price: 99,
        desc: "8825789",
        title: "华硕RX310 金属超极本",
        name: "华硕(ASUS)13.3英寸RX310UQ金属超极本 学生 商务手提轻薄便携超薄笔记本电脑 玫瑰金 13.3英寸I3-7100U/4G/128G固态",
        thumb: "http://112.74.206.213/img/product/md/57ba6a56N1e3e3d63.jpg"
      }
    };
  },
  created() {},
  methods: {
    ...mapMutations(["addToCart"])
  },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["getAddress"])
  }
};
</script>
<style lang="scss" scoped>
.about {
  padding: 10px;
  .panel {
    display: flex;
    border: 1px solid #cccccc;
    border-radius: 10px;
    margin: 10px 0;
    justify-content: space-between;
    .left {
      display: flex;
      width: 15%;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      color: #f00;
      &.active {
        color: #000;
      }
    }
    .center {
      display: flex;
      width: 70%;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      p {
        margin: 3px 0;
        padding: 0;
        font-size: 12px;
        span:first-child {
          font-size: 1.5rem;
        }
      }
    }
    .right {
      display: flex;
      width: 15%;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
