<template>
  <div class="pay">
    <navbar title="确认订单"></navbar>
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
      <div class="extra">
        <router-link to="/member/address">
          请添加收货地址
        </router-link>
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
      <div class="panel">
        <div class="extra">
          <router-link to="/member/address">
            添加新收货地址
          </router-link>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { getPay, createOrder } from "../../assets/api/pay.js";
import { Dialog } from "vant";
import { mapState, mapGetters } from "vuex";
import navbar from "../../components/Navbar";
export default {
  props: ["arr"],
  data() {
    return {
      flag: false, // 地址弹出层
      goods: [], // 商品信息
      price: 0, // 总价
      num: 0 // 总件数
    };
  },
  created() {
    // 结算订单商品详情
    this.getGoods(this.arr);
    // 商品总价总件数
    this.getTotal();
  },
  methods: {
    showPopup() {
      this.flag = true;
    },
    buy(data) {
      getPay(data).then(result => {
        if (result.code == 200) {
          Dialog.confirm({
            title: "确认支付此订单？"
          })
            .then(() => {
              // on confirm
              createOrder(data).then(result => {
                document.body.innerHTML = result;
                document.querySelector("[id^=alipaySDKSubmit]").submit();
              });
            })
            .catch(() => {
              // on cancel
            });
        }
      });
    },
    // 结算订单
    onSubmit() {
      this.buy({
        payName: "root",
        goodsName: Date.now(),
        count: this.num,
        price: this.price / 100,
        cost: this.price / 100
      });
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
      // 商品总价总件数
      this.price = sum;
      this.num = num;
    }
  },
  computed: {
    ...mapState(["address", "cart"]),
    ...mapGetters(["getAddress"])
  },
  components: {
    navbar
  }
};
</script>
<style lang="scss">
.pay {
  padding: 50px 0;
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
        font-size: 0.75rem;
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
      color: #666;
    }
    .extra {
      display: flex;
      width: 100%;
      height: 40px;
      justify-content: center;
      align-items: center;
      a {
        color: #333;
      }
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
    position: fixed;
    bottom: 50px;
    .van-checkbox {
      margin-left: 15px;
    }
  }
  .van-submit-bar__bar {
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .van-panel:nth-child(4) {
    border: 2px solid #ddd;
    border-radius: 5px;
  }
}
</style>
