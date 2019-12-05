<template>
  <div class="account">
    <van-cell-group>
      <van-field
        v-model="oldpassword"
        required
        clearable
        label="原密码"
        placeholder="请输入原密码"
        size="large"
      />
      <van-field
        v-model="password"
        type="password"
        label="新密码"
        placeholder="请输入新密码"
        required
        size="large"
      />
      <van-field
        v-model="ckpassword"
        type="password"
        label="确认密码"
        placeholder="请输入确认密码"
        required
        size="large"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        required
        size="large"
      >
        <van-button slot="button" size="small" type="primary">
          发送验证码
        </van-button>
      </van-field>
    </van-cell-group>
    <van-divider></van-divider>
    <van-button type="primary" size="large">确认修改</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      oldpassword: "",
      password: "",
      ckpassword: "",
      sms: ""
    };
  }
};
</script>
<style scoped lang="scss"></style>
