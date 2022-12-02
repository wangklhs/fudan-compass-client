<template>
  <el-container id="base_main">
    <el-container>
      <el-header
        style="height: 64px; font-size: 14px; text-align: left; background-color: rgb(48,114,184); color: #ffffff">
        <el-menu class="el-menu-demo" mode="horizontal" :default-active="'0-1'" background-color="rgb(48, 114, 184)"
                 text-color="#fff" active-text-color="#87ddff">
            <span style="float: left; margin-left: 1%; margin-right: 10%">
              <span class="home-title">Fudan Compass</span>
            </span>
          <!--            <el-submenu index="3" class="menu-top-item">-->
          <!--              <template slot="title"><i class="el-icon-user"/>-->
          <!--                <span slot="title"><b>个人中心</b></span>-->
          <!--              </template>-->
          <!--              <el-menu-item index="3-1" class="menu-item">-->
          <!--                <i class="el-icon-s-order" style="margin-left: 20%"/>个人中心-->
          <!--              </el-menu-item>-->
          <!--              <el-menu-item index="3-2" class="menu-item">-->
          <!--                <i class="el-icon-s-order" style="margin-left: 20%"/>退出登录-->
          <!--              </el-menu-item>-->
          <!--            </el-submenu>-->

          <el-button type="success" icon="el-icon-wallet" style="margin-top: -7px; margin-left: 30px"
                     v-on:click="post()"> 发帖
          </el-button>
          <el-dropdown trigger="hover" @command="handleCommand">
            <span class="el-dropdown-link el-input__inner" style="display:block;width:200px;">
                <span style="color:lightslategray">个人中心</span>
            </span>
            <el-dropdown-menu>
              <el-dropdown-item command="personal center">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="float: right; margin-right: 0">
              <span style="position: relative; right: 0">
                <el-divider direction="vertical"/>
                <router-link to="/login" class="home-login-button">Login</router-link>
              </span>
            </span>

        </el-menu>
      </el-header>
      <el-container style="margin-top: 200px">
        <el-aside width="400px">
          <el-card style="height: 200px; margin-top: 20px">
            {{ username }}, 您好
          </el-card>
          <el-card style="margin-top: 20px">
            今日课程表 ( {{ day }} )
            <el-table
              :data="timeTableData"
              style="width: 100%">
              <el-table-column
                prop="index"
                label="节数"
                width="50">
              </el-table-column>
              <el-table-column
                prop="time"
                label="时间"
                width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                label="课程">
              </el-table-column>
            </el-table>
          </el-card>
          <el-card style="height: 200px; margin-top: 20px ">
            公告栏
            <br>
            <br>
            请各位用户自觉遵守用户守则
            <br>
            共同维护网络社区的和谐稳定
          </el-card>
          <el-card style="margin-top: 20px ">
            热门tag
            <br>
            <br>
            <div v-for="popTag in this.popTags" v-bind:key="popTag">
              <el-button type="text" @click="sortByTag(popTag)">
                # {{ popTag }}
              </el-button>
            </div>
            <div>
              <el-button type="text">
                # 清除标签筛选
              </el-button>
            </div>
          </el-card>
        </el-aside>
        <el-container>
          <el-main>
            <el-card>
              复旦各官网链接
              <br>
              <a href="https://jwfw.fudan.edu.cn">
                <el-button type="primary">教务服务(jwfw)</el-button>
              </a>
              <a href="https://jwc.fudan.edu.cn">
                <el-button type="primary">教务处(jwc)</el-button>
              </a>
              <a href="https://ehall.fudan.edu.cn">
                <el-button type="primary">网上办事大厅(ehall)</el-button>
              </a>
              <a href="https://elearning.fudan.edu.cn">
                <el-button type="primary">电子课堂(elearning)</el-button>
              </a>
              <a href="https://xk.fudan.edu.cn">
                <el-button type="primary">选课(xk)</el-button>
              </a>
            </el-card>
            <el-card style="margin-top: 20px">
              <el-col :span="12">
                <div>
                  <el-form ref="form" :model="form">
                    <el-input placeholder="请输入内容" v-model="form.input">
                      <el-button slot="append" icon="el-icon-search" @click="search(form)"> 搜索</el-button>
                    </el-input>
                  </el-form>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <el-select v-model="value" placeholder="根据标签筛选">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search" @click="sortByTag(value)"> 搜索</el-button>
                </div>
              </el-col>
            </el-card>
            <el-card style="margin-top: 20px">
              <el-card v-for="article in this.articleList" v-bind:key="article.article_id">
                发帖人： {{ article.user_id }} &nbsp;&nbsp;&nbsp;&nbsp; 发帖时间：{{ article.create_time }} &nbsp;&nbsp;&nbsp;&nbsp;
                标签： <span v-for="tag in article.tags" v-bind:key="tag"> {{ tag }} &nbsp;&nbsp; </span>
                <el-button type="primary" @click="checkArticleDetail(article.article_id)">查看详情</el-button>
                <br>
                {{ article.content }}
                <br>
                评论数： {{ article.comment_num }} &nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="primary" @click="openCommentBox(article.article_id)">评论</el-button> &nbsp;&nbsp;&nbsp;&nbsp;
                点赞数：{{ article.like_num }} &nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="primary" @click="likeArticle(article.article_id)">点赞</el-button>
                <div>
                  <div v-for="(comment, index) in article.comments" v-bind:key="comment.comment_id">
                    <div v-show="index < 2">
                      {{ comment.user_id + ' ' + comment.create_time }}
                      <br>
                      {{ comment.comment_content }}
                      <el-divider></el-divider>
                    </div>
                  </div>
                </div>
              </el-card>
              <el-pagination
                layout="prev, pager, next"
                :total="articlesCount"
                :page-size="pageSize"
                :hide-on-single-page="true"
                :current-page="pageNo"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'

