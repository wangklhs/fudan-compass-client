<template>
  <el-container>
    <el-header>
      header
    </el-header>
    <el-main>
      <div>
        发布人： {{ articleDetail.user_id }} &nbsp;&nbsp; 发布时间： {{ articleDetail.create_time }} &nbsp;&nbsp; 点赞数： {{ articleDetail.like_num }} &nbsp;&nbsp;
        <el-button @click="likeButton" type="success">
          <span v-if="!articleDetail.isLikedByUser">点赞</span>
          <span v-else>取消点赞</span>
        </el-button> &nbsp;&nbsp;
        标签： <span v-for="tag in articleDetail.tags" v-bind:key="tag"> {{ tag }} &nbsp;&nbsp; </span>
      </div>
      <div>
        {{ articleDetail.content }}
      </div>
      <br>
      <div>
        评论：&nbsp;&nbsp;
        <el-button @click="openCommentBox(articleID)" type="success">
          写评论
        </el-button>
      </div>
      <br>
      <div>
        <div v-for="comment in articleDetail.comments" v-bind:key="comment.comment_id">
          <div>
            {{ comment.user_id + ' ' + comment.create_time }}
            <br>
            {{ comment.comment_content }}
            <el-divider></el-divider>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticleDetail',
  data () {
    return {
      username: localStorage.getItem('username') || '',
      articleID: this.$route.query.articleID,
      articleDetail: {
        article_id: 1,
        user_id: 19302010001,
        content: '这是一篇文章',
        comment_num: 3,
        like_num: 2,
        create_time: '2022-11-01',
        update_time: '2022-12-01',
        tags: ['生活', '娱乐'],
        isLikedByUser: false,
        comments: [
          {
            comment_id: 1,
            commented_id: 1,
            commented_type: 1,
            user_id: 20302010001,
            comment_content: '第一篇文章的第一条评论',
            like_num: 0,
            create_time: '2022-11-01 12:34:56',
            update_time: '2022-11-01 12:34:56'
          },
          {
            comment_id: 2,
            commented_id: 1,
            commented_type: 1,
            user_id: 20302010002,
            comment_content: '第一篇文章的第二条评论',
            like_num: 0,
            create_time: '2022-11-02 12:34:56',
            update_time: '2022-11-02 12:34:56'
          },
          {
            comment_id: 3,
            commented_id: 1,
            commented_type: 1,
            user_id: 20302010003,
            comment_content: '第一篇文章的第三条评论',
            like_num: 0,
            create_time: '2022-11-03 12:34:56',
            update_time: '2022-11-03 12:34:56'
          }
        ]
      }
    }
  },
  methods: {
    likeButton () {
      // 1:id 2:userID 3:type(1 article 2 comment) 4:isLike
      if (this.articleDetail.isLikedByUser) {
        this.articleDetail.isLikedByUser = false
        // axios.get('http://localhost:8081/like/' + this.articleID + '/' + this.username + '/' + 1 + '/' + 0).then(function (resp) {
        //   this.$message.success('已取消点赞')
        // })
      } else {
        this.articleDetail.isLikedByUser = true
        // axios.get('http://localhost:8081/like/' + this.articleID + '/' + this.username + '/' + 1 + '/' + 1).then(function (resp) {
        //   this.$message.success('已点赞')
        // })
      }
    },
    openCommentBox (id) {
      this.$prompt('请输入评论', '评论', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (value == null || value.trim() === '') {
          this.$message({
            type: 'error',
            message: '评论不能为空'
          })
        } else {
          this.commentArticle(id, value)
          this.$message({
            type: 'success',
            message: '你的评论是: ' + value
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消评论'
        })
      })
    },
    commentArticle (id, comment) {
      this.$message.info('comment article by id : ' + id)
      let formData = new FormData()
      formData.append('comment_content', comment)
      formData.append('user_id', this.username)
      formData.append('commented_id', id)
      formData.append('commented_type', 1)
      axios({
        method: 'post',
        url: 'http://localhost:8081/comment',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then(resp => {
          if (resp.status === 200) {
            this.$message.success('评论发表成功')
          } else {
            this.$message.error('search error')
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message)
        })
    }
  },
  created () {
    this.$message.info('check article by id : ' + this.articleID)
    // let _this = this
    // let formData = new FormData()
    // formData.append('user_id', this.username)
    // formData.append('article_id', this.articleID)
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:8081/getArticleDetail',
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   data: formData
    // })
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       _this.articleDetail = resp.data.articleDetail
    //     } else {
    //       this.$message.error('search error')
    //     }
    //   })
    //   .catch(error => {
    //     this.$message.error(error.response.data.message)
    //   })
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
}
</style>
