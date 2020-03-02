<template>
  <div class="login">
    <v-touch
      v-on:swipeleft="onSwipeLeft"
      v-on:swiperight="onSwipeRight"
      tag="div"
    >
      <navbar title="登录"></navbar>
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
          v-model="uname"
          name="账号"
          label="账号"
          placeholder="手机号/邮箱/会员名"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          v-model="pwd"
          :type="showPwd ? 'password' : 'text'"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          ref="pwd"
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
          <van-col span="20">
            <van-button
              round
              block
              type="primary"
              size="large"
              native-type="submit"
            >
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
      </van-form>
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
import navbar from "../../components/Navbar";

import { Toast } from "vant";
import { login } from "../../assets/api/user";
export default {
  data() {
    return {
      uname: "root",
      pwd: "123456",
      showPwd: true // 密码显示
    };
  },
  methods: {
    onSubmit(values) {
      let params = {
        eid: this.uname,
        pwd: this.pwd,
        remme: 1 // 记住密码
      };
      login(params).then(res => {
        if (res.token) {
          if (!!this.$route.query.redirect) {
            // 登录后调回原路由 $route
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push({ path: `/home` });
          }
        }
      });
    },
    // 左右滑动返回上一层
    onSwipeLeft() {
      this.$router.go(+1);
    },
    onSwipeRight() {
      // this.$router.go(-1);
    }
  },
  components: {
    navbar
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
