<template>
  <div></div>
</template>

<script>
import { search } from "../utils/api";
export default {
  name: "Search",
  data() {
    return {
      index: 0,
      keyword: "",
      searchList: [],
    };
  },
  created() {
    this.keyword = this.$route.query.keyword || "";
    console.log(this.keyword);
    this.doSearch();
  },

  methods: {
    doSearch() {
      search(this.index, this.keyword).then((res) => {
        console.log("搜索结果", res.data.datas);
        this.searchList = res.data.datas;
      });
    },
  },
};
</script>

<style scoped></style>
