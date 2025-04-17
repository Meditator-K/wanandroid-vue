<template>
  <div @click="handleClidk" class="article-item">
    <div class="title" v-html="convertedTitle()"></div>
    <span>
      作者：{{ author }}&nbsp;&nbsp;分类：{{ chapterName }}&nbsp;&nbsp;时间：{{
        niceDate
      }}
    </span>
  </div>
</template>

<script>
import he from "he";
import DOMPurify from "dompurify";
export default {
  props: {
    title: String,
    author: String,
    chapterName: String,
    niceDate: String,
  },
  emits: ["click"],
  setup(props, { emit }) {
    const handleClidk = () => {
      emit("click");
    };
    const convertedTitle = () => {
      const decode = he.decode(props.title);
      return DOMPurify.sanitize(decode, {
        ALLOWED_TAGS: ["em"],
        ALLOWED_ATTR: ["class"],
      });
    };
    return { handleClidk, convertedTitle };
  },
};
</script>

<style scoped>
.title {
  font-size: 16px;
  font-weight: 600;
  text-align: start;
}
.article-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
div:hover {
  color: rgb(79, 79, 231);
  text-decoration: underline;
  cursor: pointer;
}

</style>
<style>
em.highlight {
  color: #da5111;
  font-style: normal;
  padding: 0 2px;
  border-radius: 2px;
}
</style>