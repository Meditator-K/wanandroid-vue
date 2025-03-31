<template>
  <div class="project-container">
    <div class="left-container">
      <div v-for="(item, index) in projectTree" :key="index" class="name-item">
        <div class="name-text">
          {{ item.name }}
        </div>
        <hr v-if="index < projectTree.length - 1" class="line" />
      </div>
    </div>
    <div class="right-container">
      <AllProjectItem
        v-for="(item, index) in projectList"
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import AllProjectItem from "../components/AllProjectItem.vue";
import { getProjectTree, getProjectList } from "../utils/api.js";
export default {
  components: {
    AllProjectItem,
  },
  data() {
    return {
      projectTree: [],
      index: 0,
      projectList: [],
      loading: false,
      cid: 0,
    };
  },
  created() {
    this.cid = this.$route.params.id;
  },
  mounted() {
    this.getProjectTree();
    this.getProjList();
  },
  methods: {
    getProjectTree() {
      getProjectTree().then((res) => {
        console.log("项目目录", res.data);
        this.projectTree = res.data;
      });
    },
    getProjList() {
      getProjectList(this.index, this.cid)
        .then((res) => {
          console.log("项目列表：", res.data.datas);
          this.projectList = this.projectList.concat(res.data.datas);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
.project-container {
  width: 60vw;
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 50px;
  margin-left: 14px;
}
.left-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #ccc;
}
.name-item {
  display: flex;
  flex-direction: column;
}
.name-text {
  font-size: 14px;
  color: black;
  padding: 5px;
  text-align: center;
}
.name-text:hover {
  color: rgb(79, 79, 231);
  cursor: pointer;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  border: none;
  margin: 0;
}
.right-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
