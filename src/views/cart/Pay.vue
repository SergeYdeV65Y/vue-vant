<template>
  <div class="pay">
    <!-- 有默认地址 -->
    <div class="panel" v-if="typeof getAddress === 'object'">
      <div class="left">
        <van-icon name="location-o" />
      </div>
      <div class="center">
        <p>
          <span>{{ getAddress.name }}</span>
          <span>{{ getAddress.tel }}</span>
        </p>
        <p>{{ getAddress.address }}</p>
      </div>
      <div class="right">
        <van-icon name="arrow" @click="showPopup" />
      </div>
    </div>
    <!-- 没有默认地址 -->
    <div class="panel" v-else>
      <div class="center">
        <router-link to="/member/address">
          请添加收货地址
        </router-link>
      </div>
      <div class="right">
        <van-icon name="arrow" @click="showPopup" />
      </div>
    </div>

    <van-panel title="支付方式" status="在线支付"></van-panel>

    <van-panel title="宝爸宝妈" desc="商品信息" :status="`共${num}件`">
      <div>
        <van-row type="flex">
          <van-col span="8" v-for="item in goods" :key="item.id">
            <van-image :src="item.thumb" />
          </van-col>
        </van-row>
      </div>
    </van-panel>
    <van-panel title="配送方式" status="快递免邮"></van-panel>
    <van-panel title="运费险" status="卖家赠送，退货可赔"></van-panel>

    <van-submit-bar :price="price" button-text="结算" @submit="onSubmit" />
    <!-- popup 弹出层 -->
    <van-popup v-model="flag" position="top" round>
      <div class="panel" v-for="item in address" :key="item.id">
        <div class="left" v-if="item.isDefault == 1">
          <van-icon name="location-o" />
          <van-divider />
        </div>
        <div class="left active" v-else>
          <van-icon name="location-o" />
        </div>
        <div class="center">
          <p>
            <span>{{ item.name }}</span>
            <span>{{ item.tel }}</span>
          </p>
          <p>{{ item.address }}</p>
        </div>
        <router-link class="right" :to="`/member/addressedit/${item.id}`">
          编辑
        </router-link>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: ["arr"],
  data() {
    return {
      flag: false,
      goods: [],
      price: 0,
      num: 0
    };
  },
  created() {
    this.getGoods(this.arr);
    this.getTotal();
  },
  methods: {
    // 结算订单
    onSubmit() {
      console.log(1);
    },
    showPopup() {
      this.flag = true;
    },
    getGoods(id) {
      this.arr.split("&").forEach(arrItem => {
        this.cart.forEach((item, i) => {
          if (item.id == arrItem) {
            this.goods.push(item);
          }
        });
      });
    },
    getTotal() {
      var num = 0;
      var sum = 0;
      for (var item of this.goods) {
        num += item.num;
        sum += item.price * 100 * item.num;
      }
      this.price = sum;
      this.num = num;
    }
  },
  computed: {
    ...mapState(["address", "cart"]),
    ...mapGetters(["getAddress"])
  }
};
</script>
<style lang="scss" scoped>
.pay {
  padding: 10px;
  .panel {
    display: flex;
    border: 1px solid #ccc;
    border-radius: 5px;
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
  .van-col {
    font-size: 1.5rem;
    text-align: center;
  }
  .van-checkbox__icon {
    border-radius: 50%;
    border: 2px solid #f00;
  }
  .van-submit-bar {
    .van-checkbox {
      margin-left: 15px;
    }
  }
  .van-button {
    height: 100%;
  }
  .van-submit-bar__bar {
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .van-panel:nth-child(3) {
    border: 2px solid #ddd;
    border-radius: 5px;
  }
}
</style>
