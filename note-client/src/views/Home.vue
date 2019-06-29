<template>
  <div class="home">
    <Header inputName="杨家小院"></Header>
    <!--轮播图-->
    <mt-swipe :auto="4000" style="height: 300px;">
      <mt-swipe-item>
        <img
          class="swipe-img"
          src="../assets/img/banner.jpg"
          alt=""
          style="width: 100%;height: 100%;"
        />
      </mt-swipe-item>
      <mt-swipe-item>
        <img
          class="swipe-img"
          src="../assets/img/banner01.jpg"
          alt=""
          style="width: 100%;height: 100%;"
        />
      </mt-swipe-item>
      <mt-swipe-item>
        <img
          class="swipe-img"
          src="../assets/img/banner03.jpg"
          alt=""
          style="width: 100%;height: 100%;"
        />
      </mt-swipe-item>
    </mt-swipe>
    <div class="tabbar"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";
export default {
  name: "home",
  components: {
    Header
  }
};
</script>
<style></style>
<style scoped lang="less"></style>
