<template>
  <div class="add">
    <el-form
        :model="news"
        :rules="rules"
        ref="news"
        label-width="150px"
        class="newsForm"
    >
      <el-form-item label="文章题目" prop="title">
        <el-input
            v-model="news.title"
            placeholder="请输入新闻题目"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm('ruleForm')">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "addNews",
    data() {
      return {
        news: {
          title: ''
        }
      }
    }
  }
</script>

<style scoped>
  .newsForm {
    width: 80%;
    margin: 0 auto;
  }
</style>