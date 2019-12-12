<template>
  <div class="AddressEdit">
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
      @change-detail="onChangeDetail"
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
      },
      // addressInfo: { isDefault: "" },
      list: ""
    };
  },
  created() {
    this.list =
      JSON.parse(localStorage.getItem("address")) ||
      JSON.parse(sessionStorage.getItem("address")) ||
      this.address;
    // 如果有路由传参，显示编辑页面，否则就显示添加页面
    if (this.$route.params.id) {
      this.getEditId();
    }
    this.addressInfo.isDefault = true;
    console.log(this.address[0].id);
  },
  methods: {
    ...mapMutations(["addAddr", "updateAddr"]),
    ...mapActions(["postAddr"]),
    getEditId() {
      var o = this.list.filter(item => {
        return item.id == this.$route.params.id;
      });
      this.addressInfo = o[0];
    },
    onSave(content) {
      Toast("save");
      content.address =
        content.province +
        content.city +
        content.county +
        content.addressDetail;
      // 需要先获取最大的id再 ++ bug?
      if (this.$route.params.id) {
        content.id = this.$route.params.id;
        this.updateAddr(content);
      } else {
        // content.id =
        //   this.address.reduce((prev, item) => {
        //     return (prev = prev > item.id ? prev : item.id);
        //   }, 0) + 1;
        this.addAddr(content);
        this.postAddr(content);
      }
      // this.$router.push("/member/address");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  },
  computed: {
    ...mapState(["address"])
  }
};
</script>
<style scoped lang="scss"></style>
