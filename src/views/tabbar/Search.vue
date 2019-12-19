<template>
  <div class="about">
    <button @click="add(goodsinfo)">商品1加入购物车</button><br />
    <button @click="add(goodsinfo2)">商品2加入购物车</button><br />
    <button @click="add(goodsinfo3)">商品3加入购物车</button><br />
    <button @click="add(goodsinfo4)">商品4加入购物车</button><br />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      canclick: true, // 防抖开关
      goodsinfo: {
        id: 1,
        uid: 1,
        productId: 1,
        num: 1, // 购买数量
        size: 42,
        isDelete: 0,
        isSelected: 1,
        price: 6999,
        desc:
          "酷睿双核i5处理器|256GB SSD|8GB内存|英特尔HD显卡620含共享显卡内存",
        title: "Apple MacBook Air系列",
        thumb: "http://112.74.206.213/img/product/md/57ad359dNd4a6f130.jpg"
      },
      goodsinfo2: {
        id: 2,
        uid: 1,
        productId: 2,
        num: 2, // 购买数量
        size: 42,
        isDelete: 0,
        isSelected: 1,
        price: 3899,
        desc: "酷睿双核i5处理器|512GB SSD|2GB内存|英特尔HD独立显卡",
        title: "小米Air 金属超轻薄",
        thumb: "http://112.74.206.213/img/product/md/57ad8846N64ac3c79.jpg"
      },
      goodsinfo3: {
        id: 3,
        uid: 1,
        productId: 3,
        num: 1, // 购买数量
        size: 42,
        isDelete: 0,
        isSelected: 1,
        price: 99,
        desc:
          "华硕(ASUS)13.3英寸RX310UQ金属超极本 学生 商务手提轻薄便携超薄笔记本电脑 玫瑰金 13.3英寸I3-7100U/4G/128G固态",
        title: "华硕RX310 金属超极本",
        thumb: "http://112.74.206.213/img/product/md/57ba6a56N1e3e3d63.jpg"
      },
      goodsinfo4: {
        id: 4,
        uid: 1,
        productId: 4,
        num: 1, // 购买数量
        size: 42,
        isDelete: 0,
        isSelected: 1,
        price: 399,
        desc:
          "华硕(ASUS)13.3英寸RX310UQ金属超极本 学生 商务手提轻薄便携超薄笔记本电脑 玫瑰金 13.3英寸I3-7100U/4G/128G固态",
        title: "华硕RX310 金属超极本",
        thumb: "http://112.74.206.213/img/product/md/57ba6a56N1e3e3d63.jpg"
      }
    };
  },
  methods: {
    // ...mapMutations(["addToCart"]),
    ...mapActions(["postCart"]),
    add(goodsInfo) {
      if (this.canclick) {
        this.canclick = false;
        setTimeout(() => {
          this.postCart(goodsInfo);
          this.canclick = true;
        }, 300);
      }
    }
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
