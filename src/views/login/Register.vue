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

    <van-cell-group>
      <van-field
        v-model="phone"
        required
        placeholder="请输入手机号"
        :error-message="phmsg"
      />
      <van-field
        v-model="uname"
        required
        placeholder="请输入用户名"
        :error-message="umsg"
      />
      <van-field
        v-model="pwd"
        :type="showPwd ? 'password' : 'text'"
        required
        placeholder="请输入密码"
        :error-message="pwdmsg"
      >
        <van-icon
          :name="showPwd ? 'closed-eye' : 'eye'"
          slot="button"
          @click="showPwd = !showPwd"
        />
      </van-field>
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
        <van-button
          type="primary"
          :disabled="!disabled"
          size="large"
          @click="onClickButtonSubmit"
        >
          同意协议注册
        </van-button>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center" class="mt">
      <van-col span="22">
        <van-checkbox v-model="disabled" checked-color="#07c160">
          已阅读并同意以下协议
        </van-checkbox>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import navbar from "../../components/Navbar";
import { Toast } from "vant";
import { reguser } from "../../assets/api/user";
export default {
  data() {
    return {
      showTime: true,
      time: 5 * 1000, // 短信倒计时
      phone: "13510740753",
      // phone: "",
      uname: "lam",
      pwd: "123",
      code: 123,
      phmsg: "",
      umsg: "",
      pwdmsg: "",
      codemsg: "",
      phcode: 123, // 手机短信验证码
      showPwd: true,
      disabled: true // 同意协议
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
    // 提交用户信息
    onClickButtonSubmit(e) {
      let reg = /^1[3456789]\d{9}$/;
      if (this.phone == "") {
        this.phmsg = "手机号码不能为空";
        return false;
      }
      if (this.uname == "") {
        this.umsg = "用户名不能为空";
        return false;
      }
      if (this.pwd == "") {
        this.pwdmsg = "密码不能为空";
        return false;
      }
      if (!reg.test(this.phone)) {
        this.phmsg = "请输入有效的手机号码";
        return false;
      }
      if (this.code != this.phcode) {
        this.codemsg = "验证码错误";
        return false;
      } else {
        let data = {
          phone: this.phone,
          eid: this.uname,
          pwd: this.pwd
        };
        reguser(data).then(res => {
          console.log(res);
          if (res.code != 1) {
            this.phmsg = res.msg;
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
      }
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
