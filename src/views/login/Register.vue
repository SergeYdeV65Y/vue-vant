<template>
  <div class="register">
    <navbar title="注册"></navbar>
    <div class="header">
      <van-image
        round
        width="8rem"
        height="8rem"
        src="/img/index/avatar-default.png"
      />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        maxlength="11"
        name="手机号码"
        placeholder="手机号码"
        :rules="[{ required: true, message: '请填写手机号码' }]"
        ref="phone"
      />
      <van-field
        v-model="uname"
        name="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="pwd"
        :type="showPwd ? 'password' : 'text'"
        name="密码"
        placeholder="请输入6~14位的密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        ref="pwd"
      >
        <van-icon
          :name="showPwd ? 'closed-eye' : 'eye'"
          slot="button"
          @click="showPwd = !showPwd"
        />
      </van-field>
      <van-field
        v-model="code"
        name="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
        ref="code"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          v-if="showTime"
          @click.prevent="sender"
        >
          获取验证码
        </van-button>
        <van-count-down :time="time" slot="button" v-else>
          <template v-slot="timeData">
            <span class="item">{{ timeData.seconds }}秒</span>
          </template>
        </van-count-down>
      </van-field>
      <van-row type="flex" justify="center" class="mt">
        <van-col span="20">
          <sup v-if="!showTime">短信验证码已经发送，请你在2分钟内填写</sup>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="mt">
        <van-col span="20">
          <van-button
            round
            block
            type="primary"
            :disabled="!disabled"
            size="large"
            native-type="submit"
          >
            同意协议注册
          </van-button>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="mt">
        <van-col span="20">
          <van-checkbox v-model="disabled" checked-color="#07c160">
            已阅读并同意以下协议
          </van-checkbox>
        </van-col>
      </van-row>
    </van-form>
  </div>
</template>
<script>
import navbar from "../../components/Navbar";
import { Toast } from "vant";
import { reguser, sms } from "../../assets/api/user";
export default {
  data() {
    return {
      phone: "",
      uname: "",
      pwd: "",
      code: "",
      phcode: "", // 手机短信验证码
      showTime: true, // 验证码按钮显示
      time: 60 * 1000, // 短信倒计时
      showPwd: true, // 密码显示
      disabled: true // 同意协议
    };
  },
  methods: {
    // 提交用户信息
    onSubmit(values) {
      let regphone = /^1[3456789]\d{9}$/;
      let regpwd = /^\w{6,14}$/;
      if (!regphone.test(this.phone)) {
        this.$refs.phone.validateMessage = "手机号码格式不正确";
        return false;
      }
      if (!regpwd.test(this.pwd)) {
        this.$refs.pwd.validateMessage = "密码长度为6~14的字符，字母/数字";
        return false;
      }
      if (this.code != this.phcode) {
        this.$refs.code.validateMessage = "您输入的验证码有误";
        return false;
      }
      let data = {
        phone: this.phone,
        eid: this.uname,
        pwd: this.pwd
      };
      reguser(data).then(res => {
        console.log(res);
        if (res.code != 1) {
          console.log(res.msg);
          this.$refs.phone.validateMessage = res.msg;
        } else {
          Toast.loading({
            message: res.msg + "请登录",
            forbidClick: true,
            loadingType: "spinner",
            duration: 1000 // 持续展示 toast
          });
          setTimeout(() => {
            this.$router.push({ path: `/login` });
          }, 1000);
        }
      });
    },
    // 获取短信验证
    sender() {
      let params = this.phone;
      if (!params) {
        this.$refs.phone.validateMessage = "请您输入手机号码";
        return false;
      }
      sms(params).then(res => (this.phcode = res.data));
      this.showTime = !this.showTime;
      setTimeout(() => {
        this.showTime = !this.showTime;
      }, this.time);
    }
  },
  components: {
    navbar
  }
};
</script>
<style lang="scss">
.register {
  // display: flex;
  // flex-direction: column;
  flex: 1;
  align-items: center;
  height: 100%;
  background-color: #fff;
  .header {
    padding: 50px 0;
    display: flex;
    justify-content: center;
  }
  .van-cell {
    padding: 15px 30px;
  }
  // 倒计时
  .item {
    display: inline-block;
    width: 30px;
    margin-right: 5px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #1989fa;
  }
  .mt {
    margin-top: 10px;
  }
  .van-checkbox__icon--round .van-icon {
    border-radius: 100%;
    border: 1px solid #666;
  }
}
</style>
