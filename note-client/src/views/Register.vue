<template>
  <div class="login">
    <Header inputName="注册账号"></Header>
    <img class="dib logo" src="../assets/img/yang-logo.png" alt="" />
    <div class="user">
      <mt-field
        label="手机号"
        placeholder="请输入您的手机号"
        type="tel"
        v-model="mobile"
      ></mt-field>
      <mt-field
        label="用户名"
        placeholder="请输入用户名"
        v-model="username"
      ></mt-field>
      <mt-field
        label="密码"
        placeholder="请输入登陆密码"
        type="password"
        v-model="password"
      ></mt-field>
      <button class="fz18" @click="goRegister()">确认注册</button>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import { Toast } from "mint-ui";
export default {
  name: "Register",
  components: {
    Header
  },
  data() {
    return {
      mobile: "",
      username: "",
      password: ""
    };
  },
  methods: {
    goRegister() {}
  }
};
</script>

<style scoped lang="less">
.login {
  background: #fff;
  .logo {
    width: 80px;
    height: 80px;
    margin: 15px auto 0;
  }
  .user {
    padding: 0 20px;
    margin-top: 40px;
    button {
      width: 100%;
      height: 40px;
      border: 2px solid #333;
      background: #fff;
      border-radius: 4px;
      margin: 10px auto;
      display: block;
    }
  }
}
</style>
