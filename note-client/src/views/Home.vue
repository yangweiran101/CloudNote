<template>
  <div class="home">
    <Header inputName="树林小站"></Header>
    <!--轮播图-->
    <mt-swipe :auto="4000" style="height: 160px;">
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
    <!--选项卡-->
    <div class="tabbar">
      <div class="tabbar-item">
        <img src="../assets/img/index-bar04.png" alt="">
        <div class="title c33 fz12 mt10 tc">日志文章</div>
      </div>
      <div class="tabbar-item">
        <img src="../assets/img/index-bar05.png" alt="">
        <div class="title c33 fz12 mt10 tc">热点新闻</div>
      </div>
      <div class="tabbar-item">
        <img src="../assets/img/index-bar02.png" alt="">
        <div class="title c33 fz12 mt10 tc">精品工具</div>
      </div>
    </div>
    <!--日志文章-->
    <div class="essay">
      <div class="title fwb fz18 lh18">日志文章</div>
      <div class="essay-item mt10 ml10" @click="goToDetial()">
        <div class="item-title fz16 mb10 mt10 fwb">我的所思所想和现实感悟</div>
        <div class="item-info">
          <i class="iconfont icon-shijian fz12"></i>
          <span class="time fz12 c66 ml7">2018/11/20</span>
          <i class="iconfont icon-denglu fz12 ml20"></i>
          <span class="time fz12 c66 ml7">蔚然成风</span>
          <i class="iconfont icon-zhuanyehuwai fz12 ml20"></i>
          <span class="time fz12 c66 ml7">12</span>
        </div>
      </div>
    </div>
    <!--热点新闻-->
    <div class="article">
      <div class="title fwb fz18 lh18">热点新闻</div>
      <div class="box">
        <div class="article-item mt10">
          <img src="../assets/img/index-bar01.png" alt="">
          <div class="info">
            <div class="info-title fz14 fwb">
              欠信用卡的钱不还？你知道后果有多严重吗？
            </div>
            <div>
              <i class="iconfont icon-shijian fz12"></i>
              <span class="time fz12 c66 ml7">2018/11/20</span>
            </div>
          </div>
        </div>
        <div class="article-item mt10">
          <img src="../assets/img/index-bar01.png" alt="">
          <div class="info">
            <div class="info-title fz14">
              欠信用卡的钱不还？你知道后果有多严重吗？
            </div>
            <div>
              <i class="iconfont icon-shijian fz12"></i>
              <span class="time fz12 c66 ml7">2018/11/20</span>
            </div>
          </div>
        </div>
        <div class="article-item mt10">
          <img src="../assets/img/index-bar01.png" alt="">
          <div class="info">
            <div class="info-title fz14">
              欠信用卡的钱不还？你知道后果有多严重吗？
            </div>
            <div>
              <i class="iconfont icon-shijian fz12"></i>
              <span class="time fz12 c66 ml7">2018/11/20</span>
            </div>
          </div>
        </div>
        <div class="article-item mt10">
          <img src="../assets/img/index-bar01.png" alt="">
          <div class="info">
            <div class="info-title fz14">
              欠信用卡的钱不还？你知道后果有多严重吗？
            </div>
            <div>
              <i class="iconfont icon-shijian fz12"></i>
              <span class="time fz12 c66 ml7">2018/11/20</span>
            </div>
          </div>
        </div>
        <div class="article-item mt10">
        <img src="../assets/img/index-bar01.png" alt="">
        <div class="info">
          <div class="info-title fz14">
            欠信用卡的钱不还？你知道后果有多严重吗？
          </div>
          <div>
            <i class="iconfont icon-shijian fz12"></i>
            <span class="time fz12 c66 ml7">2018/11/20</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";
export default {
  name: "home",
  components: {
    Header
  },
  data() {
    return {

    }
  },
  methods: {
    // 获取文章详情
    goToDetial() {

    }
  }
};
</script>
<style></style>
<style scoped lang="less">
  .tabbar {
    width: 100%;
    padding: 20px 35px;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: space-between;
    .tabbar-item {
      img {
        width: 60px;
        height: 60px;
        display: block;
      }
      .title {
        width: 60px;
      }
    }
  }
  .article {
    padding: 15px;
    background: #fff;
    margin-top: 10px;
    .title {
      border-left: 4px solid #FD4644;
      padding-left: 8px;
    }
    .box {
      .article-item {
        display: flex;
        justify-content: space-between;
        img {
          width: 100px;
          height: 75px;
          display: block;
        }
        .info {
          width: 234px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
  .essay {
    padding: 15px;
    background: #fff;
    margin-top: 10px;
    .title {
      border-left: 4px solid #FD4644;
      padding-left: 8px;
    }
    .essay-item {

    }
  }
</style>
