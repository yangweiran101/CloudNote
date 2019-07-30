<template>
  <div>
    <Header inputName="日志文章"></Header>
    <!--日志文章-->
    <div class="essay">
      <div
        class="essay-item mt10 ml10"
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
  }
};
</script>

<style scoped lang="less">
.essay {
  padding: 15px;
  background: #fff;
  margin-top: 10px;
  .essay-item {
  }
}
</style>
