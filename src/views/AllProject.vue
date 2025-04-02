<template>
  <div class="project-container">
    <div class="left-container">
      <div v-for="(item, index) in projectTree" :key="index" class="name-item">
        <div
          class="name-text"
          :class="{ 'active-text': cid == item.id }"
          @click="onMenuClick(item.id)"
        >
          {{ formatTitle(item.name) }}
        </div>
        <hr v-if="index < projectTree.length - 1" class="line" />
      </div>
    </div>
    <div class="right-container">
      <div class="wrap-container">
        <AllProjectItem
          v-for="(item, index) in projectList"
          :key="index"
          :item="item"
        />
      </div>
      <div class="pagination-container">
        <el-pagination
          v-if="total > 0"
          :current-page="index"
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AllProjectItem from "../components/AllProjectItem.vue";
import { getProjectTree, getProjectList } from "../utils/api.js";
import he from "he";
export default {
  components: {
    AllProjectItem,
  },
  data() {
    return {
      projectTree: [],
      index: 1,
      total: 0,
      pageSize: 8,
      projectList: [],
      cid: 0,
    };
  },
  created() {
    console.log("路由参数", this.$route.params.id); // 打印路由参数以进行调试
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
      getProjectList(this.index, this.cid, this.pageSize).then((res) => {
        console.log("项目列表：", res.data.datas);
        this.projectList = res.data.datas;
        this.total = res.data.total;
      });
    },
    onMenuClick(id) {
      if (this.cid === id) {
        return;
      }
      this.index = 1;
      this.cid = id;
      this.getProjList();
    },
    formatTitle(title) {
      return he.decode(title);
    },
    handlePageChange(page) {
      console.log("当前页码：", page);
      this.index = page;
      this.getProjList();
    },
  },
};
</script>

<style scoped>
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
  transition: color 0.3s;
}
.name-text:hover,
.name-text.active-text {
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
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.wrap-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
}
.pagination-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding-bottom: 20px;
}
:deep(.el-pagination) {
  padding: 0;
}
</style>