let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
export default {
  name: 'Home',
  data () {
    return {
      form: {
        input: ''
      },
      username: localStorage.getItem('username') || 'admin123',
      day: weeks[new Date().getDay()],
      options: [{
        value: '生活',
        label: '生活'
      }, {
        value: '饮食',
        label: '饮食'
      }, {
        value: '运动',
        label: '运动'
      }, {
        value: '学习',
        label: '学习'
      }, {
        value: '娱乐',
        label: '娱乐'
      }],
      value: '',
      timeTableData: [
        {
          index: 1,
          time: '8:00 - 8:45',
          name: ''
        },
        {
          index: 2,
          time: '8:55 - 9:40',
          name: ''
        },
        {
          index: 3,
          time: '9:55 - 10:40',
          name: '项目管理'
        },
        {
          index: 4,
          time: '10:50 - 11:35',
          name: '项目管理'
        },
        {
          index: 5,
          time: '11:45 - 12:30',
          name: '项目管理'
        },
        {
          index: 6,
          time: '13:30 - 14:15',
          name: '编译原理'
        },
        {
          index: 7,
          time: '14:25 - 15:10',
          name: '编译原理'
        },
        {
          index: 8,
          time: '15:25 - 16:10',
          name: '编译原理'
        },
        {
          index: 9,
          time: '16:20 - 17:05',
          name: ''
        },
        {
          index: 10,
          time: '17:05 - 18:00',
          name: ''
        },
        {
          index: 11,
          time: '18:30 - 19:15',
          name: '面向对象分析与设计'
        },
        {
          index: 12,
          time: '19:25 - 20:10',
          name: '面向对象分析与设计'
        },
        {
          index: 13,
          time: '20:20 - 21:05',
          name: '面向对象分析与设计'
        },
        {
          index: 14,
          time: '21:15 - 22:00',
          name: ''
        }
      ],
      articlesCount: 2,
      pageNo: 1,
      pageSize: 5,
      articleList: [
        {
          article_id: 1,
          user_id: 19302010001,
          content: '这是一篇文章',
          comment_num: 2,
          like_num: 3,
          create_time: '2022-11-01',
          update_time: '2022-12-01',
          tags: ['生活', '娱乐'],
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
        },
        {
          article_id: 2,
          user_id: 19302010002,
          content: '这是第二篇文章',
          comment_num: 2,
          like_num: 3,
          create_time: '2022-11-02',
          update_time: '2022-12-02',
          tags: ['学习'],
          comments: []
        }
      ],
      popTags: ['娱乐', '饮食', '运动', '生活', '学习']
    }
  },
  created () {
    this.$message.info('created')
    // let _this = this
    // let formData = new FormData()
    // formData.append('pageSize', this.pageSize)
    // formData.append('pageNo', this.pageNo)
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:8081/dashboard',
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   data: formData
    // })
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       _this.articleList = resp.data.articleList
    //       _this.articlesCount = resp.data.articlesCount
    //     } else {
    //       this.$message.error('search error')
    //     }
    //   })
    //   .catch(error => {
    //     this.$message.error(error.response.data.message)
    //   })
  },
  methods: {
    search () {
      this.$message.info('search button clicked')
      let _this = this
      let formData = new FormData()
      formData.append('search_content', this.form.input)
      formData.append('pageSize', this.pageSize)
      formData.append('pageNo', this.pageNo)
      axios({
        method: 'post',
        url: 'http://localhost:8081/search',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then(resp => {
          if (resp.status === 200) {
            _this.articleList = resp.data.articleList
            _this.articlesCount = resp.data.articlesCount
          } else {
            this.$message.error('search error')
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message)
        })
    },
    handleCommand (command) {
      if (command === 'logout') {
        // store.commit('logout');
        this.$message.info('logout')
        localStorage.removeItem('username')
        localStorage.removeItem('authority')
        this.$router.push('/login')
      }
    },
    post () {
      this.$message.info('post')
    },
    sortByTag (tag) {
      this.$message.info('sort by tag : ' + tag)
      let _this = this
      let formData = new FormData()
      formData.append('tag', tag)
      formData.append('pageSize', this.pageSize)
      formData.append('pageNo', this.pageNo)
      axios({
        method: 'post',
        url: 'http://localhost:8081/sortByTag',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then(resp => {
          if (resp.status === 200) {
            _this.articleList = resp.data.articleList
            _this.articlesCount = resp.data.articlesCount
          } else {
            this.$message.error('search error')
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message)
        })
    },
    checkArticleDetail (id) {
      this.$message.info('check article by id : ' + id)
    },
    likeArticle (id) {
      this.$message.info('like article by id : ' + id)
      // 1 id 2 type(1 article 2 comment) 3 isLike
      axios.get('http://localhost:8081/like/' + id + '/' + 1 + '/' + 1).then(function (resp) {
        this.$message.success('操作成功')
      })
    },
    openCommentBox (id) {
      this.$prompt('请输入评论', '评论', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        this.commentArticle(id, value)
        this.$message({
          type: 'success',
          message: '你的评论是: ' + value
        })
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
    },
    handleCurrentChange: function (val) {
      if (val !== this.pageNo) {
        this.pageNo = val
        this.$message.info('pageNo : ' + this.pageNo)
        let _this = this
        let formData = new FormData()
        formData.append('search_content', this.form.input)
        formData.append('pageSize', this.pageSize)
        formData.append('pageNo', this.pageNo)
        axios({
          method: 'post',
          url: 'http://localhost:8081/search',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
          .then(resp => {
            if (resp.status === 200) {
              _this.articleList = resp.data.articleList
              _this.articlesCount = resp.data.articlesCount
            } else {
              this.$message.error('search error')
            }
          })
          .catch(error => {
            this.$message.error(error.response.data.message)
          })
      }
    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  line-height: 50px;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

</style>
