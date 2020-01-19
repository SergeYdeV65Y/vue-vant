<template>
  <div class="addressedit" id="addressedit">
    <navbar title="地址管理"></navbar>
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
import navbar from "../../components/Navbar";
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
  },
  components: {
    navbar
  }
};
</script>
<style lang="scss">
.addressedit {
  padding: 50px 0 0 0;
  .van-switch {
    background: #e5e5e5;
  }
  .van-switch--on {
    background-color: #1989fa;
  }
}
.van-popup--bottom {
  height: 70%;
}
.van-picker__columns {
  height: 400px !important;
}
</style>
