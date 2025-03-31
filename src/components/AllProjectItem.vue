<template>
  <div class="item-container">
    <img :src="item.envelopePic" class="img-box" />
    <div class="right-container">
      <div class="title" @click="openLink(item.link)">{{ item.title }}</div>
      <div class="desc">{{ item.desc }}</div>
      <div class="bottom">
        <div class="desc">{{ item.niceDate }}</div>
        <div class="desc">{{ item.author }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {},
  },

  methods: {
    openLink(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
.item-container {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.img-box {
  width: 120px;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
}
.right-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
}
.title {
  font-size: 16px;
  font-weight: 600;
  color: black;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.title:hover {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}
.desc {
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: start;
}
.bottom {
  width: 100%;
  margin-top: auto;
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
