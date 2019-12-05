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
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {
        id: 1,
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
    };
  },
  methods: {
    onSave(content) {
      Toast("save");
      console.log(content);
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
  }
};
</script>
<style scoped lang="scss"></style>
