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
  </div>
  
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped>
.tabs {
  width: 100%;
  display: flex;
  padding: 10px 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  position: sticky;
  top: 0;
  margin-bottom: 10px;
}
.tab-button {
  padding: 10px 25px;
  border-radius: 4px;
  text-decoration: none;
  color: #666;
  transition: all 0.3s;
}
.tab-button.active {
  color: #007bff;
}
.view-container {
  position: relative;
  min-height: calc(100vh-60px);
}
</style>
