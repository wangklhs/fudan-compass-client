<template>
  <el-container>

    <navigation-bar />

    <el-container style="margin: 84px 0 20px 0">
      <el-main style="margin: 0 375px">

        <el-card>
          <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="22" style="text-align: left">
              <span style="font-size: 18px; font-weight: bolder"> {{ articleDetail.title }} </span>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>

          <el-row style="margin: 40px 0; text-align: left; line-height: 30px">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="20">
              <span> {{ articleDetail.content }} </span>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
          </el-row>

          <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5" style="text-align: left">
              <span><i class="el-icon-user" /> &nbsp;&nbsp;{{ articleDetail.userId }} </span>
            </el-col>
            <el-col :span="11" style="text-align: left">
              <span><i class="el-icon-time" /> &nbsp;&nbsp;{{ articleDetail.createTime }} </span>
            </el-col>
            <el-col :span="3" style="text-align: right">
              <span style="margin: 0 20px; white-space: nowrap">
                <span style="cursor: pointer">
                  <transition name="bounce" v-if="!isLikedByUser">
                    <i class="el-icon-thumb clickable-icon" style="color: #373737; position: absolute; margin-top: 7.5px; margin-left: -25px" @click="likeButton"/>
                  </transition>
                  <i class="el-icon-thumb clickable-icon" v-else style="color: #F20C00; position: absolute; z-index: 2; margin-top: 7.5px; margin-left: -25px" @click="likeButton"/>
                </span>
                &nbsp;&nbsp;{{ articleDetail.likeNum }}
              </span>
            </el-col>
            <el-col :span="3" style="text-align: right">
              <span style="margin: 0 20px; white-space: nowrap">
                <span style="color: #575757; cursor: pointer">
                  <i class="el-icon-chat-line-round clickable-icon" @click="openCommentBox(articleID)" />
                </span>
                &nbsp;&nbsp;{{ articleDetail.comments.length }}
              </span>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>

          <el-row style="margin: 10px 0">
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="11" style="text-align: left; margin-left: -8px">
              <span v-for="tag in articleDetail.tags" v-bind:key="tag" class="comment-tag">{{ tag }}</span>
            </el-col>
            <el-col :span="5" style="text-align: right; margin: 0 -5% 0 5%">&nbsp;
              <el-button type="danger" @click="deleteButton(articleDetail.articleId)"
                         v-if="username === articleDetail.userId" style="width: 100px; height: 40px">
                <span>删除课评</span>
              </el-button>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5" style="text-align: right">
              <el-button type="primary" class="details-button" @click="favourButton" style="width: 100px; height: 40px; margin-right: 8px">
                <span v-if="!isFavouredByUser">收藏</span>
                <span v-else>取消收藏</span>
              </el-button>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>

          <el-row v-for="(comment) in articleDetail.comments" v-bind:key="comment.id">
            <el-divider/>
            <el-col :span="4" style="text-align: right">
              <i class="el-icon-chat-dot-round" style="font-size: 18px; margin-right: 15px" />
            </el-col>
            <el-col :span="20">
              <el-row style="text-align: left">
                <el-col :span="22">
                  <span> {{ comment.content }} </span>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
              </el-row>
              <el-row style="text-align: right">
                <el-col :span="9">&nbsp;</el-col>
                <el-col :span="6">
                  <span><i class="el-icon-user" /> &nbsp;&nbsp;{{ comment.userId }} </span>
                </el-col>
                <el-col :span="7">
                  <span><i class="el-icon-time" /> &nbsp;&nbsp;{{ comment.createTime }} </span>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
              </el-row>
            </el-col>
          </el-row>

        </el-card>

      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import axios from 'axios'
import NavigationBar from '@/components/NavigationBar'

