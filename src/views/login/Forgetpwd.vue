<template>
  <div class="forgetpwd">
    <navbar title="找回密码"></navbar>
    <van-cell-group class="mt">
      <van-field
        v-model="phone"
        required
        placeholder="请输入手机号"
        :error-message="phmsg"
      />
      <van-field
        v-model="code"
        type="text"
        placeholder="请输入验证码"
        :error-message="codemsg"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          v-if="showTime"
          @click="sms"
        >
          获取验证码
        </van-button>
        <van-count-down :time="time" slot="button" v-else>
          <template v-slot="timeData">
            <span class="item">{{ timeData.seconds }}秒</span>
          </template>
        </van-count-down>
      </van-field>
    </van-cell-group>
    <van-row type="flex" justify="center" class="mt">
      <van-col span="22">
        <van-button type="info" size="large" @click="onClickButtonSubmit">
          确认找回密码
        </van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import navbar from "../../components/Navbar";
export default {
  data() {
    return {
      showTime: true,
      time: 5 * 1000, // 短信倒计时
      phone: "",
      code: "",
      phcode: 123, // 手机短信验证码
      phmsg: "",
      codemsg: ""
    };
  },
  methods: {
    // 获取短信验证
    sms() {
      // let params = {
      //   phone: this.phone
      // };
      // this.$minApi.short(params).then(res => {
      //   this.coder = res.data;
      //   console.log(res);
      // });
      // console.log(params);
      this.showTime = !this.showTime;
      this.phcode = 123;
      setTimeout(() => {
        this.showTime = !this.showTime;
      }, this.time);
    },
    onClickButtonSubmit: function(e) {
      if (this.phone == "") {
        this.$toast("手机号码不能为空");
        return false;
      }
      if (this.code == "") {
        this.$toast("验证码不能为空");
        return false;
      } else {
      }
    }
  },
  components: {
    navbar
  }
};
</script>

<style lang="scss">
.forgetpwd {
  box-sizing: border-box;
  padding-top: 50px;
  flex: 1;
  height: 100%;
  background-color: #fff;
  .mt {
    margin-top: 50px;
  }
}
</style>
