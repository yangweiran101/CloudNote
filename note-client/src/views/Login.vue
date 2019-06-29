<template>
  <div class="login">
    <Header inputName="登 录"></Header>
    <img class="dib logo" src="../assets/img/yang-logo.png" alt="" />
    <div class="user">
      <mt-field
        label="手机号"
        :state="mobileStatus"
        placeholder="请输入手机号"
        type="tel"
        v-model="mobile"
      ></mt-field>
      <mt-field
        label="密码"
        :state="passwordStatus"
        placeholder="请输入登陆密码"
        type="password"
        v-model="password"
      ></mt-field>
      <button class="fz18 login-btn" @click="goLogin()">确认登录</button>
      <button class="fz18 register-btn" @click="goRegister()">前往注册</button>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import { Toast } from "mint-ui";
export default {
  name: "Login",
  components: {
    Header
  },
  data() {
    return {
      mobile: "17600996101",
      password: "",
      mobileStatus: "",
      passwordStatus: ""
    };
  },
  methods: {
    goLogin() {
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
      } else if (!this.password) {
        this.passwordStatus = "warning";
        return Toast({
          message: "密码不能为空",
          duration: 3000
        });
      }
      this.$axios.post("/login", {mobile: this.mobile, password: this.password}).then(res => {
        console.log(res);
        if (res.code == 401) return Toast({
            message: res.data,
            duration: 3000
          })
        else if (res.code == 200) {
          Toast({
            message: '登陆成功',
            duration: 3000
          })
        }
      })
    },
    goRegister() {
      this.$router.push("/Register");
    }
  },
  watch: {
    mobile(val) {
      if (!val) this.mobileStatus = "";
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
    width: 80px;
    height: 80px;
    margin: 15px auto 0;
  }
  .user {
    padding: 0 20px;
    margin: 40px auto;
    .login-btn {
      width: 100%;
      height: 40px;
      border: 2px solid #333;
      background: #fff;
      border-radius: 4px;
      margin: 10px auto;
      display: block;
    }
    .register-btn {
      width: 100%;
      height: 40px;
      border: 2px solid #333;
      background: #333;
      color: #fff;
      border-radius: 4px;
      margin: 10px auto;
      display: block;
    }
  }
}
</style>
