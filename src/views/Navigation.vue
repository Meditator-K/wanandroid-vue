<template>
  <div class="row-container">
    <div class="left-container">
      <div v-for="(item, index) in dataList" :key="index" class="name-item">
        <div class="name-text" @click="scrollToItem(item.cid)">
          {{ item.name }}
        </div>
        <hr v-if="index < dataList.length - 1" class="line" />
      </div>
    </div>
    <div class="navi-container">
      <NaviItem
        v-for="item in dataList"
        :key="item.cid"
        :naviData="item"
        :ref="setItemRef"
      />
    </div>
  </div>
</template>

<script>
import NaviItem from "../components/NaviItem.vue";
import { getNavi } from "../utils/api";
export default {
  components: {
    NaviItem,
  },
  data() {
    return {
      dataList: [],
      itemRefs: {},
    };
  },
  mounted() {
    this.getNaviData();
  },
  methods: {
    getNaviData() {
      getNavi().then((res) => {
        console.log("导航数据：", res.data);
        this.dataList = res.data;
      });
    },
    setItemRef(el) {
      if (el) {
        this.itemRefs[`navi-${el.naviData.cid}`] = el.$el;
      }
    },
    scrollToItem(cid) {
      const target = this.itemRefs[`navi-${cid}`];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  },
};
</script>

<style scoped>
.row-container {
  width: 60vw;
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 50px;
  margin-left: 14px;
}
.left-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* overflow: auto; */
  border: 1px solid #ccc;
}
/* .left-container::-webkit-scrollbar {
  display: none;
} */
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
.navi-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.navi-container::-webkit-scrollbar {
  display: none;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  border: none;
  margin: 0;
}
</style>
