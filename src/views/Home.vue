<template>
  <div class="swiper-container">
    <div class="swiper-bg">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="50"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :loop="true"
      >
        <swiper-slide v-for="(slide, index) in banners" :key="index">
          <img
            :src="slide.imagePath"
            alt="Slide"
            class="swiper-image"
            @click="openLink(slide.url)"
          />
        </swiper-slide>

        <div class="swiper-pagination"></div>
      </swiper>
    </div>
    <div class="swiper-back"></div>
  </div>
  <div class="article-list" v-for="(item, index) in homeList" :key="index">
    <ArticleItem
      @click="openLink(item.link)"
      :title="item.title"
      :author="item.author"
      :chapterName="`${item.superChapterName}/${item.chapterName}`"
      :niceDate="item.niceDate"
    ></ArticleItem>
    <hr v-if="index < homeList.length - 1" width="100%" />
  </div>
</template>

<script>
import { getBanner, getHomeList } from "../utils/api";
import ArticleItem from "../components/ArticleItem.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { Autoplay, Pagination } from "swiper/modules";
export default {
  name: "HomePage",
  components: {
    ArticleItem,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Pagination, Autoplay],
      index: 0,
      homeList: [],
      banners: [],
    };
  },
  mounted() {
    this.loadData();
    window.addEventListener("scroll", this.handleScroll);
  },
  activated() {
    this.loadData();
  },
  methods: {
    loadData() {
      getBanner().then((data) => {
        console.log("banner列表：", data.data);
        this.banners = data.data;
      });
      getHomeList(this.index).then((data) => {
        console.log("首页列表：", data.data.datas);
        this.homeList = data.data.datas;
      });
    },
    handleScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= documentHeight) {
        this.index++;
        getHomeList(this.index).then((data) => {
          console.log("首页列表：", data.data.datas);
          this.homeList = this.homeList.concat(data.data.datas);
        });
      }
    },
    openLink(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 400px;
  position: relative;
}
.swiper-image {
  width: 100%;
  height: 400px;
  object-fit: fill;
}
.swiper-pagination {
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.swiper-bg {
  width: 100%;
  height: 400px;
  position: absolute;
  z-index: 1;
}
.swiper-back {
  width: 100%;
  height: 30px;
  background-color: grey;
  opacity: 0.5;
  z-index: 2;
  position: absolute;
  bottom: 0;
}
.article-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
img:hover {
  cursor: pointer;
}
</style>
