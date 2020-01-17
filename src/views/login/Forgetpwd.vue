<template>
  <div class="login" >
    <v-touch v-on:swiperight="onSwipeRight"  tag="div">  
       <div class="state">
         <span>国家地区</span>
         <span>+86</span>
       </div>
          <van-field
            v-model="username"
            rule="phone"
            type="username"
            clearable
            placeholder="请输入手机号"
            @blur-right-icon="$toast('用户名必须是手机号')"
          />
          <van-field
            v-model="password"
            type="password"
            placeholder="请输入验证码"
          >
          <van-button slot="button" size="small" type="primary" v-if="iSdate" @click="handdate">{{msg}}</van-button>
          <van-count-down :time="time" slot="button" v-else>
            <template v-slot="timeData">
              <span class="item">{{ timeData.seconds }}S</span>
            </template>
          </van-count-down>
          </van-field>
        <!-- </van-cell-group> -->
    <div class="forget">
    </div>
    <div class="btn" v-if="disabled"><van-button type="primary"  size="large" @click="onClickButtonSubmit" >同意协议重置密码</van-button></div>
    <div class="btn" v-else><van-button type="primary"  disabled size="large" @click="onClickButtonSubmit" >同意协议重置密码</van-button></div>
    <!-- <div class="pawlogin">
    </div> -->
     <van-checkbox v-model="disabled" checked-color="#07c160">已阅读并同意以下协议</van-checkbox> 
    </v-touch>
  </div>
</template>

<script>
  export default {
      data(){
        return{
          disabled:false,
          iSdate:true,
          msg:'发送验证码',
          time:  3 * 1000,
          checked:'',
          message:'',
          username:'',
          password:'',
          phone:'',
          rules:{
            'phone': {regExp: /^(1\d{10})$/, required: true},
          }
        }
      },
      wacth:{
        // handdate()
      },
      methods:{
        blurPrice(){
          console.log(1);
          
        },
        handdate(){
          this.iSdate=!this.iSdate
          setTimeout(()=>{
            this.iSdate=!this.iSdate
          },2000)
        },
        onClickButtonSubmit:function(e,username,password){
          // console.log(this.username);
          // console.log(this.password);
          if(this.username == ''){
              this.$toast("手机号码不能为空");
              return false;
          }if(this.password == ''){
            this.$toast("验证码不能为空");
            return false;
          }else{
            this.$router.push({path: '/pawreset'})
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
        },
          onSwipeRight(){
            //  console.log("右滑") 
            this.$router.go(-1);
          }
      }
  };
</script>

<style lang="scss" scoped>
.login{
    padding-top: 159px;
     background-color: #fff;
  .state{
    display: flex;
    justify-content:space-between;
    padding: 30px  30px 30px;
  }
  .van-field__right-icon .van-icon {
  font-size: 27px;
  }
  .van-cell{
    padding: 10px 32px;
  .van-field__label{
    width: 40px;
  }
  }
  .btn{
    margin: 0 auto;
     width: 90%;
  }
  .btn>button{
    height: 50px;
    line-height: 50px;
    border-radius: 25px;
  }
  .pawlogin{
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
  }
  .forget{
    float: right;
    padding: 10px 24px 24px;
  }
  .Otherlogin{
    display: flex;
    justify-content:space-around ;
    font-size: 50px;
  }
.van-checkbox{
  padding: 10px;
}
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
</style>