<template>
  <el-container>

    <navigation-bar />

    <el-container style="margin: 84px 0 20px 0">
      <el-main style="margin: 0 375px">

        <el-card>
          <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="22" style="text-align: left">
              <span style="font-size: 18px; font-weight: bolder"> {{ ratingDetail.title }} </span>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>

          <el-row style="text-align: left">
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="6">
              <b>相关课程：</b> {{ ratingDetail.courseName }}
            </el-col>
            <el-col :span="6">
              <b>课程类型：</b> {{ ratingDetail.courseType }}
            </el-col>
            <el-col :span="6">
              <b>相关专业：</b> {{ ratingDetail.relatedMajor }}
            </el-col>
            <el-col :span="4">
              <b>打分：</b> {{ ratingDetail.score }}
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>

          <el-row style="margin: 40px 0; text-align: left; line-height: 30px">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="20">
              <span> {{ ratingDetail.content }} </span>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
          </el-row>

          <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5" style="text-align: left">
              <span><i class="el-icon-user" /> &nbsp;&nbsp;{{ ratingDetail.username }} </span>
            </el-col>
            <el-col :span="11" style="text-align: left">
              <span><i class="el-icon-time" /> &nbsp;&nbsp;{{ ratingDetail.createTime }} </span>
            </el-col>
            <el-col :span="3" style="text-align: right">
              <span style="margin: 0 20px; white-space: nowrap">
                <span style="cursor: pointer">
                  <transition name="bounce" v-if="!isLikedByUser">
                    <i class="el-icon-thumb clickable-icon" style="color: #373737; position: absolute; margin-top: 7.5px; margin-left: -25px" @click="likeButton"/>
                  </transition>
                  <i class="el-icon-thumb clickable-icon" v-else style="color: #F20C00; position: absolute; z-index: 2; margin-top: 7.5px; margin-left: -25px" @click="likeButton"/>
                </span>
                &nbsp;&nbsp;{{ ratingDetail.likeNum }}
              </span>
            </el-col>
            <el-col :span="3" style="text-align: right">
              <span style="margin: 0 20px; white-space: nowrap">
                <span style="color: #575757; cursor: pointer">
                  <i class="el-icon-chat-line-round clickable-icon" @click="openCommentBox(ratingId)" />
                </span>
                &nbsp;&nbsp;{{ ratingDetail.comments.length }}
              </span>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
          </el-row>

          <el-row style="margin: 10px 0">
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="11">&nbsp;</el-col>
            <el-col :span="5" style="text-align: right; margin: 0 -5% 0 5%">&nbsp;
              <el-button type="danger" @click="deleteButton()"
                         v-if="userId === ratingDetail.userId" style="width: 100px; height: 40px">
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

          <el-row v-for="(comment) in ratingDetail.comments" v-bind:key="comment.id">
            <el-divider/>
            <el-col :span="4" style="text-align: right">
              <i class="el-icon-chat-dot-round" style="font-size: 18px; margin-right: 15px" />
            </el-col>
            <el-col :span="20">
              <el-row style="text-align: left; line-height: 30px">
                <el-col :span="22">
                  <span> {{ comment.content }} </span>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
              </el-row>
              <el-row style="text-align: right">
                <el-col :span="9">&nbsp;</el-col>
                <el-col :span="6">
                  <span><i class="el-icon-user" /> &nbsp;&nbsp;{{ comment.username }} </span>
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
  name: 'RatingDetail',
  components: {
    NavigationBar
  },
  data () {
    return {
      userId: localStorage.getItem('userId') * 1,
      username: localStorage.getItem('username'),
      ratingId: this.$route.query.ratingId,
      ratingDetail: {
        id: 1,
        userId: 1,
        courseName: '项目管理',
        courseType: '专业必修课',
        relatedMajor: '软件工程',
        score: 9,
        title: '课程评价的标题',
        content: '这是一篇课程评价',
        likeNum: 3,
        createTime: '2022-11-01 12:34:56',
        updateTime: '2022-12-01 12:34:56',
        comments: [{
          id: 1,
          userId: 1,
          content: '第一篇课程评价的第一条评论',
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
        axios.post('http://localhost:8081/like', {
          id: this.ratingId,
          userId: this.userId,
          isLike: false,
          likeType: 1
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
        axios.post('http://localhost:8081/like', {
          id: this.ratingId,
          userId: this.userId,
          isLike: true,
          likeType: 1
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
      if (this.isFavouredByUser) {
        this.isFavouredByUser = false
        axios.post('http://localhost:8081/favour', {
          id: this.ratingId,
          userId: this.userId,
          isFavour: false,
          favourType: 1
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
        axios.post('http://localhost:8081/favour', {
          id: this.ratingId,
          userId: this.userId,
          isFavour: true,
          favourType: 1
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
          this.commentRating(id, value)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消评论'
        })
      })
    },
    commentRating (id, comment) {
      axios.post('http://localhost:8081/comments', {
        id: this.ratingId,
        userId: this.userId,
        content: comment,
        commentType: 1
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
    deleteButton () {
      axios.delete('http://localhost:8081/ratings/' + this.ratingId * 1)
        .then(resp => {
          if (resp.status === 200) {
            this.$message.success('课评已删除')
            this.$router.push({path: '/'})
          } else {
            this.$message.error('delete error')
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message)
        })
    },
    refresh () {
      let _this = this
      axios.post('http://localhost:8081/ratings/detail', {
        ratingId: this.ratingId * 1,
        userId: this.userId
      })
        .then(resp => {
          if (resp.status === 200) {
            _this.ratingDetail = resp.data
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
