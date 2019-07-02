<template>
  <div>
    <Header inputName="发表日志"></Header>
    <div class="title fz18 fwb">
      <div class="label">标题：</div>
      <input type="text" class="fz16 input" v-model="title" />
    </div>
    <div id="editor" ref="editor" style="text-align:left;"></div>
    <div class="btns tc">
      <mt-button size="normal" class="btn" type="danger" @click="clearContent"
        >清空</mt-button
      >
      <mt-button size="normal" class="btn" @click="getContent" style=""
        >发表内容</mt-button
      >
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import { Toast } from "mint-ui";
import Header from "../components/Header";
export default {
  name: "Write",
  components: {
    Header
  },
  data() {
    return {
      title: "", // 文章标题
      editorContent: "", // 富文本编辑内容
      userInfo: {}
    };
  },
  methods: {
    getContent: function() {
      // alert(this.editorContent)
      if (!this.judgeLogin()) {
        Toast({
          message: "请登陆后再发表日志",
          duration: 3000
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } else if (this.title == "") {
        return Toast({
          message: "标题不能为空",
          duration: 3000
        });
      } else if (this.editorContent == "") {
        // console.log("日志为空",this.editorContent);
        return Toast({
          message: "日志内容不能为空",
          duration: 3000
        });
      } else {
        const essay = {};
        essay.author = JSON.stringify(this.userInfo);
        essay.userId = this.userInfo.id;
        essay.articleId =
          JSON.stringify(new Date().getTime()) +
          this.userInfo.id +
          this.userInfo.id * new Date().getSeconds();
        essay.title = this.title;
        essay.content = this.editorContent;
        essay.createTime = this.$formatDateTime(new Date());
        console.log( essay, essay.createTime, new Date().getTime(), this.userInfo.id * new Date().getSeconds());
        this.$axios.post("/article/upload", essay).then(res => {
          // console.log(res);
          if (res.code == 401) {
            return Toast({
              message: "发表失败，请稍后重试",
              duration: 3000
            });
          } else if (res.code == 200) {
            this.$router.push("/");
            Toast({
              message: "发表成功！",
              duration: 3000
            });
          }
        })
      }
    }, // 提交文章
    clearContent: function() {
      this.editorContent = "";
    }, // 清空文章
    judgeLogin() {
      // console.log(JSON.parse(this.$cookie.get("userInfo")));
      if (
        this.$cookie.get("userInfo") &&
        JSON.parse(this.$cookie.get("userInfo")).length !== 0
      ) {
        let author = JSON.parse(this.$cookie.get("userInfo"))[0];
        this.userInfo = {
          username: author.username,
          mobile: author.mobile,
          id: author.id
        };
        return true;
      } else {
        return false;
      }
    } // 判断是否为登陆状态
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "emoticon", // 表情
      "image", // 插入图片
      "undo", // 撤销
      "list", // 列表
      "justify" // 对齐方式
    ];
    editor.create();
  }
};
</script>

<style>
#editor {
  width: 100%;
  font-size: 18px;
  background: #fff;
}
.w-e-toolbar {
  flex-wrap: wrap;
}
</style>
<style scoped lang="less">
.title {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #fff;
  .input {
    border: none;
    outline: none;
    width: 270px;
  }
}
.btns {
  width: 80%;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
  .btn {
    width: 120px;
  }
  .btn:last-child {
    border: 0.053333rem solid #333;
    background: #333;
    color: #fff;
  }
}
</style>
