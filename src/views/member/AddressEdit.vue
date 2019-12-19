<template>
  <div class="addressedit" id="addressedit">
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      :address-info="addressInfo"
    />
  </div>
</template>
<script>
import areaList from "../../assets/vant/areaList";
import { Toast } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {
        name: "lam",
        tel: "13510740753",
        province: "北京市",
        city: "北京市",
        county: "东城区",
        addressDetail: "万寿路",
        areaCode: "110101",
        postalCode: "110101",
        isDefault: true
      }
      // addressInfo: { isDefault: "" }
    };
  },
  created() {
    // 如果有路由传参，显示编辑页面，否则就显示添加页面
    if (this.$route.params.id) {
      this.getEditId();
    }
  },
  methods: {
    ...mapMutations(["addAddr", "updateAddr", "delAddr"]),
    ...mapActions(["getAddr", "postAddr", "putAddr", "deleteAddr"]),
    getEditId() {
      var temp = this.address.filter(
        item => item.id == this.$route.params.id
      )[0];
      temp.isDefault = temp.isDefault == 1 ? true : false;
      this.addressInfo = temp;
    },
    onSave(content) {
      Toast("save");
      content.address =
        content.province +
        content.city +
        content.county +
        content.addressDetail;
      if (this.$route.params.id) {
        content.id = this.$route.params.id;
        this.updateAddr(content);
        this.putAddr(content);
      } else {
        // 需要先获取最大的 id 再 ++
        content.id =
          parseInt(
            this.address.reduce((prev, item) => {
              return (prev = prev > item.id ? prev : item.id);
            }, 0)
          ) + 1;
        this.addAddr(content);
        this.postAddr(content);
      }
      // this.$router.push("/member/address");
      // 返回源路由
      setTimeout(() => {
        this.$router.go(-1);
      }, 100);
    },
    onDelete(content) {
      Toast("delete");
      this.delAddr(content);
      this.deleteAddr(content);
      setTimeout(() => {
        this.$router.go(-1);
      }, 100);
    }
  },
  computed: {
    ...mapState(["address"])
  }
};
</script>
<style lang="scss" scoped>
.addressedit {
  // .van-popup--bottom {
  //   height: 50% !important;
  // }
  // .van-picker__columns {
  //   height: 350px !important;
  // }
  .van-overflow-hidden {
    overflow: hidden !important;
  }
  .van-popup {
    position: fixed;
    max-height: 100%;
    overflow-y: auto;
    background-color: #fff;
    -webkit-transition: -webkit-transform 0.3s ease-out;
    transition: transform 0.3s ease-out;
    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
    -webkit-overflow-scrolling: touch;
  }
  .van-popup--center {
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
  }
  .van-popup--center.van-popup--round {
    border-radius: 20px;
  }
  .van-popup--top {
    top: 0;
    left: 0;
    width: 100%;
  }
  .van-popup--top.van-popup--round {
    border-radius: 0 0 20px 20px;
  }
  .van-popup--right {
    top: 50%;
    right: 0;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
  }
  .van-popup--right.van-popup--round {
    border-radius: 20px 0 0 20px;
  }
  .van-popup--bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60%;
  }
  .van-popup--bottom.van-popup--round {
    border-radius: 20px 20px 0 0;
  }
  .van-popup--left {
    top: 50%;
    left: 0;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
  }
  .van-popup--left.van-popup--round {
    border-radius: 0 20px 20px 0;
  }
  .van-popup--safe-area-inset-bottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .van-popup-slide-top-enter,
  .van-popup-slide-top-leave-active {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  .van-popup-slide-right-enter,
  .van-popup-slide-right-leave-active {
    -webkit-transform: translate3d(100%, -50%, 0);
    transform: translate3d(100%, -50%, 0);
  }
  .van-popup-slide-bottom-enter,
  .van-popup-slide-bottom-leave-active {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
  .van-popup-slide-left-enter,
  .van-popup-slide-left-leave-active {
    -webkit-transform: translate3d(-100%, -50%, 0);
    transform: translate3d(-100%, -50%, 0);
  }
  .van-popup__close-icon {
    position: absolute;
    z-index: 1;
    color: #969799;
    font-size: 18px;
  }
  .van-popup__close-icon:active {
    opacity: 0.7;
  }
  .van-popup__close-icon--top-left {
    top: 16px;
    left: 16px;
  }
  .van-popup__close-icon--top-right {
    top: 16px;
    right: 16px;
  }
  .van-popup__close-icon--bottom-left {
    bottom: 16px;
    left: 16px;
  }
  .van-popup__close-icon--bottom-right {
    right: 16px;
    bottom: 16px;
  }

  // pick
  .van-picker {
    position: relative;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
    -webkit-text-size-adjust: 100%;
  }
  .van-picker__toolbar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    height: 44px;
    line-height: 44px;
  }
  .van-picker__cancel,
  .van-picker__confirm {
    padding: 0 16px;
    color: #1989fa;
    font-size: 14px;
    background-color: transparent;
    border: 0;
  }
  .van-picker__cancel:active,
  .van-picker__confirm:active {
    background-color: #f2f3f5;
  }
  .van-picker__title {
    max-width: 50%;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
  }
  .van-picker__columns,
  .van-picker__loading {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 350px;
  }
  .van-picker__loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    color: #1989fa;
    background-color: rgba(255, 255, 255, 0.9);
  }
  .van-picker__frame,
  .van-picker__mask {
    position: absolute;
    left: 0;
    width: 100%;
    pointer-events: none;
  }
  .van-picker__frame {
    top: 50%;
    z-index: 3;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .van-picker__mask {
    top: 0;
    z-index: 2;
    height: 100%;
    background-image: -webkit-linear-gradient(
        top,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0.4)
      ),
      -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4));
    background-image: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0.4)
      ),
      linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4));
    background-repeat: no-repeat;
    background-position: top, bottom;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .van-picker-column {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    overflow: hidden;
    font-size: 16px;
    text-align: center;
  }
  .van-picker-column__wrapper {
    -webkit-transition-timing-function: cubic-bezier(0.23, 1, 0.68, 1);
    transition-timing-function: cubic-bezier(0.23, 1, 0.68, 1);
  }
  .van-picker-column__item {
    padding: 0 5px;
    color: #000;
  }
  .van-picker-column__item--disabled {
    opacity: 0.3;
  }
}
</style>
