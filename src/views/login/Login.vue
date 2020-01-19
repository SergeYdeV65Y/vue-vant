<template>
  <div class="login">
    <v-touch
      v-on:swipeleft="onSwipeLeft"
      v-on:swiperight="onSwipeRight"
      tag="div"
    >
      <div class="header">
        <van-image
          round
          width="8rem"
          height="8rem"
          src="/img/index/avatar-default.png"
        />
      </div>
      <van-field
        v-model="uname"
        label="账号"
        clearable
        placeholder="手机号/邮箱/会员名"
      />
      <van-field
        v-model="pwd"
        :type="showPwd ? 'password' : 'text'"
        label="密码"
        placeholder="请输入密码"
      >
        <van-icon
          :name="showPwd ? 'closed-eye' : 'eye'"
          slot="button"
          @click="showPwd = !showPwd"
        />
      </van-field>
      <van-row type="flex" justify="end" class="mt">
        <van-col span="6">
          <router-link to="/forgetpwd">忘记密码?</router-link>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="mt">
        <van-col span="22">
          <van-button type="info" size="large" @click="onClickButtonSubmit">
            登录
          </van-button>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="mt">
        <van-col span="8" offset="2">
          <router-link to="/codelogin">短信验证登录</router-link>
        </van-col>
        <van-col span="4"
          ><router-link to="/register">注册</router-link></van-col
        >
      </van-row>
      <van-divider
        :style="{ color: '#444', borderColor: '#bbb', padding: '0 16px' }"
      >
        第三方快速登录
      </van-divider>
      <van-row type="flex" justify="space-around">
        <van-col span="4" offset="1">
          <van-image
            round
            width="4rem"
            height="4rem"
            src="/img/index/avatar-default.png"
          />
        </van-col>
        <van-col span="4" offset="1">
          <van-image
            round
            width="4rem"
            height="4rem"
            src="/img/index/avatar-default.png"
          />
        </van-col>
        <van-col span="4" offset="1">
          <van-image
            round
            width="4rem"
            height="4rem"
            src="/img/index/avatar-default.png"
          />
        </van-col>
      </van-row>
    </v-touch>
  </div>
</template>
<script>
import { Toast } from "vant";
import { login } from "../../assets/api/user";
export default {
  data() {
    return {
      showPwd: true,
      msg: "",
      uname: "root",
      pwd: "123456"
    };
  },
  methods: {
    onClickButtonSubmit(e) {
      // 提交用户信息
      if (this.uname == "") {
        this.$toast("用户名不能为空");
        return false;
      }
      if (this.pwd == "") {
        this.$toast("密码不能为空");
        return false;
      } else {
        let data = {
          eid: this.uname,
          pwd: this.pwd,
          remme: 1
        };
        login(data).then(() => {
          setTimeout(() => {
            if (!!this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push({ path: `/home` });
            }
          }, 100);
        });
      }
    },
    // 左右滑动返回上一层
    onSwipeLeft() {
      this.$router.go(+1);
    },
    onSwipeRight() {
      // this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  flex: 1;
  // display: flex;
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
  .mt {
    margin-top: 10px;
  }
}
</style>
