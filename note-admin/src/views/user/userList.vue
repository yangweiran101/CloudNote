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
    <el-dialog
        title="提示"
        :visible.sync="detailDialog"
        width="30%"
        center>
      <div class=""></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
        detailDialog: false,
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
      },
      handleDelete(index,row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除该用户, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$axios.delete('/delete',{id:row.id}).then(res => {
            console.log('删除',res);
            if (res.code == 200) {
              this.$message.success('删除成功!');
              this.page.count = 1;
              this.getList();
            } else {
              this.$message.warning('删除失败')
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleEdit(index,row) {
        console.log(index, row);
        this.detailDialog = true;
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