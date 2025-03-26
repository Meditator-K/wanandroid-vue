<template>
  <div @click="handleClidk" class="article-item">
    <h4 class="title">{{ convertedTitle() }}</h4>
    <div>
      作者：{{ author }}&nbsp;&nbsp;分类：{{ chapterName }}&nbsp;&nbsp;时间：{{
        niceDate
      }}
    </div>
  </div>
</template>

<script>
import he from 'he';
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
      // const tempDiv = document.createElement('div');
      // tempDiv.innerHTML = props.title;
      // return tempDiv.textContent || tempDiv.innerText || '';
      return he.decode(props.title);
    };
    return { handleClidk, convertedTitle };
  },
};
</script>

<style scoped>
.title {
  padding: 0;
  margin: 10px 0 0 0;
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
