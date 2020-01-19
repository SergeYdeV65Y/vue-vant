<template>
  <div class="codelogin">
    <navbar title="验证码登录"></navbar>
    <div class="header">
      <van-image
        round
        width="8rem"
        height="8rem"
        src="/img/index/avatar-default.png"
      />
    </div>

    <van-cell-group>
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
          登录
        </van-button>
      </van-col>
    </van-row>
    <van-row type="flex" justify="space-between" class="mt">
      <van-col span="8" offset="2">
        <router-link to="/login">用户密码登录</router-link>
      </van-col>
      <van-col span="4"><router-link to="/register">注册</router-link></van-col>
    </van-row>
  </div>
</template>
<script>
import navbar from "../../components/Navbar";
import { Toast } from "vant";
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
    onClickButtonSubmit(e) {
      // 提交用户信息
      let reg = /^1[3456789]\d{9}$/;
      if (this.phone == "") {
        this.$toast("手机号码不能为空");
        return false;
      }
      if (!reg.test(this.phone)) {
        this.$toast("请输入有效的手机号码");
        return false;
      }
      if (this.code !== this.coder) {
        this.$toast("验证码错误");
        return false;
      } else {
        let params = {
          phone: this.phone
        };
        console.log("提交信息注册");
        // 方法待完成
      }
    }
  },
  components: {
    navbar
  }
};
</script>
<style lang="scss" scoped>
.codelogin {
  flex: 1;
  height: 100%;
  background-color: #fff;
  .header {
    padding: 50px 0;
    display: flex;
    justify-content: center;
  }
  .mt {
    margin-top: 10px;
  }
  .item {
    font-size: 12px;
    width: 33px;
    margin-right: 5px;
    text-align: center;
    line-height: 30px;
    height: 30px;
    color: #1989fa;
  }
}
</style>
