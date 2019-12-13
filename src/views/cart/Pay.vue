<template>
  <div class="about">
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

    <van-panel title="支付方式" status="在线支付"> </van-panel>

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
  data() {
    return {
      flag: false,
      list: ""
    };
  },
  created() {},
  methods: {
    showPopup() {
      this.flag = true;
    }
  },
  computed: {
    ...mapState(["address"]),
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
