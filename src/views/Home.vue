<template>
  <div class="swiper-container">
    <!-- <div class="swiper-bg"> -->
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
    <!-- </div> -->
    <!-- <div class="swiper-back"></div> -->
  </div>
  <div class="article-list" v-for="(item, index) in homeList" :key="index">
    <ArticleItem
      @click="openLink(item.link)"
      :title="item.title"
      :author="item.author || item.shareUser"
      :chapterName="`${item.superChapterName}/${item.chapterName}`"
      :niceDate="item.niceDate"
    ></ArticleItem>
    <hr v-if="index < homeList.length - 1" width="100%" />
  </div>
  <div class="loading-indicator" v-if="loading">
    加载中...
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
      loading: false,
    };
  },
  mounted() {
    this.loadData();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    loadData() {
      this.getBannerList();
      this.getArticleList();
    },
    getBannerList() {
      getBanner().then((data) => {
        console.log("banner列表: ", data.data);
        this.banners = data.data;
      });
    },
    getArticleList() {
      getHomeList(this.index)
        .then((data) => {
          console.log("首页列表：", data.data.datas);
          this.homeList = this.homeList.concat(data.data.datas);
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
          this.getArticleList();
        }, 500); // 延迟1秒加载更多数据，可根据实际情况调整延迟时间
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
  width: 60vw;
  height: 400px;
  position: relative;
  margin-top: 50px;
  margin-left: 14px;
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
  margin-left: 14px;
}
img:hover {
  cursor: pointer;
}
.loading-indicator {
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

</style>
