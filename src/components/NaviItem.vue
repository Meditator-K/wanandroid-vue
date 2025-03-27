<template>
  <div class="conatiner">
    <div class="title-style">{{ naviData.name }}</div>
    <div class="wrap-container">
      <div
        class="wrap-item"
        v-for="item in naviData.articles"
        :key="item.id"
        @click="openLink(item.link)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    naviData: {},
  },
  expose: ["naviData"],
  methods: {
    openLink(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
.conatiner {
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #ccc;
}
.title-style {
  font-size: 22px;
  color: rgb(48, 201, 99);
  font-weight: 500;
}
.wrap-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  gap: 12px 50px;
}
.wrap-item {
  font-size: 15px;
  color: rgb(72, 72, 219);
}
.wrap-item:hover {
  color: rgb(79, 79, 231);
  text-decoration: underline;
  cursor: pointer;
}
</style>
