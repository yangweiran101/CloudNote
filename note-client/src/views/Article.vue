<template>
  <div class="article">
    <Header inputName="文章详情"></Header>
    <div class="box pl14 pr14" v-if="article">
      <div class="title fz20 fwb tc mt20 mb10">{{ article.title }}</div>
      <div class="lh18 mb10 tc">
        <i class="iconfont icon-denglu fz12"></i>
        <span class="time fz12 c66 ml7">{{username}}</span>
        <i class="iconfont icon-shijian fz12 ml20"></i>
        <span class="time fz12 c66 ml7">{{article.createTime}}</span>
        <i class="iconfont icon-zhuanyehuwai fz12 ml20"></i>
        <span class="time fz12 c66 ml7">{{article.view}}</span>
      </div>
      <div class="content fz14 " v-html="article.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  name: "Article",
  components: {
    Header
  },
  data() {
    return {
      article: {},
      username: ""
    };
  },
  methods: {
    getDetail() {
      let id = this.$route.query.id;
      this.$axios.get(`/article/geDetail?id=${id}`).then(res => {
        this.username = JSON.parse(res.data.author).username;
        this.article = res.data;
        console.log(res);
      });
    }
  },
  created() {
    this.getDetail();
  }
};
</script>

<style scoped>
.content {
  text-indent: 25px;
}
</style>
