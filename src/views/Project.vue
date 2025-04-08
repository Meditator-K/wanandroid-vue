<template>
  <div class="view-container">
    <div
      v-for="(item, index) in projectList"
      :key="index"
      class="list-container"
    >
      <ProjectItem :projItem="item" />
      <hr v-if="index < projectList.length - 1" class="line" />
    </div>
    <div v-if="loading" class="loading-indicator">加载中...</div>
  </div>
</template>

<script>
import { getProjectList } from "../utils/api";
import ProjectItem from "../components/ProjectItem.vue";
export default {
  components: {
    ProjectItem,
  },
  data() {
    return {
      index: 0,
      projectList: [],
      loading: false,
    };
  },
  mounted() {
    this.getProjList();
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    getProjList() {
      getProjectList(this.index)
        .then((res) => {
          console.log("项目列表：", res.data.datas);
          this.projectList = this.projectList.concat(res.data.datas);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= documentHeight - 100 && !this.loading) {
        this.index++;
        this.loading = true;
        setTimeout(() => {
          this.getProjList();
        }, 500); // 模拟加载延迟，实际应用中可以根据需要调整延迟时间
      }
    },
  },
};
</script>

<style scoped></style>
