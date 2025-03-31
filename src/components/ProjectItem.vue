<template>
  <div class="item-container">
    <div class="left-container">
      <div class="title" @click="openLink(projItem.link)">
        {{ projItem.title }}
      </div>
      <div class="desc">{{ projItem.desc }}</div>
      <div class="bottom-container">
        <div>{{ projItem.niceDate }}</div>
        <div>{{ projItem.author }}</div>
        <div class="bottom-text" @click="showProjectList(294)">
          查看同类项目
        </div>
      </div>
    </div>
    <img :src="projItem.envelopePic" class="img-container" />
  </div>
</template>

<script>
export default {
  props: {
    projItem: {},
  },
  methods: {
    openLink(url) {
      window.open(url, "_blank");
    },
    showProjectList(id) {
      this.$router.push({ name: "allProject", params: { id } });
    },
  },
};
</script>

<style scoped>
.item-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.left-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.title {
  font-size: 16px;
  font-weight: 600;
  color: black;
  text-align: start;
}
.title:hover {
  color: rgb(79, 79, 231);
  text-decoration: underline;
  cursor: pointer;
}
.desc {
  font-size: 14px;
  color: gray;
  text-align: start;
}
.bottom-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 13px;
  color: rgb(179, 178, 178);
}
.bottom-text {
  font-size: 14px;
  color: gray;
}
.bottom-text:hover {
  color: rgb(79, 79, 231);
  text-decoration: underline;
  cursor: pointer; 
}
.img-container {
  width: 200px;
  height: 80px;
  object-fit: cover;
}
</style>
