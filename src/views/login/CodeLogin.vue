<template>
  <div class="login">
     <myheader titleName='验证码登录'></myheader>
    <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight"  tag="div">  
    <div class="userhead">
      <img src="/img/index/微信图片_20191212201923.jpg" alt="" v-if="userimg==1">
      <van-icon name="user-o" v-else/>
    </div>
          <van-field
            v-model="phone"
            type="phone"
            label="+86"
            clearable
            placeholder="请输入手机号"
            @blur-right-icon="$toast('用户名必须是手机号')"
          />
          <van-field
            v-model="code"
            type="password"
            placeholder="请输入验证码"
          >
          <van-button slot="button" size="small" type="primary" v-if="iSdate" @click="handdate">{{msg}}</van-button>
          <van-count-down :time="time" slot="button" v-else>
            <template v-slot="timeData">
              <span class="item">在{{ timeData.seconds }}秒后重发</span>
            </template>
          </van-count-down>
          </van-field>
    <div class="forget">
    </div>
    <div class="btn"><van-button type="info" size="large" @click="onClickButtonSubmit">登录</van-button></div>
    <div class="pawlogin">
      <div class="userpow"><router-link to="/login">用户密码登录</router-link> </div>
    </div>
    <van-divider :style="{ color: '#444446', borderColor: '#bbbcbc', padding: '0 16px' }">
        第三方快速登录
    </van-divider>
    <div class="Otherlogin">
      <div class="Other1"><i class="iconfont icon-icon-qq"></i></div>
      <div class="Other2"><i class="iconfont icon-icon-wechat"></i></div>
      <div class="Other3"><i class="iconfont icon-icon-weibo"></i></div>
    </div>
    </v-touch>
  </div>
</template>
<script>
import myheader from "../../components/Myheader";
import { Toast } from "vant";
  export default {
    components:{  
      myheader
    },
      data(){
        return{
          iSdate:true,
          msg:'获取验证码',
          time: 60 * 1000,
          userimg:'1',
          message:'',
          username:'',
          password:'',
          phone:'',
          code:'',
          coder:''
        }
      },
      wacth:{
      },
      methods:{
        blurPrice(){
          console.log(1);
          
        },
        handdate(){ //获取短信验证
          let params ={
             phone : this.phone
          }
          this.$minApi.short(params).then(res=>{ 
              this.coder=res.data
              console.log(res);
          })
          
          this.iSdate=!this.iSdate
          setTimeout(()=>{
            this.iSdate=!this.iSdate

          },60000)
          if(this.time==0){
          console.log(1);
          
          }else{
          }
        },
        onClickButtonSubmit(e,phone,code){ //提交用户信息
            var reg=/^1[3456789]\d{9}$/;
          if(this.phone == ''){
              this.$toast("手机号码不能为空");
              return false;
          }
            if(!reg.test(this.phone)){
            this.$toast("请输入有效的手机号码");
              return false;
          }
           if(this.code!==this.coder){
            this.$toast("验证码错误");
              return false;
          }
          else{
            let params ={
             phone:this.phone,
          }
          console.log('提交信息注册');
            this.$minApi.register(params).then(res=>{ 
              // console.log(res.uid);
              let msg = res.msg
             if(res.code==-2){ //判断用户是否注册
                this.$toast(msg);
              return false;
             }else{
               Toast.loading({
                 message:msg,
                 forbidClick: true,
                 loadingType: 'spinner',
                 duration: 300, // 持续展示 toast
                 });
                 localStorage.setItem('token', res.uid)
                 setTimeout(()=>{
                   this.$router.push({path: `/home`}) 
                 },300)
             }
            })
            }
        },
            // 左右滑动返回上一层
          onSwipeLeft(){
            // console.log('左划');
            this.$router.go(+1);
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
      background-color: #fff;
   padding-top: 53px;
  .userhead{
    background-color: #0092db;
    border-radius: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    margin: 67px auto;
    font-size: 54px;
    color: aliceblue;
    img{
      border-radius: 50px;
      width: 100%;
    }
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
  .Otherlogin>div{
     height: 56px;
      width: 56px;
      border-radius: 39px;
      text-align: center;
      line-height: 46px;
      i{
         font-size: 36px;
      }
  }
  .Other1{
    color: #fdfeff;
    background-color: #0092db;
  }
  .Other2{
    background-color: #98d055;
    color: #fdfeff;
  }
  .Other3{
    color: #fdfeff;
    background-color: #e84546;
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