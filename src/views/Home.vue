<template>
  <el-container id="base_main">
    <el-container>
      <el-header style="height: 64px; width: 100%; font-size: 14px; text-align: left; position: fixed; z-index: 999">
        <el-row style="margin: 15px 0">
          <el-col :span="6" style="margin: 0 1.5%">
            <div style="width: 40px; display: inline-block; vertical-align: middle">
              <img src="static/images/compass.png" alt="" width="30px">
            </div>
            <div style="display: inline-block; vertical-align: middle">
              <h1>Fudan Compass</h1>
            </div>
          </el-col>
          <el-col :span="9" style="text-align: right">
            <el-input placeholder="快来发布一个新的帖子吧！" />
          </el-col>
          <el-col :span="2" style="text-align: left; margin: 0 10px">
            <el-button type="success" icon="el-icon-chat-round"
                       v-on:click="post()"> 发帖
            </el-button>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="2" style="text-align: center; margin-left: 1%">
            <el-dropdown trigger="hover" @command="handleCommand">
              <span class="el-dropdown-link el-input__inner" style="display: block; width: 120px; border-radius: 20px">
                <i class="el-icon-user" /> <span style="color:lightslategray">个人中心</span>
              </span>
              <el-dropdown-menu>
                <el-dropdown-item command="personal center">个人中心</el-dropdown-item>
                <el-dropdown-item command="login">登录</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
        </el-row>

      </el-header>

      <el-container style="margin: 84px 0 20px 0">

        <el-aside width="330px">
          <el-card style="height: 200px">
            <h2>{{ username }}, 您好</h2>
            <el-row style="margin: 25px 0">
              <el-col :span="12">
                <img src="static/images/mar-bustos.jpg" alt=""
                     style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%">
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="11">
                <el-row style="margin: 12px 0"><span class="span-title">帖子数：</span>9</el-row>
                <el-row style="margin: 12px 0"><span class="span-title">评论数：</span>9</el-row>
                <el-row style="margin: 12px 0"><span class="span-title">获赞数：</span>6</el-row>
              </el-col>
            </el-row>

          </el-card>
          <el-card>
            <h2>今日课程表 ( {{ day }} )</h2>
            <br>
            <el-table :data="timeTableData" style="width: 100%">
              <el-table-column prop="index" label="节数" width="45"/>
              <el-table-column prop="time" label="时间" width="105"/>
              <el-table-column prop="name" label="课程"/>
            </el-table>
          </el-card>
        </el-aside>

        <el-main>

          <el-card style="padding: 20px 0">
            <el-col :span="13">
              <el-form ref="form" :model="form">
                <el-input placeholder="请输入内容" v-model="form.input">
                  <el-button slot="append" icon="el-icon-search" @click="search()">搜索</el-button>
                </el-input>
              </el-form>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5">
              <el-select v-model="tagOption" placeholder="标签筛选" style="width: 100%" multiple>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
