<template>
  <div class="cart">
    <van-nav-bar
      title="购物车"
      right-text="管理"
      fixed
      @click-right="onClickRight"
      ref="manage"
    >
    </van-nav-bar>
    <van-checkbox-group
      v-model="result"
      ref="checkboxGroup"
      checked-color="#f00"
    >
      <van-swipe-cell
        :on-close="onClose"
        v-for="(item, index) in cart"
        :key="item.id"
        :data-index="index"
      >
        <van-cell>
          <van-checkbox slot="icon" :name="item.id" />
          <van-card
            :num="item.num"
            :price="item.price"
            :desc="item.desc"
            :title="item.title"
            :thumb="item.thumb"
          >
            <div slot="footer" @click="changeNum($event, index)">
              <van-stepper v-model="item.num" />
            </div>
          </van-card>
        </van-cell>
        <template slot="right">
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>
    <van-submit-bar
      v-show="flag"
      :price="total"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="toggleAll">全选</van-checkbox>
    </van-submit-bar>
    <van-submit-bar v-show="!flag" button-text="删除" @submit="delAll">
      <van-checkbox v-model="checked" @click="toggleAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import { Dialog, Toast } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      flag: true,
      checked: "", // submit
      result: [], // checkbox-group
      count: 1, // toggle
      canclick: true // 防抖开关
    };
  },
  created() {
    this.cart.length > 0 ? this.result.push(this.cart[0].id) : "";
  },
  methods: {
    ...mapMutations(["updateGoodsInfo", "removeGoodsInfo"]),
    ...mapActions(["putCart", "deleteCart"]),
    // 修改购物车商品数量
    changeNum(e, i) {
      if (e.target && e.target.nodeName == "BUTTON") {
        if (this.canclick) {
          this.canclick = false;
          setTimeout(() => {
            this.putCart(this.cart[i]);
            this.canclick = true;
          }, 500);
        }
        // this.updateGoodsInfo(this.cart[i]);
      }
    },
    // 批量删除购物车商品
    delAll() {
      // this.removeGoodsInfo(this.result);
      Dialog.confirm({
        title: "确认删除此商品？"
      })
        .then(() => {
          // on confirm
          this.deleteCart(this.result);
        })
        .catch(() => {
          // on cancel
        });
    },
    // 切换批量删除功能
    onClickRight() {
      this.$refs.manage.lastChild.firstChild.innerText = this.flag
        ? "完成"
        : "管理";
      this.flag = !this.flag;
    },
    // clickPosition 表示关闭时点击的位置
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？"
          })
            .then(() => {
              var index = instance.$vnode.data.attrs["data-index"];
              // this.removeGoodsInfo(this.cart[index]);
              this.deleteCart(this.cart[index]);
              instance.close();
            })
            .catch(() => {
              // on cancel
            });
          break;
      }
    },
    // 全选或全不选
    toggleAll() {
      // this.$refs.checkboxGroup.toggleAll();
      if (this.count % 2 != 0) {
        for (var item of this.cart) {
          if (!this.result.includes(item.id)) {
            this.result.push(item.id);
          }
        }
      } else {
        this.result = [];
      }
      this.count++;
    },
    // 提交订单
    onSubmit() {
      if (this.result.length > 0) {
        var arr = this.result.join("&");
        this.$router.push(`/cart/pay/${arr}`);
      } else {
        Toast({
          message: "你没有添加商品哟"
        });
      }
    }
  },
  computed: {
    // 计算总价格
    total() {
      var sum = 0;
      for (var item of this.cart) {
        if (this.result.includes(item.id)) {
          sum += item.price * 100 * item.num;
        }
      }
      return sum;
    },
    ...mapState(["cart"])
  },
  watch: {
    result() {
      // 根据复选框的选中个数判断全选按钮是否应该选中
      this.checked = this.result.length == this.cart.length ? true : false;
    }
  }
};
</script>
<style lang="scss">
.cart {
  padding-top: 50px;
  .van-col {
    font-size: 1.5rem;
    text-align: center;
  }
  .van-nav-bar__text {
    color: #666;
  }
  .van-checkbox__icon--round .van-icon {
    border-radius: 100%;
    border: 1px solid #666;
  }
  .van-submit-bar {
    position: fixed;
    bottom: 50px;
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
}
</style>