export default {
  name: 'ArticleDetail',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: localStorage.getItem('username') || '',
      userId: localStorage.getItem('userId') * 1 || 1,
      articleID: this.$route.query.articleID,
      articleDetail: {
        id: 1,
        userId: 19302010001,
        title: '标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
        content: '这是一篇文章',
        likeNum: 5,
        createTime: '2022-11-01 12:34:56',
        updateTime: '2022-12-01 12:34:56',
        tags: ['生活', '娱乐'],
        comments: [
          {
            id: 1,
            userId: '20302010001',
            content: '第一篇文章的第一条评论',
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
        // axios.get('http://localhost:8081/like/' + this.articleID + '/' + this.username + '/' + 1 + '/' + 0).then(function (resp) {
        //   this.$message.success('已取消点赞')
        // })
        // let formData = new FormData()
        // formData.append('id', this.articleDetail.articleId)
        // formData.append('likeType', 0)
        // formData.append('userId', this.username)
        // formData.append('isLike', false)
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:8081/like',
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
        //   data: formData
        // })
        axios.post('http://localhost:8081/like', {
          id: this.articleDetail.id,
          userId: this.userId,
          isLike: false,
          likeType: 0
        })
          .then(resp => {
            if (resp.status === 200) {
              this.$message.success('已取消点赞')
              this.refresh()
            } else {
              this.$message.error('点赞错误')
            }
          })
          .catch(error => {
            this.$message.error(error.response.data.message)
          })
      } else {
        this.isLikedByUser = true
        // axios.get('http://localhost:8081/like/' + this.articleID + '/' + this.username + '/' + 1 + '/' + 1).then(function (resp) {
        //   this.$message.success('已点赞')
        // })
        // let formData = new FormData()
        // formData.append('id', this.articleDetail.articleId)
        // formData.append('likeType', 0)
        // formData.append('userId', this.username)
        // formData.append('isLike', true)
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:8081/like',
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
        //   data: formData
        // })
        axios.post('http://localhost:8081/like', {
          id: this.articleDetail.id,
          userId: this.userId,
          isLike: true,
          likeType: 0
        })
          .then(resp => {
            if (resp.status === 200) {
              this.$message.success('已点赞')
              this.refresh()
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
      // 1:id 2:userID 3:type(1 article 2 comment) 4:isLike
      if (this.isFavouredByUser) {
        this.isFavouredByUser = false
        // axios.get('http://localhost:8081/like/' + this.articleID + '/' + this.username + '/' + 1 + '/' + 0).then(function (resp) {
        //   this.$message.success('已取消点赞')
        // })
        // let formData = new FormData()
        // formData.append('id', this.articleDetail.articleId)
        // formData.append('favourType', 0)
        // formData.append('userId', this.username)
        // formData.append('isFavour', false)
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:8081/favour',
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
        //   data: formData
        // })
        axios.post('http://localhost:8081/favour', {
          id: this.articleDetail.id,
          userId: this.userId,
          isFavour: false,
          favourType: 0
        })
          .then(resp => {
            if (resp.status === 200) {
              this.$message.success('已取消收藏')
              this.refresh()
            } else {
              this.$message.error('收藏错误')
            }
          })
          .catch(error => {
            this.$message.error(error.response.data.message)
          })
      } else {
        this.isFavouredByUser = true
        // axios.get('http://localhost:8081/like/' + this.articleID + '/' + this.username + '/' + 1 + '/' + 1).then(function (resp) {
        //   this.$message.success('已点赞')
        // })
        // let formData = new FormData()
        // formData.append('id', this.articleDetail.articleId)
        // formData.append('favourType', 0)
        // formData.append('userId', this.username)
        // formData.append('isFavour', true)
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:8081/favour',
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
        //   data: formData
        // })
        axios.post('http://localhost:8081/favour', {
          id: this.articleDetail.id,
          userId: this.userId,
          isFavour: true,
          favourType: 0
        })
          .then(resp => {
            if (resp.status === 200) {
              this.$message.success('已收藏')
              this.refresh()
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
      // let formData = new FormData()
      // formData.append('id', this.articleID)
      // formData.append('userId', this.username)
      // formData.append('commentType', 0)
      // formData.append('content', comment)
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:8081/comment',
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   data: formData
      // })
      axios.post('http://localhost:8081/comments', {
        id: this.articleDetail.id,
        userId: this.userId,
        content: comment,
        commentType: 0
      })
        .then(resp => {
          if (resp.status === 200) {
            this.$message.success('评论发表成功')
            this.refresh()
          } else {
            this.$message.error('search error')
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message)
        })
    },
    // modifyButton (articleID) {
    //   this.$router.push({path: 'postArticle', query: {articleID: articleID}})
    // },
    deleteButton (articleId) {
      // let formData = new FormData()
      // formData.append('id', articleId)
      // formData.append('userId', this.username)
      // formData.append('deleteType', 0)
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:8081/delete',
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   data: formData
      // })
      axios.post('http://localhost:8081/delete', {
        id: this.articleDetail.id,
        userId: this.userId,
        deleteType: 0
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
    },
    refresh () {
      let _this = this
      axios.post('http://localhost:8081/articles/detail', {
        articleId: this.articleID * 1,
        userId: this.userId
      })
        .then(resp => {
          if (resp.status === 200) {
            console.log(resp.data)
            _this.articleDetail = resp.data
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
  },
  created () {
    // this.$message.info('check article by id : ' + this.articleID)
    // let formData = new FormData()
    // formData.append('userId', this.username)
    // formData.append('articleId', this.articleID)
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:8081/getArticleDetail',
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   data: formData
    // })
    this.refresh()
  }
}
</script>

<style scoped>
.details-button {
  background-color: #575757;
}

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