<!--              <el-button slot="append" icon="el-icon-search" @click="sortByTag(value)"> 搜索</el-button>-->
            </el-col>
            <el-col :span="5">
              <el-select v-model="orderBy" placeholder="排序方式" style="width: 100%">
                <el-option
                  v-for="item in orderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>

          </el-card>

          <div>
            <el-card v-for="article in this.articleList" v-bind:key="article.articleId">
              <el-row>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11" style="text-align: left; white-space: nowrap; overflow: hidden">
                  <span v-if="article.title.length < 21" style="font-size: 16px; font-weight: bolder"> {{ article.title }} </span>
                  <span v-else style="font-size: 16px; font-weight: bolder"> {{ article.title.substr(0, 21) }}... </span>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="6" style="text-align: right">
                  <span v-for="tag in article.tags" v-bind:key="tag" class="comment-tag">{{ tag }}</span>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="3" style="text-align: right">
                  <el-button type="primary" class="details-button" @click="checkArticleDetail(article.articleId)">查看详情</el-button>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
              </el-row>

              <el-row style="margin: 20px 0; text-align: left; line-height: 30px">
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="20">
                  <span v-if="article.content.length < 180"> {{ article.content }} </span>
                  <span v-else> {{ article.content.substr(0, 180) }}... </span>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
              </el-row>

              <el-row>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5" style="text-align: left">
                  <span><i class="el-icon-user" /> &nbsp;&nbsp;{{ article.userId }} </span>
                </el-col>
                <el-col :span="11" style="text-align: left">
                  <span><i class="el-icon-time" /> &nbsp;&nbsp;{{ article.createTime }} </span>
                </el-col>
                <el-col :span="3" style="text-align: right">
                  <span><i class="el-icon-thumb" /> &nbsp;&nbsp;{{ article.likeNum }} </span>
                </el-col>
                <el-col :span="3" style="text-align: right">
                  <span style="margin: 0 20px"><i class="el-icon-chat-line-round" /> &nbsp;&nbsp;{{ article.commentNum }} </span>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
              </el-row>

              <el-row v-for="(comment, index) in article.comments" v-show="index < 3" v-bind:key="comment.commentId">
                <el-divider/>
                <el-col :span="4" style="text-align: right">
                  <i class="el-icon-chat-dot-round" style="font-size: 18px; margin-right: 15px" />
                </el-col>
                <el-col :span="20">
                  <el-row style="text-align: left">
                    <el-col :span="22">
                      <span v-if="comment.commentContent.length < 70"> {{ comment.commentContent }} </span>
                      <span v-else> {{ comment.commentContent.substr(0, 70) }}... </span>
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

            <el-pagination
              layout="prev, pager, next"
              :total="totalCount"
              :page-size="pageSize"
              :hide-on-single-page="true"
              :current-page="pageNo"
              @current-change="handleCurrentChange"/>
          </div>
        </el-main>

        <el-aside width="330px">
          <el-card style="height: 200px">
            <h2>公告栏</h2>
            <br>
            <br>
            请各位用户自觉遵守用户守则
            <br>
            共同维护网络社区的和谐稳定
          </el-card>
          <el-card>
            <h2>复旦各官网快捷通道</h2>
            <br>
            <a href="https://jwfw.fudan.edu.cn">
              <el-button type="primary" class="link-button">教务服务 (JWFW)</el-button>
            </a>
            <a href="https://jwc.fudan.edu.cn">
              <el-button type="primary" class="link-button">教务处 (JWC)</el-button>
            </a>
            <a href="https://ehall.fudan.edu.cn">
              <el-button type="primary" class="link-button">网上办事大厅 (EHALL)</el-button>
            </a>
            <a href="https://elearning.fudan.edu.cn">
              <el-button type="primary" class="link-button">电子课堂 (ELEARNING)</el-button>
            </a>
            <a href="https://xk.fudan.edu.cn">
              <el-button type="primary" class="link-button">选课系统 (XK)</el-button>
            </a>
          </el-card>
          <el-card>
            <h2>热门tag</h2>
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
      orderOptions: [{
        value: 0,
        label: '按发帖时间排序'
      }, {
        value: 1,
        label: '按帖子热度排序'
      }],
      tagOption: [],
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
      totalCount: 5,
      totalPage: 1,
      pageNo: 1,
      pageSize: 5,
      articleList: [
        {
          articleId: 1,
          userId: '19302010001',
          title: '标题qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
          content: '这是一篇很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文章',
          commentNum: 3,
          likeNum: 5,
          createTime: '2022-11-01 12:34:56',
          updateTime: '2022-12-01 12:34:56',
          tags: ['生活', '娱乐'],
          comments: [
            {
              commentId: 1,
              userId: '20302010001',
              commentContent: '第一篇文章的第一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的评论',
              createTime: '2022-11-01 12:34:56',
              updateTime: '2022-11-01 12:34:56'
            },
            {
              commentId: 2,
              userId: '20302010002',
              commentContent: '第一篇文章的第二条没那么长没那么长没那么长没那么长没那么长没那么长没那么长没那么长没那么长没那么长没那么长的评论',
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
          content: '这是第二篇没那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长那么长的文章',
          commentNum: 0,
          likeNum: 2,
          createTime: '2022-11-01 12:34:56',
          updateTime: '2022-12-01 12:34:56',
          tags: ['学习'],
          comments: []
        },
        {
          articleId: 3,
          userId: '19302010002',
          title: '标题3',
          content: '这是第三篇文章',
          commentNum: 0,
          likeNum: 2,
          createTime: '2022-11-01 12:34:56',
          updateTime: '2022-12-01 12:34:56',
          tags: ['学习'],
          comments: []
        },
        {
          articleId: 4,
          userId: '19302010002',
          title: '标题4',
          content: '这是第四篇文章',
          commentNum: 0,
          likeNum: 2,
          createTime: '2022-11-01 12:34:56',
          updateTime: '2022-12-01 12:34:56',
          tags: ['学习'],
          comments: []
        },
        {
          articleId: 5,
          userId: '19302010002',
          title: '标题5',
          content: '这是第五篇文章',
          commentNum: 0,
          likeNum: 2,
          createTime: '2022-11-01 12:34:56',
          updateTime: '2022-12-01 12:34:56',
          tags: ['学习'],
          comments: []
        }
      ],
      articleList1: [],
      articleList2: [],
      popTags: ['娱乐', '饮食', '运动', '生活', '学习'],
      orderBy: []
    }
  },
  created () {
    this.$message.info('created')
    let _this = this
    let formData = new FormData()
    formData.append('pageSize', this.pageSize)
    formData.append('pageNo', this.pageNo)
    formData.append('orderBy', this.orderBy)
    axios({
      method: 'post',
      url: 'http://localhost:8081/getAllArticles',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resp => {
        if (resp.status === 200) {
          _this.articleList = resp.data.articleList
          _this.totalCount = resp.data.totalCount
          _this.totalPage = resp.data.totalPage
        } else {
          this.$message.error('search error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
  },
  methods: {
    search () {
      this.$message.info('search button clicked')
      let _this = this
      let formData = new FormData()
      formData.append('search_content', this.form.input)
      formData.append('pageSize', this.pageSize)
      formData.append('pageNo', this.pageNo)
      formData.append('orderBy', this.orderBy)
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
            _this.totalCount = resp.data.totalCount
            _this.totalPage = resp.data.totalPage
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
      } else if (command === 'login') {
        this.$message.info('login')
        this.$router.push('/login')
      }
    },
    post () {
      // TODO: post page
      this.$message.info('post')
    },
    sortByTag () {
      this.$message.info('sort by tags : ' + this.tagOption)
      let _this = this
      let formData = new FormData()
      formData.append('tags', this.tagOption)
      formData.append('pageSize', this.pageSize)
      formData.append('pageNo', this.pageNo)
      formData.append('orderBy', this.orderBy)
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
            _this.totalCount = resp.data.totalCount
            _this.totalPage = resp.data.totalPage
          } else {
            this.$message.error('search error')
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message)
        })
    },
    checkArticleDetail (id) {
      // this.$message.info('check article by id : ' + id)
      this.$router.push({path: 'articleDetail', query: {articleID: id}})
    },
    // likeArticle (id) {
    //   // TODO 把评论和点赞功能从主页去掉，不太方便判断文章是否被当前用户点赞过
    //   this.$message.info('like article by id : ' + id)
    //   // 1 id 2 type(1 article 2 comment) 3 isLike
    //   axios.get('http://localhost:8081/like/' + id + '/' + 1 + '/' + 1).then(function (resp) {
    //     this.$message.success('操作成功')
    //   })
    // },
    // openCommentBox (id) {
    //   this.$prompt('请输入评论', '评论', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消'
    //   }).then(({value}) => {
    //     this.commentArticle(id, value)
    //     this.$message({
    //       type: 'success',
    //       message: '你的评论是: ' + value
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '取消评论'
    //     })
    //   })
    // },
    // commentArticle (id, comment) {
    //   this.$message.info('comment article by id : ' + id)
    //   let formData = new FormData()
    //   formData.append('comment_content', comment)
    //   formData.append('user_id', this.username)
    //   formData.append('commented_id', id)
    //   formData.append('commented_type', 1)
    //   axios({
    //     method: 'post',
    //     url: 'http://localhost:8081/comment',
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     data: formData
    //   })
    //     .then(resp => {
    //       if (resp.status === 200) {
    //         this.$message.success('评论发表成功')
    //       } else {
    //         this.$message.error('search error')
    //       }
    //     })
    //     .catch(error => {
    //       this.$message.error(error.response.data.message)
    //     })
    // },
    handleCurrentChange: function (val) {
      if (val !== this.pageNo) {
        this.pageNo = val
        this.$message.info('pageNo : ' + this.pageNo)
        let _this = this
        let formData = new FormData()
        formData.append('search_content', this.form.input)
        formData.append('pageSize', this.pageSize)
        formData.append('pageNo', this.pageNo)
        formData.append('orderBy', this.orderBy)
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
              _this.totalCount = resp.data.totalCount
              _this.totalPage = resp.data.totalPage
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
  background-color: #373737;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #DCD0C0;
  color: #333;
  text-align: center;
  margin: 0 15px;
  padding: 0 25px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.el-main {
  background-color: #E4E4DB;
  color: #333;
  line-height: 40px;
  text-align: center;
  margin: 0 15px;
  padding: 0 25px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.el-card {
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.link-button {
  width: 200px;
  margin: 5px 0;
  background-color: #575757;
}

.details-button {
  background-color: #575757;
}

.comment-tag {
  margin: 0 5px;
  padding: 5px 12px;
  color: #C0B283;
  background-color: #FAFAF7;
  font-weight: bolder;
  border: 3px solid #DCD0C0;
  border-radius: 15px;
}

h1 {
  font-size: 28px;
  font-weight: bold;
  color: #C0B283;
}

h2 {
  font-size: 16px;
  font-weight: bold;
  color: #C0B283;
}

.span-title {
  font-size: 14px;
  font-weight: bold;
  color: #C0B283;
}
</style>
