<template>
  <div class="layout">
    <el-container style="height: 100%;">
      <!--侧边栏选项卡-->
      <el-aside width="200px">
        <el-menu>
          <el-menu-item index="0" @click="goToPage('/')">
            <i class="el-icon-star-off"></i>
            <span slot="title">资讯站后台</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user"></i>用户管理</template>
            <el-menu-item index="1-1" @click="goToPage('/user/userList')"><i class="el-icon-document"></i>用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>新闻管理</template>
            <el-menu-item index="2-1" @click="goToPage('/news/addNews')">添加新闻</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--内容-->
      <el-container>
        <el-header style="text-align: right; font-size: 16px">
          <el-dropdown @command="handleCommand">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="view">查看</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{username}}</span>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "layout",
    data() {
      return {

      }
    },
    computed: {
      ...mapState({
        username: 'username'
      })
    },
    created() {
      this.isLogin()
    },
    methods: {
      goToPage(path) {
        this.$router.push(path)
      },
      handleCommand(command) {
        if (command == "logout") {
          this.$store.commit('clearUserInfo')
          this.$router.push('/login')
          this.$cookie.remove("userInfo");
          this.$message.warning('退出登录')
        }
      },
      isLogin() {
        // console.log("电话",this.mobile);
        if (!this.$cookie.get('userInfo')&&!this.mobile) {
          this.$message('未登录,正在前往登录')
          setTimeout(() => {
            this.$router.push('/login')
          },2000)
        } else if (this.$cookie.get('userInfo')&&!this.mobile) {
          this.$store.commit('changeUserInfo',JSON.parse(this.$cookie.get('userInfo')));
        }
      }
    }
  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #fff;
    background: rgb(84,92,100);
  }
  .el-menu {
    background: rgb(84,92,100);
    border: none;
  }
  .el-submenu__title,.el-menu-item {
    color: #fff;
  }
  .el-submenu__title:hover,.el-menu-item:hover {
    color: #545c64;
  }
  .el-menu-item.is-active {
    color: #ffd04b;
  }
  .layout {
    height: 100vh;
  }
</style>