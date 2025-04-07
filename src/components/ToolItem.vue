<template>
  <div class="item-container" @click="openUrl(item.link)">
    <img :src="getIconUrl(item.icon)" class="img-container" />
    <div class="right-container">
      <div class="title">{{ item.name }}</div>
      <div class="desc">{{ item.desc }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolItem",
  props: {
    item: {},
  },
  data() {
    return {};
  },
  methods: {
    getIconUrl(icon) {
      return new URL(`../assets/${icon}`, import.meta.url).href;
    },
    openUrl(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
.item-container {
  display: flex;
  flex-direction: row;
  padding: 12px;
  gap: 10px;
  align-items: center;
  justify-content: start;
  background: #f5f4f4a4;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}
.item-container:hover {
  border-color:rgb(54, 54, 235);
  cursor: pointer;
}
.img-container {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
.right-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.title {
  font-size: 15px;
  color: rgb(102, 102, 241);
}
.desc {
  font-size: 13px;
  color: #666;
  text-align: start;
}
</style>
