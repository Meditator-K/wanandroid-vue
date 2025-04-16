<template>
  <div class="tabs" :class="{ scrolled: isScrolled }">
    <img :src="logoUrl" class="logo" />
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
    <div class="search-container">
      <input
        type="text"
        class="search-input"
        placeholder="请输入关键字..."
        v-model="searchText"
        @keyup.enter="handleSearch"
      />
      <button class="search-button" @click="handleSearch">搜索</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";
import { getAssetUrl } from "../utils/assetUtils";
const route = useRoute();
const router = useRouter();
const isScrolled = ref(false);
const searchText = ref("");

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const handleSearch = () => {
  if (searchText.value.trim()) {
    router.push({
      path: "/search",
      query: { keyword: searchText.value.trim() },
    });
  }
};

const logoUrl = getAssetUrl("logo.png");

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.tabs {
  width: 100vw;
  display: flex;
  flex-direction: row;
  /* padding: 15px 20vw; */
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  position: fixed;
  align-items: center;
  /* justify-content: space-between; */
  top: 0;
  left: 0;
  transition: background-color 0.3s ease;
}
.tabs.scrolled {
  background-color: #68abf3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.logo {
  width: 80px;
  height: 40px;
  padding: 10px 50px 10px 20%;
  object-fit: contain;
}
.tab-button {
  color: #666;
  transition: all 0.3s;
  margin: 0 80px 0 0;
}
.tab-button.active {
  color: #464fce;
}
.tabs.scrolled .tab-button {
  color: #fff;
}
.tabs.scrolled .tab-button.active {
  color: #3317d3;
}
.search-container {
  display: flex;
  align-items: center;
  margin-left: 50px;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}
.search-button {
  padding: 6px 12px;
  background-color: #68abf3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
  transition: background-color 0.3s;
}
.search-button:hover {
  background-color: #5a9be5;
}
.tabs.scrolled .search-button {
  background-color: #2b4de2;
}
</style>
