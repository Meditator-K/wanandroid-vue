<script setup>
import Main from "./views/Main.vue";
</script>

<template>

  <Main />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>

</template>

<style scoped>

</style>
