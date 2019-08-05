<template>
  <div>我是默认页</div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "default",
    data() {
      return {

      }
    },
    methods: {
      isLogin() {
        // console.log("电话",this.mobile);
        if (!this.mobile) {
          this.$message('未登录,正在前往登录')
          setTimeout(() => {
            this.$router.push('/login')
          },2000)
        }
      }
    },
    created() {
      this.isLogin()
    },
    computed: {
      ...mapState({
        username: 'username',
        mobile: 'mobile'
      })
    }
  }
</script>

<style scoped>

</style>