<template>
  <el-container>

    <navigation-bar />

    <el-container style="margin: 84px 0 20px 0">
      <el-main style="margin: 0 375px">
        <el-card>
          <div>
            {{ ratingDetail.title }}
            <br>
            发布人： {{ ratingDetail.userId }} &nbsp;&nbsp; 发布时间： {{ ratingDetail.createTime }} &nbsp;&nbsp; 点赞数：
            {{ ratingDetail.likeNum }} &nbsp;&nbsp;
            相关课程： {{ ratingDetail.courseName }} &nbsp;&nbsp;&nbsp;&nbsp; 课程类型： {{ ratingDetail.courseType }} &nbsp;&nbsp;&nbsp;&nbsp;
            相关专业： {{ ratingDetail.relatedMajor }} &nbsp;&nbsp;&nbsp;&nbsp; 打分： {{ ratingDetail.score }} &nbsp;&nbsp;&nbsp;&nbsp;
            <el-button @click="likeButton" type="success">
              <span v-if="!isLikedByUser">点赞</span>
              <span v-else>取消点赞</span>
            </el-button> &nbsp;&nbsp;
            <el-button @click="favourButton" type="success">
              <span v-if="!isFavouredByUser">收藏</span>
              <span v-else>取消收藏</span>
            </el-button> &nbsp;&nbsp;
            <el-button @click="modifyButton(ratingDetail.ratingId)" type="success"
                       v-if="username === ratingDetail.userId">
              修改课评
            </el-button> &nbsp;&nbsp;
            <el-button @click="deleteButton(ratingDetail.ratingId)" type="danger"
                       v-if="username === ratingDetail.userId">
              删除课评
            </el-button> &nbsp;&nbsp;
          </div>
          <div>
            {{ ratingDetail.content }}
          </div>
          <br>
          <div>
            评论：&nbsp;&nbsp;
            <el-button @click="openCommentBox(ratingId)" type="success">
              写评论
            </el-button>
          </div>
          <br>
          <div>
            <div v-for="comment in ratingDetail.comments" v-bind:key="comment.commentId">
              <div>
                {{ comment.userId + ' ' + comment.createTime }}
                <br>
                {{ comment.commentContent }}
                <el-divider></el-divider>
              </div>
            </div>
          </div>
        </el-card>

      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import axios from 'axios'
import NavigationBar from '@/components/NavigationBar'

export default {
  name: 'RatingDetail',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: localStorage.getItem('username') || '',
      ratingId: this.$route.query.ratingId,
      ratingDetail: {
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
      },
      isLikedByUser: false,
      isFavouredByUser: false
    }
  },
  methods: {
    likeButton () {
      if (this.isLikedByUser) {
        this.isLikedByUser = false
        let formData = new FormData()
        formData.append('id', this.ratingDetail.ratingId)
        formData.append('likeType', 1)
        formData.append('userId', this.username)
        formData.append('isLike', false)
        axios({
          method: 'post',
          url: 'http://localhost:8081/like',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
          .then(resp => {
            if (resp.status === 200) {
              this.$message.success('已取消点赞')
            } else {
              this.$message.error('点赞错误')
            }
          })
          .catch(error => {
            this.$message.error(error.response.data.message)
          })
      } else {
        this.isLikedByUser = true
        let formData = new FormData()
        formData.append('id', this.ratingDetail.ratingId)
        formData.append('likeType', 1)
        formData.append('userId', this.username)
        formData.append('isLike', true)
        axios({
          method: 'post',
          url: 'http://localhost:8081/like',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
          .then(resp => {
            if (resp.status === 200) {
              this.$message.success('已点赞')
            } else {
              this.$message.error('点赞错误')
            }
          })
          .catch(error => {
            this.$message.error(error.response.data.message)
          })
      }
    },
    favourButton () {
      if (this.isFavouredByUser) {
        this.isFavouredByUser = false
        let formData = new FormData()
        formData.append('id', this.ratingDetail.ratingId)
        formData.append('favourType', 1)
        formData.append('userId', this.username)
        formData.append('isFavour', false)
        axios({
          method: 'post',
          url: 'http://localhost:8081/favour',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
          .then(resp => {
            if (resp.status === 200) {
              this.$message.success('已取消收藏')
            } else {
              this.$message.error('收藏错误')
            }
          })
          .catch(error => {
            this.$message.error(error.response.data.message)
          })
      } else {
        this.isFavouredByUser = true
        let formData = new FormData()
        formData.append('id', this.ratingDetail.ratingId)
        formData.append('favourType', 1)
        formData.append('userId', this.username)
        formData.append('isFavour', true)
        axios({
          method: 'post',
          url: 'http://localhost:8081/favour',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
          .then(resp => {
            if (resp.status === 200) {
              this.$message.success('已收藏')
            } else {
              this.$message.error('收藏错误')
            }
          })
          .catch(error => {
            this.$message.error(error.response.data.message)
          })
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
          this.commentRating(id, value)
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
    commentRating (id, comment) {
      this.$message.info('comment rating by id : ' + id)
      let formData = new FormData()
      formData.append('id', this.ratingId)
      formData.append('userId', this.username)
      formData.append('commentType', 1)
      formData.append('content', comment)
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
    },
    modifyButton (ratingId) {
      this.$router.push({path: 'postRating', query: {ratingId: ratingId}})
    },
    deleteButton (ratingId) {
      let formData = new FormData()
      formData.append('id', ratingId)
      formData.append('userId', this.username)
      formData.append('deleteType', 1)
      axios({
        method: 'post',
        url: 'http://localhost:8081/delete',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then(resp => {
          if (resp.status === 200) {
            this.$message.success('文章已删除')
            this.$router.push({path: '/'})
          } else {
            this.$message.error('delete error')
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message)
        })
      this.$router.push({path: '/'})
    }
  },
  created () {
    this.$message.info('check rating by id : ' + this.ratingId)
    let _this = this
    let formData = new FormData()
    formData.append('userId', this.username)
    formData.append('ratingId', this.ratingId)
    axios({
      method: 'post',
      url: 'http://localhost:8081/getRatingDetail',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resp => {
        if (resp.status === 200) {
          _this.ratingDetail = resp.data.ratingDetail
          _this.isLikedByUser = resp.data.isLikedByUser
          _this.isFavouredByUser = resp.data.isFavouredByUser
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
.clickable-icon {
  font-size: 20px;
  font-weight: bolder;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
    color: #F20C00;
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
    color: #373737;
  }
}
</style>
