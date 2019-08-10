<template>
  <div>
    <Header
      :inputName="$route.query.type == 'essay' ? '日志列表' : '新闻列表'"
    ></Header>
    <!--日志文章-->
    <div
      class="essay"
      :id="$route.query.type == 'essay' ? 'list' : ''"
      v-if="$route.query.type == 'essay'"
      @scroll="handleScroll()"
    >
      <div
        class="essay-item mt30 mb30 ml10"
        @click="goToDetial(item.articleId, 0)"
        v-for="(item, index) in list"
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
    <!--新闻列表-->
    <div
      class="article"
      :id="$route.query.type == 'news' ? 'list' : ''"
      v-else
      @scroll="handleScroll()"
    >
      <div class="box">
        <div
          class="article-item mt10"
          v-for="(item, index) in list"
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
import Header from "../components/Header";
export default {
  name: "ArticleList",
  components: {
    Header
  },
  data() {
    return {
      list: [],
      page: 1,
      isEnd: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let type = this.$route.query.type;
      let url = type == "essay" ? "/article/getList" : "/news/getList";
      this.$axios.get(url, { page: this.page, size: 10 }).then(res => {
        // console.log(res);
        this.list = [...this.list, ...res.data];
        this.isEnd = !res.data.length;
        this.page = this.isEnd ? this.page : this.page + 1;
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
    handleScroll() {
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 设备/屏幕高度
      let scrollObj = document.getElementById("list"); // 滚动区域
      let scrollTop = scrollObj.scrollTop; // div 到头部的距离
      let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
      //滚动条到底部的条件
      if (scrollTop + clientHeight + 30 === scrollHeight && !this.isEnd) {
        // div 到头部的距离 + 屏幕高度 = 可滚动的总高度
        // console.log('获取');
        this.getList();
      }
    }
  }
};
</script>

<style scoped lang="less">
.essay {
  padding: 15px;
  background: #fff;
  margin-top: 10px;
  height: 100vh;
  overflow-y: auto;
  .essay-item {
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
</style>
