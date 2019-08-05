<template>
  <div class="login">
    <div class="login-model">
      <div class="login-title">资讯站后台管理系统</div>
      <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="65px"
          class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="mobile">
          <el-input
              v-model="ruleForm.mobile"
              placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
              type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              :loading="loading.submit"
          >立即登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    components: {},
    data() {
      let validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('手机号格式错误'));
        } else {
          callback();
        }
      };
      let validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loading: {
          submit: false
        },
        ruleForm: {
          mobile: "17600996101",
          password: "720828",
        },
        rules: {
          mobile: [
            {
              required: true,
              validator: validateMobile,
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              validator: validatePwd,
              trigger: "blur"
            }
          ],
        }
      };
    },
    created() {

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$axios.post('/login',this.ruleForm).then(res => {
              console.log(res);
              if (res.code == 401)
                return this.$message.error(res.data)
              else if (res.code == 200) {
                this.$message.success("登陆成功");
                this.$store.commit('changeUserInfo',res.data[0])
                this.$router.push('/');
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style scoped>
  .login {
    height: 100vh;
    position: relative;
    background-color: #1c1f21;
  }

  .login-model {
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 40px;
    box-sizing: border-box;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .login-model {
      width: 90%;
    }
  }

  .login-title {
    text-align: center;
    font-size: 20px;
  }

  .demo-ruleForm {
    margin-top: 40px;
  }
  .el-button--text {
    padding: 0;
  }
</style>
