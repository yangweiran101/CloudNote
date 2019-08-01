<template>
  <div>
    <Header inputName="日志文章"></Header>
    <!--日志文章-->
    <div class="essay" id="list" @scroll="handleScroll()">
      <div
        class="essay-item mt30 mb30 ml10"
        @click="goToDetial(item.articleId)"
        v-for="(item, index) in essay"
        :key="index"
      >
        <div class="item-title fz18 mt20 mt10">{{ item.title }}</div>
        <div class="item-info fz14">
          <i class="iconfont icon-shijian fz12"></i>
          <span class="time fz12 c66 ml7">{{ item.createTime }}</span>
          <i class="iconfont icon-denglu fz12 ml20"></i>
          <span class="time fz12 c66 ml7">{{ item.author.username }}</span>
          <i class="iconfont icon-zhuanyehuwai fz12 ml20"></i>
          <span class="time fz12 c66 ml7">{{ item.view }}</span>
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
      essay: [],
      page: 1,
      isEnd: false
    };
  },
  created() {
    this.getEssayList();
  },
  methods: {
    getEssayList() {
      this.$axios
        .get("/article/getList", { page: this.page, size: 10 })
        .then(res => {
          console.log(res);
          res.data.forEach(item => {
            item.author = JSON.parse(item.author);
          });
          this.essay = [...this.essay, ...res.data];
          this.isEnd = !res.data.length;
          this.page = this.isEnd ? this.page : this.page + 1;
        });
    },
    handleScroll() {
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 设备/屏幕高度
      let scrollObj = document.getElementById("list"); // 滚动区域
      let scrollTop = scrollObj.scrollTop; // div 到头部的距离
      let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
      //滚动条到底部的条件
      if (scrollTop + clientHeight + 30 === scrollHeight&&!this.isEnd) {
        // div 到头部的距离 + 屏幕高度 = 可滚动的总高度
        // console.log('获取');
        this.getEssayList();
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
</style>
