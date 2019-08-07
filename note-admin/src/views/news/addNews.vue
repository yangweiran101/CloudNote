<template>
  <div class="add">
    <el-form
        :model="news"
        :rules="formRules"
        ref="news"
        label-width="120px"
        class="newsForm"
    >
      <el-form-item label="新闻标题" prop="title">
        <el-input
            v-model="news.title"
            placeholder="请输入新闻大标题"
        ></el-input>
      </el-form-item>
      <el-row >
        <el-col :span="10">
          <el-form-item label="新闻预览图" prop="headImageUrl">
            <el-switch
                v-model="isUpload.headImg"
                active-text="上传图片"
                inactive-text="上传链接">
            </el-switch>
            <el-upload
                class="avatar-uploader"
                action="/news/uploadImg"
                v-if="isUpload.headImg"
                :show-file-list="false"
                :on-success="handleHeadImgSuccess"
                :before-upload="beforeImgUpload">
              <img v-if="news.headImageUrl" :src="news.headImageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input
                v-else
                clearable
                v-model="news.headImageUrl"
                placeholder="请输入图片链接"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="新闻轮播图" prop="swipeImageUrl">
            <el-switch
                v-model="isUpload.swipeImg"
                active-text="上传图片"
                inactive-text="上传链接">
            </el-switch>
            <el-upload
                class="avatar-uploader"
                action="/news/uploadImg"
                v-if="isUpload.swipeImg"
                :show-file-list="false"
                :on-success="handleSwipeImgSuccess"
                :before-upload="beforeImgUpload">
              <img v-if="news.swipeImageUrl" :src="news.swipeImageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input
                v-else
                clearable
                v-model="news.swipeImageUrl"
                placeholder="请输入图片链接"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="新闻内容" prop="content">
        <div id="editor" ref="editor" style="text-align:left;"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setNews">发布</el-button>
        <el-button type="danger" @click="resetForm">重置新闻</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  class newsData {
    constructor () {
      this.title = ''; // 新闻标题
      this.headImageUrl = ''; // 缩略图
      this.swipeImageUrl = ''; // 新闻轮播图
      this.editorContent = ''; // 富文本编辑内容
    }
  }
  import { mapState } from 'vuex'
  import E from "wangeditor";
  import createHash from "../../assets/js/createHash"
  import formatDateTime from "../../assets/js/formatDateTime"
  export default {
    name: "addNews",
    data() {
      let validateTitle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新闻标题'));
        } else {
          callback();
        }
      };
      return {
        news: new newsData(),
        formRules: {
          title: [
            {
              required: true,
              validator: validateTitle,
              trigger: "blur"
            }
          ],
        },
        isUpload: {
          headImg: false,
          swipeImg: false
        }
      }
    },
    methods: {
      handleHeadImgSuccess(res, file) {
        console.log(res, file);
        if (res.code == 200) {
          this.news.headImageUrl = res.data;
        }
      },
      handleSwipeImgSuccess(res, file) {
        console.log(res, file);
        if (res.code == 200) {
          this.news.swipeImageUrl = res.data;
        }
      },
      beforeImgUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 10MB!');
        }
        return isLt2M;
      },
      resetForm() {
        this.news = new newsData()
        this.$message.success('已重置新闻')
      },
      setNews() {
        if (this.news.title == "") {
          return this.$message.success("标题不能为空")
        } else if (this.news.editorContent == "") {
          return this.$message.success("新闻内容不能为空")
        } else {
          let news = {};
          news.newsId = createHash(32);
          news.author = this.username;
          news.createTime = formatDateTime(new Date());
          news = {...news,...this.news}
          console.log(news);
          this.$axios.post('/news/addNews',news).then(res => {
            console.log(res);
            if (res.code == 401) {
              return this.$message.error("发表失败，请稍后重试")
            } else if (res.code == 200) {
              this.$router.push("/");
              this.$message.success("发表成功")
            }
          })
        }
      }
    },
    computed: {
      ...mapState({
        username: 'username'
      })
    },
    mounted() {
      var editor = new E(this.$refs.editor);
      editor.customConfig.onchange = html => {
        this.news.editorContent = html;
      };
      editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ];
      editor.create();
    }
  }
</script>

<style>
  .newsForm {
    width: 80%;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 160px;
    height: 120px;
    text-align: center;
    vertical-align: middle;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 100%;
  }
</style>