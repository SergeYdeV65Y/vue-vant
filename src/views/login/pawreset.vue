<template>
  <div class="pawreset">
    <van-field
      v-model="password"
      type="password"
      clearable
      placeholder="请输入手机号"
      @blur-right-icon="$toast('用户名必须是手机号')"
    />
    <van-field
      v-model="password2"
      type="password2"
      clearable
      placeholder="请输入手机号"
      @blur-right-icon="$toast('用户名必须是手机号')"
    />
    <van-button type="primary"  size="large" @click="onClickButtonSubmit" >同意协议重置密码</van-button>
  </div>
</template>

<script>
  export default {
      data(){
        return{
          password:'',
          password2:'',
        }
      },
      methods:{
        onClickButtonSubmit:function(e,password,password2){
          console.log(this.password);
          console.log(this.password2);
          if(this.password !== this.password2){
              this.$toast("输入两次密码不一致");
              return false;
          }else{
            console.log('发送axios请求');
            axios.get('接口',{
              params:{
                 userName: this.username
              }
            }).then(function(res){
              var reslutData=res;
              if(reslutData.data.status == 1002){
                  this.$toast(reslutData.data.desc);
              }if(reslutData.data.status == 200){
                  this.$toast(reslutData.data.desc);
                  this.$router.push({path: '/home'})
              }
            }.bind(this))
             .catch(function (error) {
              console.log("请求失败"+error);
              });  
                e.preventDefault();
            }
        }
      }

  };
</script>

<style>

</style>