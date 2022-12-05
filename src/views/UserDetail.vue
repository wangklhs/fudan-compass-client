<template>
<el-container>
  <el-header>
    header
  </el-header>
  <el-main>
    <div>
      用户名:&nbsp;{{ username }}
      <br>
      所在专业:&nbsp;{{ major }}
      <el-button type="primary" @click="openChangeMajorBox">修改专业信息</el-button>
    </div>
    <el-divider></el-divider>
    <div>收藏文章：</div>
    <el-card v-for="article in this.favourArticles" v-bind:key="article.articleId">
      {{ article.title }} <br>
      发帖人： {{ article.userId }} &nbsp;&nbsp;&nbsp;&nbsp; 发帖时间：{{ article.createTime }} &nbsp;&nbsp;&nbsp;&nbsp;
      标签： <span v-for="tag in article.tags" v-bind:key="tag"> {{ tag }} &nbsp;&nbsp; </span>
      <el-button type="primary" @click="checkArticleDetail(article.articleId)">查看详情</el-button>
      <br>
      {{ article.content }}
      <br>
      点赞数：{{ article.likeNum }} &nbsp;&nbsp;&nbsp;&nbsp;
      评论数： {{ article.commentNum }} &nbsp;&nbsp;&nbsp;&nbsp;
    </el-card>
    <el-divider></el-divider>
    <div>收藏课评：</div>
    <el-card v-for="rating in this.favourRatings" v-bind:key="rating.ratingId">
      {{ rating.title }} <br>
      发帖人： {{ rating.userId }} &nbsp;&nbsp;&nbsp;&nbsp; 发帖时间：{{ rating.createTime }} &nbsp;&nbsp;&nbsp;&nbsp;
      相关课程： {{ rating.courseName }} &nbsp;&nbsp;&nbsp;&nbsp; 课程类型： {{ rating.courseType }} &nbsp;&nbsp;&nbsp;&nbsp;
      相关专业： {{ rating.relatedMajor }} &nbsp;&nbsp;&nbsp;&nbsp; 打分： {{ rating.score }} &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="checkRatingDetail(rating.ratingId)">查看详情</el-button>
      <br>
      {{ rating.content }}
      <br>
      点赞数：{{ rating.likeNum }} &nbsp;&nbsp;&nbsp;&nbsp;
      评论数： {{ rating.commentNum }} &nbsp;&nbsp;&nbsp;&nbsp;
    </el-card>
  </el-main>
</el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserDetail',
  data () {
    return {
      username: localStorage.getItem('username') || '',
      major: '',
      favourArticles: [
        {
          articleId: 1,
          userId: '19302010001',
          title: '标题',
          content: '这是一篇文章',
          commentNum: 3,
          likeNum: 5,
          createTime: '2022-11-01 12:34:56',
          updateTime: '2022-12-01 12:34:56',
          tags: ['生活', '娱乐'],
          comments: [
            {
              commentId: 1,
              userId: '20302010001',
              commentContent: '第一篇文章的第一条评论',
              createTime: '2022-11-01 12:34:56',
              updateTime: '2022-11-01 12:34:56'
            },
            {
              commentId: 2,
              userId: '20302010002',
              commentContent: '第一篇文章的第二条评论',
              createTime: '2022-11-02 12:34:56',
              updateTime: '2022-11-02 12:34:56'
            },
            {
              commentId: 3,
              userId: '20302010003',
              commentContent: '第一篇文章的第三条评论',
              createTime: '2022-11-03 12:34:56',
              updateTime: '2022-11-03 12:34:56'
            }]
        },
        {
          articleId: 2,
          userId: '19302010002',
          title: '标题2',
          content: '这是第二篇文章',
          commentNum: 0,
          likeNum: 2,
          createTime: '2022-11-01 12:34:56',
          updateTime: '2022-12-01 12:34:56',
          tags: ['学习'],
          comments: []
        }
      ],
      favourRatings: [
        {
          ratingId: 1,
          userId: '19302010001',
          courseName: '项目管理',
          courseType: '专业必修课',
          relatedMajor: '软件工程',
          score: 9,
          title: '课程评价的标题',
          content: '这是一篇课程评价',
          commentNum: 1,
          likeNum: 3,
          createTime: '2022-11-01 12:34:56',
          updateTime: '2022-12-01 12:34:56',
          comments: [{
            commentId: 1,
            userId: '20302010001',
            commentContent: '第一篇课程评价的第一条评论',
            createTime: '2022-11-01 12:34:56',
            updateTime: '2022-11-01 12:34:56'
          }]
        }
      ]
    }
  },
  methods: {
    openChangeMajorBox () {
      this.$prompt('请输入专业', '修改专业信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (value == null || value.trim() === '') {
          this.$message({
            type: 'error',
            message: '专业不能为空'
          })
        } else {
          this.changeMajor(value)
          this.$message({
            type: 'success',
            message: '你的新专业是: ' + value
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改专业'
        })
      })
    },
    changeMajor (major) {
      this.$message.info('change major to : ' + major)
      this.major = major
      let _this = this
      let formData = new FormData()
      formData.append('major', major)
      formData.append('userId', this.username)
      axios({
        method: 'post',
        url: 'http://localhost:8081/setUserMajor',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then(resp => {
          if (resp.status === 200) {
            this.$message.success('专业修改成功')
            _this.major = major
          } else {
            this.$message.error('error')
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message)
        })
    },
    checkArticleDetail (id) {
      this.$router.push({path: 'articleDetail', query: {articleID: id}})
    },
    checkRatingDetail (id) {
      this.$router.push({path: 'ratingDetail', query: {ratingId: id}})
    }
  },
  created () {
    let _this = this
    let formData = new FormData()
    formData.append('userId', this.username)
    axios({
      method: 'post',
      url: 'http://localhost:8081/getUserMajor',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resp => {
        if (resp.status === 200) {
          _this.major = resp.data.major
        } else {
          this.$message.error('error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
    axios({
      method: 'post',
      url: 'http://localhost:8081/getUserFavourArticles',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resp => {
        if (resp.status === 200) {
          _this.favourArticles = resp.data.articleList
        } else {
          this.$message.error('error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
  }
}
</script>

<style scoped>
.el-header {
  text-align: center;
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-main {
  text-align: center;
  padding-left: 15%;
  padding-right: 15%;
}
</style>
