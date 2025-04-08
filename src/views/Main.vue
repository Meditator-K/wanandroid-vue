<template>
  <div class="tabs">
    <router-link
      to="/"
      class="tab-button"
      :class="{ active: route.name === 'home' }"
      >首页</router-link
    >
    <router-link
      to="/qa"
      class="tab-button"
      :class="{ active: route.name === 'qa' }"
      >问答</router-link
    >
    <router-link
      to="/navi"
      class="tab-button"
      :class="{ active: route.name === 'navi' }"
      >导航</router-link
    >
    <router-link
      to="/project"
      class="tab-button"
      :class="{ active: route.name === 'project' }"
      >项目</router-link
    >
    <router-link
      to="/tool"
      class="tab-button"
      :class="{ active: route.name === 'tool' }"
      >工具</router-link
    >
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped>
.tabs {
  width: 60vw;
  display: flex;
  flex-direction: row;
  padding: 15px 20vw;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  position: fixed;
  justify-content: space-between;
  top: 0;
  left: 0;
}
.tab-button {
  color: #666;
  transition: all 0.3s;
}
.tab-button.active {
  color: #007bff;
}
</style>
 