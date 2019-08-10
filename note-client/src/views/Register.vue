<template>
  <div class="login">
    <Header inputName="注册账号"></Header>
    <img class="dib logo" src="../assets/img/yang-logo.png" alt="" />
    <div class="user">
      <mt-field
        label="手机号"
        placeholder="请输入您的手机号"
        :state="mobileStatus"
        type="tel"
        v-model="mobile"
      ></mt-field>
      <mt-field
        label="用户名"
        placeholder="请输入用户名"
        :state="usernameStatus"
        v-model="username"
      ></mt-field>
      <mt-field
        label="密码"
        placeholder="请输入您的密码"
        :state="passwordStatus"
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
      password: "",
      mobileStatus: "",
      usernameStatus: "",
      passwordStatus: ""
    };
  },
  methods: {
    goRegister() {
      if (!this.mobile) {
        this.mobileStatus = "warning";
        return Toast({
          message: "手机号不能为空",
          duration: 3000
        });
      } else if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.mobileStatus = "error";
        return Toast({
          message: "请输入正确格式手机号",
          duration: 3000
        });
      } else if (!this.username) {
        this.usernameStatus = "warning";
        return Toast({
          message: "用户名不能为空",
          duration: 3000
        });
      } else if (!this.password) {
        this.passwordStatus = "warning";
        return Toast({
          message: "密码不能为空",
          duration: 3000
        });
      }
      this.$axios
        .post("/register", {
          mobile: this.mobile,
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);
          if (res.code == 401)
            return Toast({
              message: res.data,
              duration: 3000
            });
          else if (res.code == 200) {
            Toast({
              message: "注册成功",
              duration: 3000
            });
            this.$router.push("/login");
          }
        });
    }
  },
  watch: {
    mobile(val) {
      if (!/^1[3456789]\d{9}$/.test(val)) this.mobileStatus = "";
    },
    username(val) {
      if (val) this.usernameStatus = "";
    },
    password(val) {
      if (val) this.passwordStatus = "";
    }
  }
};
</script>

<style scoped lang="less">
.login {
  background: #fff;
  .logo {
    width: 120px;
    height: 120px;
    margin: 24px auto 0;
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
