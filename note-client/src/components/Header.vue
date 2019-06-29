<template>
  <div class="header row">
    <div class="col-20 left lh44 tc">
      <i class="iconfont icon-icon-test10 fz24" v-if="this.$route.path === '/'"></i>
      <i class="iconfont icon-icon-test13 fz24" v-else @click="goBack()"></i>
    </div>
    <div class="col-33 middle">
      <img class="dib" src="../assets/img/yang-logo.png" alt="" />
      <div class="fz18 lh44 c33">{{inputName}}</div>
    </div>
    <div class="col-20 right lh44 tc" @click="goLogin()">
      <i class="iconfont icon-icon-test1 fz24"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    inputName: {
      type: String
    }
  },
  methods: {
    goLogin() {
      this.$router.push("/Login");
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 44px;
  background: #fff;
  border-bottom: 1px solid #eeeeee;
  .middle {
    display: flex;
    justify-content: flex-start;
    padding: 0 10px;
    img {
      width: 24px;
      height: 24px;
      margin-top: 10px;
      margin-right: 5px;
    }
  }
  .right {
  }
}
</style>
