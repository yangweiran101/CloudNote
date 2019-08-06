<template>
  <div class="list">
    <div>我是用户列表</div>
    <el-table :data="userList" stripe style="width: 60%;margin: 20px auto"  border>
      <ElTableColumn label="编号" type="index" width="80px"></ElTableColumn>
      <ElTableColumn label="用户名" prop="username"></ElTableColumn>
      <ElTableColumn label="手机号" prop="mobile"></ElTableColumn>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        style="margin: 20px auto;text-align: center"
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.size"
        :current-page="page.count"
        @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "userList",
    data() {
      return {
        userList: [],
        page: {
          count: 1,
          total: 0,
          size: 5
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        // console.log('当前页',this.page.count);
        this.$axios.get('/getUser',{page: this.page.count, size: 5}).then(res => {
          console.log(res);
          this.userList = res.data.list;
          this.page.total = res.data.total
        })
      },
      pageChange(data) {
        this.page.count = data;
        this.getList();
      }
    }
  }
</script>

<style scoped>

</style>
<style>
  .el-table td, .el-table th {
    text-align: center;
  }
</style>