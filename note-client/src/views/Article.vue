<template>
  <div class="article">
    <Header :inputName="type == 'essay'?'文章详情':'新闻详情'"></Header>
    <div class="box pl14 pr14" v-if="article">
      <div class="title fz20 fwb tc mt20 mb10">{{ article.title }}</div>
      <div class="lh18 mb10 tc">
        <i class="iconfont icon-denglu fz12"></i>
        <span class="time fz12 c66 ml7">{{article.author}}</span>
        <i class="iconfont icon-shijian fz12 ml20"></i>
        <span class="time fz12 c66 ml7">{{article.createTime}}</span>
        <i class="iconfont icon-zhuanyehuwai fz12 ml20" v-if="type == 'essay'"></i>
        <span class="time fz12 c66 ml7" v-if="type == 'essay'">{{article.view}}</span>
      </div>
      <img class="articleImg" :src="article.swipeImageUrl" :alt="article.title">
      <div class="content fz16 mb60" v-html="article.editorContent"></div>
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
      type: ""
    };
  },
  methods: {
    getDetail() {
      let id = this.$route.query.id;
      this.type = this.$route.query.type;
      let url = this.type === "essay" ? "/article/geDetail" : "/news/geDetail";
      this.$axios.get(`${url}?id=${id}`).then(res => {
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
.articleImg {
  width: 100%;
}
</style>
