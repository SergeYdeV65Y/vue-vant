<template>
<div>
<!-- <slide-verify :l="42"
            :r="10"
            :w="310"
            :h="155"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
            :slider-text="text"
            ></slide-verify>
<div>{{msg}}</div> -->
    测试
    <div class="rems">
        <div>dsadsa</div>
        <span>21321</span>
    </div>
</div>
</template>

<script>
  export default {
  name: 'App',
          data(){
        return {
            msg: '',
            text: '向右滑',
        }
    },
    create(){
        this.remfn()
    },
       methods: {
        onSuccess(){
            this.msg = 'login success'
        },
        onFail(){
            this.msg = ''
        },
        onRefresh(){
            this.msg = ''
        },
    }
  };
</script>
<style lang="scss" scoped>
.rems{
    div{
        // display: inline-block;
        color: red;
        font-size: 14px;
        height: 20rem;
        width: 20rem;
        background-color: turquoise;
        margin:  20px auto;
    }
    span{
        color: paleturquoise;
    }
}
</style>