<template>
  <div class="home">
    <Header inputName="树林小站"></Header>
    <!--轮播图-->
    <mt-swipe :auto="4000" style="height: 160px;">
      <mt-swipe-item v-for="(item, index) in news" :key="index">
        <img
          class="swipe-img"
          :src="item.swipeImageUrl"
          :alt="item.title"
          style="max-width: 100%;height: 100%;"
          @click="goToDetial(item.newsId, 1)"
        />
      </mt-swipe-item>
    </mt-swipe>
    <!--选项卡-->
    <div class="tabbar">
      <div class="tabbar-item" @click="goToMoreArticle('essay')">
        <img src="../assets/img/index-bar04.png" alt="" />
        <div class="title c33 fz12 mt10 tc">日志文章</div>
      </div>
      <div class="tabbar-item" @click="goToMoreArticle('news')">
        <img src="../assets/img/index-bar05.png" alt="" />
        <div class="title c33 fz12 mt10 tc">热点新闻</div>
      </div>
      <div class="tabbar-item">
        <img src="../assets/img/index-bar02.png" alt="" />
        <div class="title c33 fz12 mt10 tc">精品工具</div>
      </div>
    </div>
    <!--日志文章-->
    <div class="essay">
      <div class="title fwb fz18 lh18 clearfix">
        日志文章
        <span class="fz18 fwn c66 fr dib" @click="goToMoreArticle('essay')">
          <i class="iconfont fz18 icon-icon-test15"></i>
        </span>
      </div>
      <div
        class="essay-item mt10 ml10"
        @click="goToDetial(item.articleId, 0)"
        v-for="(item, index) in essay"
        :key="index"
      >
        <div class="item-title fz18 mt20 mt10">{{ item.title }}</div>
        <div class="item-info fz14">
          <i class="iconfont icon-shijian fz12"></i>
          <span class="time fz12 c66 ml7">{{ item.createTime }}</span>
          <i class="iconfont icon-denglu fz12 ml20"></i>
          <span class="time fz12 c66 ml7">{{ item.author }}</span>
          <i class="iconfont icon-zhuanyehuwai fz12 ml20"></i>
          <span class="time fz12 c66 ml7">{{ item.view }}</span>
        </div>
      </div>
    </div>
    <!--热点新闻-->
    <div class="article">
      <div class="title fwb fz18 lh18">
        热点新闻<span
          class="fz18 fwn c66 fr dib"
          @click="goToMoreArticle('news')"
        >
          <i class="iconfont fz18 icon-icon-test15"></i>
        </span>
      </div>
      <div class="box">
        <div
          class="article-item mt10"
          v-for="(item, index) in news"
          :key="index"
          @click="goToDetial(item.newsId, 1)"
        >
          <img :src="item.headImageUrl" alt="" />
          <div class="info">
            <div class="info-title fz14">
              {{ item.title }}
            </div>
            <div>
              <i class="iconfont icon-shijian fz12"></i>
              <span class="time fz12 c66 ml7">{{ item.createTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";
export default {
  name: "home",
  components: {
    Header
  },
  data() {
    return {
      essay: [],
      news: []
    };
  },
  methods: {
    // 获取日志列表
    getEssay() {
      this.$axios.get("/article/getList", { page: 1, size: 5 }).then(res => {
        // console.log(res);
        this.essay = res.data;
      });
    },
    // 获取新闻列表
    getNews() {
      this.$axios.get("/news/getList", { page: 1, size: 5 }).then(res => {
        console.log(res);
        this.news = res.data;
      });
    },
    // 获取文章详情
    goToDetial(id, type) {
      if (type == 0) {
        this.$router.push(`/article?id=${id}&type=essay`);
      } else if (type == 1) {
        this.$router.push(`/article?id=${id}&type=news`);
      }
    },
    // 前往文章列表
    goToMoreArticle(type) {
      this.$router.push(`/articlelist?type=${type}`);
    }
  },
  created() {
    this.getEssay();
    this.getNews();
  }
};
</script>
<style scoped lang="less">
.tabbar {
  width: 100%;
  padding: 20px 35px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  justify-content: space-between;
  .tabbar-item {
    img {
      width: 60px;
      height: 60px;
      display: block;
      border-radius: 50%;
    }
    .title {
      width: 60px;
    }
  }
}
.article {
  padding: 15px;
  background: #fff;
  margin-top: 10px;
  .title {
    border-left: 4px solid #fd4644;
    padding-left: 8px;
  }
  .box {
    .article-item {
      display: flex;
      justify-content: space-between;
      img {
        width: 100px;
        height: 75px;
        display: block;
      }
      .info {
        width: 234px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
}
.essay {
  padding: 0 15px;
  background: #fff;
  .title {
    border-left: 4px solid #fd4644;
    padding-left: 8px;
  }
  .essay-item {
  }
}
</style>
<style>
  .mint-swipe-items-wrap {
    text-align: center;
    vertical-align: middle;
    background: #000;
  }
</style>
