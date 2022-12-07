<template>
  <el-container>

    <navigation-bar />

    <el-container style="margin: 84px 0 20px 0">
      <el-main style="margin: 0 375px">

        <el-card>
          <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="12" style="text-align: left; white-space: nowrap; overflow: hidden">
              <span style="font-size: 16px; font-weight: bolder"> {{ articleDetail.title }} </span>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="7" style="text-align: right; white-space: nowrap; overflow: hidden">
              <span v-for="tag in articleDetail.tags" v-bind:key="tag" class="comment-tag">{{ tag }}</span>
            </el-col>
            <el-col :span="1" style="text-align: right">
              <span style="margin: 0 20px">
                <span style="color: #575757; cursor: pointer">
                  <i class="el-icon-star-off clickable-icon" v-if="!isFavouredByUser" @click="favourButton" />
                  <i class="el-icon-star-on clickable-icon" v-else @click="favourButton" />
                </span>
              </span>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>

          <el-row style="margin: 20px 0; text-align: left; line-height: 30px">
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
                &nbsp;&nbsp;{{ articleDetail.commentNum }}
              </span>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>

          <el-row v-for="(comment, index) in articleDetail.comments" v-show="index < 3" v-bind:key="comment.commentId">
            <el-divider/>
            <el-col :span="4" style="text-align: right">
              <i class="el-icon-chat-dot-round" style="font-size: 18px; margin-right: 15px" />
            </el-col>
            <el-col :span="20">
              <el-row style="text-align: left">
                <el-col :span="22">
                  <span> {{ comment.commentContent }} </span>
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

          <div>
<!--            <el-button @click="modifyButton(articleDetail.articleId)" type="success"-->
<!--                       v-if="username === articleDetail.userId">-->
<!--              修改文章-->
<!--            </el-button> &nbsp;&nbsp;-->
            <el-button @click="deleteButton(articleDetail.articleId)" type="danger"
                       v-if="username === articleDetail.userId">
              删除文章
            </el-button>
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
  name: 'ArticleDetail',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: localStorage.getItem('username') || '',
      articleID: this.$route.query.articleID,
      articleDetail: {
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
      isLikedByUser: false,
      isFavouredByUser: false
    }
  },
  methods: {
    likeButton () {
      // 1:id 2:userID 3:type(1 article 2 comment) 4:isLike
      if (this.isLikedByUser) {
        this.isLikedByUser = false
        // axios.get('http://localhost:8081/like/' + this.articleID + '/' + this.username + '/' + 1 + '/' + 0).then(function (resp) {
        //   this.$message.success('已取消点赞')
        // })
        let formData = new FormData()
        formData.append('id', this.articleDetail.articleId)
        formData.append('likeType', 0)
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
        // axios.get('http://localhost:8081/like/' + this.articleID + '/' + this.username + '/' + 1 + '/' + 1).then(function (resp) {
        //   this.$message.success('已点赞')
        // })
        let formData = new FormData()
        formData.append('id', this.articleDetail.articleId)
        formData.append('likeType', 0)
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
      // 1:id 2:userID 3:type(1 article 2 comment) 4:isLike
      if (this.isFavouredByUser) {
        this.isFavouredByUser = false
        // axios.get('http://localhost:8081/like/' + this.articleID + '/' + this.username + '/' + 1 + '/' + 0).then(function (resp) {
        //   this.$message.success('已取消点赞')
        // })
        let formData = new FormData()
        formData.append('id', this.articleDetail.articleId)
        formData.append('favourType', 0)
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
        // axios.get('http://localhost:8081/like/' + this.articleID + '/' + this.username + '/' + 1 + '/' + 1).then(function (resp) {
        //   this.$message.success('已点赞')
        // })
        let formData = new FormData()
        formData.append('id', this.articleDetail.articleId)
        formData.append('favourType', 0)
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
      formData.append('id', this.articleID)
      formData.append('userId', this.username)
      formData.append('commentType', 0)
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
    modifyButton (articleID) {
      this.$router.push({path: 'postArticle', query: {articleID: articleID}})
    },
    deleteButton (articleId) {
      let formData = new FormData()
      formData.append('id', articleId)
      formData.append('userId', this.username)
      formData.append('deleteType', 0)
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
    this.$message.info('check article by id : ' + this.articleID)
    let _this = this
    let formData = new FormData()
    formData.append('userId', this.username)
    formData.append('articleId', this.articleID)
    axios({
      method: 'post',
      url: 'http://localhost:8081/getArticleDetail',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resp => {
        if (resp.status === 200) {
          _this.articleDetail = resp.data.articleDetail
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
.el-main {
  text-align: center;
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
