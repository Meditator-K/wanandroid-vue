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
    };
  },
  mounted() {
    this.getQuestionList();
  },
  activated() {
    this.getQuestionList();
  },
  methods: {
    getQuestionList() {
      getQAList(this.pageNo).then((data) => {
        console.log("问答列表：", data.data.datas);
        this.questionList = data.data.datas;
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
</style>
