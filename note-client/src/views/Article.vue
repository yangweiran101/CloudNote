<template>
  <div class="article">
    <Header inputName="文章详情"></Header>
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

    }
  },
  methods: {
    getDetail() {
      let id = this.$route.query.id;
      this.$axios.get(`/article/geDetail?id=${id}`).then(res => {
        console.log(res);
      })
    }
  },
  created() {
    this.getDetail()
  }
};
</script>

<style scoped></style>
