<template>
  <div class="view-container">
    <div
      class="list-container"
      v-for="(item, index) in searchList"
      :key="index"
    >
      <ArticleItem
        @click="openLink(item.link)"
        :title="item.title"
        :author="item.author"
        :chapterName="`${item.superChapterName}/${item.chapterName}`"
        :niceDate="item.niceDate"
      />
      <hr v-if="index < searchList.length - 1" width="100%" />
    </div>
    <div class="loading-indicator" v-if="loading">加载中...</div>
  </div>
</template>

<script>
import { search } from "../utils/api";
import ArticleItem from "../components/ArticleItem.vue";
export default {
  name: "Search",
  components: {
    ArticleItem,
  },
  data() {
    return {
      pageNo: 0,
      keyword: "",
      searchList: [],
      loading: false,
    };
  },
  created() {
    this.keyword = this.$route.query.keyword || "";
    console.log(this.keyword);
    this.doSearch();
  },
  watch: {
    '$route.query.keyword': {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.keyword = newVal;
          this.searchList = [];
          this.pageNo = 0;
          this.doSearch();
        }
      }, 
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    doSearch() {
      search(this.pageNo, this.keyword)
        .then((res) => {
          console.log("搜索结果", res.data.datas);
          this.searchList = this.searchList.concat(res.data.datas);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= documentHeight - 100 && !this.loading) {
        this.pageNo++;
        this.loading = true;
        setTimeout(() => {
          this.doSearch();
        }, 500); // 延迟1秒加载更多数据，可根据实际情况调整延迟时间
      }
    },
    openLink(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped></style>
