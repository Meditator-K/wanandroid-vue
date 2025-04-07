<template>
  <div class="wrap-container">
    <ToolItem v-for="(item, index) in toolList" :key="index" :item="item" />
  </div>
</template>

<script>
import { getToolList } from "../utils/api";
import ToolItem from "../components/ToolItem.vue";
export default {
  name: "ComponentName",
  components: { ToolItem },
  mounted() {
    this.getTools();
  },
  data() {
    return {
      toolList: [],
    };
  },
  methods: {
    getTools() {
      getToolList().then((res) => {
        console.log("工具列表：", res.data);
        this.toolList = res.data;
      });
    },
  },
};
</script>

<style scoped>
.wrap-container {
  width: 60vw;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  gap: 15px;
  margin-top: 50px;
  margin-left: 14px;
  align-items: stretch;
}
</style>
