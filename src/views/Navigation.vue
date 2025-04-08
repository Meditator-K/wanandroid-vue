<template>
  <div class="row-view-container">
    <div class="menu-container">
      <div v-for="(item, index) in dataList" :key="index" class="menu-item">
        <div class="menu-text" @click="scrollToItem(item.cid)">
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
</style>
