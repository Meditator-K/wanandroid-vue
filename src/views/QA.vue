<template>
  <div class="question" v-for="(item, index) in questionList" :key="index">
    <ArticleItem
      @click="openLink(item.link)"
      :title="item.title"
      :author="item.author"
      :chapterName="`${item.superChapterName}/${item.chapterName}`"
      :niceDate="item.niceDate"
    />
    <hr v-if="index < questionList.length - 1" width="100%" />
  </div>
  <div class="loading-indicator" v-if="loading">加载中...</div>
</template>

<script>
import { getQAList } from "../utils/api";
import ArticleItem from "../components/ArticleItem.vue";
export default {
  name: "QAPage",
  components: {
    ArticleItem,
  },
  data() {
    return {
      pageNo: 1,
      questionList: [],
      loading: false,
    };
  },
  mounted() {
    this.getQuestionList();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= documentHeight - 100 && !this.loading) {
        this.pageNo++;
        this.loading = true;
        setTimeout(() => {
          this.getQuestionList();
        }, 500); // 延迟1秒加载更多数据，可根据实际情况调整延迟时间
      }
    },
    getQuestionList() {
      getQAList(this.pageNo)
        .then((data) => {
          console.log("问答列表：", data.data.datas);
          this.questionList = this.questionList.concat(data.data.datas);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    openLink(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
.question {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.loading-indicator {
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
</style>
