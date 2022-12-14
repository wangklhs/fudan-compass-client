<template>
  <el-container>
    <el-container>

      <navigation-bar/>

      <el-container style="margin: 84px 0 20px 0">
        <el-aside width="35%">
          <el-tabs type="border-card" v-model="browseType" @tab-click="handleTabClick">
            <el-tab-pane label="收藏文章" name="article">
              <el-empty v-if="this.favourArticles.length === 0" description="您还未收藏任何文章"></el-empty>
              <el-card v-for="article in this.favourArticles" v-bind:key="article.articleId">
                <el-row>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="15" style="text-align: left; white-space: nowrap; overflow: hidden">
                    <span v-if="article.title.length < 14"
                          style="font-size: 16px; font-weight: bolder"> {{ article.title }} </span>
                    <span v-else style="font-size: 16px; font-weight: bolder"> {{ article.title.substr(0, 14) }}... </span>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="6">
                    <el-button type="primary" class="details-button2" @click="checkArticleDetail(article.id)">查看详情</el-button>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                </el-row>

                <el-row style="margin: 20px 0; text-align: left; line-height: 30px">
                  <el-col :span="2">&nbsp;</el-col>
                  <el-col :span="20">
                    <span v-if="article.content.length < 50"> {{ article.content }} </span>
                    <span v-else> {{ article.content.substr(0, 50) }}... </span>
                  </el-col>
                  <el-col :span="2">&nbsp;</el-col>
                </el-row>

                <el-row>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="12" style="text-align: left">
                    <span><i class="el-icon-date"/> &nbsp;&nbsp;{{ article.createTime.substr(0, 10) }} </span>
                  </el-col>
                  <el-col :span="5" style="text-align: right">
                    <span><i class="el-icon-thumb"/> &nbsp;&nbsp;{{ article.likeNum }} </span>
                  </el-col>
                  <el-col :span="5" style="text-align: right">
                      <span style="margin: 0 20px"><i
                        class="el-icon-chat-line-round"/> &nbsp;&nbsp;{{ article.comments.length }} </span>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                </el-row>
              </el-card>
            </el-tab-pane>

            <el-tab-pane label="收藏课评" name="rating">
              <el-empty v-if="this.favourRatings.length === 0" description="您还未收藏任何课评"></el-empty>
              <el-card v-for="rating in this.favourRatings" v-bind:key="rating.ratingId">
                <el-row>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="15" style="text-align: left; white-space: nowrap; overflow: hidden">
                    <span v-if="rating.title.length < 14"
                          style="font-size: 16px; font-weight: bolder"> {{ rating.title }} </span>
                    <span v-else style="font-size: 16px; font-weight: bolder"> {{ rating.title.substr(0, 14) }}... </span>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="6">
                    <el-button type="primary" class="details-button2" @click="checkRatingDetail(rating.id)">查看详情</el-button>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                </el-row>

                <el-row style="margin: 20px 0; text-align: left; line-height: 30px">
                  <el-col :span="2">&nbsp;</el-col>
                  <el-col :span="20">
                    <span v-if="rating.content.length < 50"> {{ rating.content }} </span>
                    <span v-else> {{ rating.content.substr(0, 50) }}... </span>
                  </el-col>
                  <el-col :span="2">&nbsp;</el-col>
                </el-row>

                <el-row style="margin: 10px 0">
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="11" style="text-align: left">
                    <span><i class="el-icon-data-board"/> &nbsp;&nbsp;{{ rating.courseName }} </span>
                  </el-col>
                  <el-col :span="11" style="text-align: right">
                    <span style="margin: 0 18px"><i class="el-icon-pie-chart"/> &nbsp;&nbsp;{{ rating.score }} </span>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                </el-row>

                <el-row>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="12" style="text-align: left">
                    <span><i class="el-icon-date"/> &nbsp;&nbsp;{{ rating.createTime.substr(0, 10) }} </span>
                  </el-col>
                  <el-col :span="5" style="text-align: right">
                    <span><i class="el-icon-thumb"/> &nbsp;&nbsp;{{ rating.likeNum }} </span>
                  </el-col>
                  <el-col :span="5" style="text-align: right">
                      <span style="margin: 0 20px"><i
                        class="el-icon-chat-line-round"/> &nbsp;&nbsp;{{ rating.comments.length }} </span>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                </el-row>
              </el-card>
            </el-tab-pane>
          </el-tabs>

        </el-aside>

        <el-main>
          <el-card>
            <el-row style="margin-bottom: 30px">
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="22" style="text-align: left">
                <h1>用户信息</h1>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
            </el-row>

            <el-row style="margin-bottom: 30px">
              <el-col :span="12">
                <el-row>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="11" style="text-align: left">
                    <h2>所在专业:&nbsp;&nbsp;&nbsp; <span style="color: #bbb">{{ major }}</span></h2>
                  </el-col>
                  <el-col :span="11" style="text-align: right">
                    <el-button type="primary" class="details-button" @click="openChangeMajorBox">修改专业信息</el-button>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                </el-row>
                <el-row>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="22" style="text-align: left">
                    <h2>用户名:&nbsp;&nbsp;&nbsp; <span style="color: #bbb">{{ username }}</span></h2>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                </el-row>
                <el-row>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="22" style="text-align: left">
                    <h2>帖子数:&nbsp;&nbsp;&nbsp; <span style="color: #bbb">{{ userInfo.postCount }}</span></h2>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                </el-row>
                <el-row>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="22" style="text-align: left">
                    <h2>评论数:&nbsp;&nbsp;&nbsp; <span style="color: #bbb">{{ userInfo.commentCount }}</span></h2>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                </el-row>
                <el-row>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="22" style="text-align: left">
                    <h2>获赞数:&nbsp;&nbsp;&nbsp; <span style="color: #bbb">{{ userInfo.likeCount }}</span></h2>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                </el-row>
              </el-col>

              <el-col :span="12">
                <img src="static/images/mar-bustos.jpg" alt=""
                     style="width: 180px; height: 180px; object-fit: cover; border-radius: 50%">
                <div style="margin-top: 0px; margin-left: 0">
                  <span style="color: #bbb; font-size: 12px; font-family: 'OCR A Extended'">Fudan-Compass Premium Member</span>
                </div>
              </el-col>
            </el-row>
          </el-card>

          <el-card>
            <el-row style="margin-bottom: 30px">
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="11" style="text-align: left">
                <h1>课程表</h1>
              </el-col>
              <el-col :span="11" style="text-align: right">
                <el-button type="primary" class="details-button" @click="openChangeTimeTableBox">修改课程表信息</el-button>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
            </el-row>

            <el-row>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="22">
                <el-table :data="timeTableSchedule" stripe border highlight-current-row style="border-radius: 10px">
                  <el-table-column prop="index" label="节数" width="60" />
                  <el-table-column prop="time" label="时间" width="95" />
                  <el-table-column label="周日" width="80">
                    <template slot-scope="scope">
                      <span>{{ timeTable7[scope.$index] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="周一" width="80">
                    <template slot-scope="scope">
                      <span>{{ timeTable1[scope.$index] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="周二" width="80">
                    <template slot-scope="scope">
                      <span>{{ timeTable2[scope.$index] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="周三" width="80">
                    <template slot-scope="scope">
                      <span>{{ timeTable3[scope.$index] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="周四" width="80">
                    <template slot-scope="scope">
                      <span>{{ timeTable4[scope.$index] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="周五" width="80">
                    <template slot-scope="scope">
                      <span>{{ timeTable5[scope.$index] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="周六" width="80">
                    <template slot-scope="scope">
                      <span>{{ timeTable6[scope.$index] }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
            </el-row>
          </el-card>

        </el-main>

      </el-container>

    </el-container>

    <change-time-table-dialog ref="changeTimeTableDlg"/>
  </el-container>
</template>

<script>
import axios from 'axios'
import NavigationBar from '@/components/NavigationBar'
import ChangeTimeTableDialog from '@/components/ChangeTimeTableDialog'

export default {
  name: 'UserDetail',
  components: {
    NavigationBar,
    ChangeTimeTableDialog
  },
  data () {
    return {
      userId: localStorage.getItem('userId') * 1,
      username: localStorage.getItem('username'),
      major: '',
      browseType: 'article',
      favourArticles: [
        {
          id: 1,
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
        }
      ],
      favourRatings: [
        {
          id: 1,
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
      ],
      timeTable: [
        {
          index: 1,
          time: '8:00 - 8:45',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '',
          Sat: ''
        },
        {
          index: 2,
          time: '8:55 - 9:40',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '',
          Sat: ''
        }, {
          index: 3,
          time: '9:55 - 10:40',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '项目管理',
          Sat: ''
        }, {
          index: 4,
          time: '10:50 - 11:35',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '项目管理',
          Sat: ''
        }, {
          index: 5,
          time: '11:45 - 12:30',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '项目管理',
          Sat: ''
        }, {
          index: 6,
          time: '13:30 - 14:15',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '编译原理',
          Sat: ''
        }, {
          index: 7,
          time: '14:25 - 15:10',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '编译原理',
          Sat: ''
        }, {
          index: 8,
          time: '15:25 - 16:10',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '编译原理',
          Sat: ''
        }, {
          index: 9,
          time: '16:20 - 17:05',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '',
          Sat: ''
        }, {
          index: 10,
          time: '17:05 - 18:00',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '',
          Sat: ''
        }, {
          index: 11,
          time: '18:30 - 19:15',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '面向对象分析与设计',
          Sat: ''
        }, {
          index: 12,
          time: '19:25 - 20:10',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '面向对象分析与设计',
          Sat: ''
        }, {
          index: 13,
          time: '20:20 - 21:05',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '面向对象分析与设计',
          Sat: ''
        }, {
          index: 14,
          time: '21:15 - 22:00',
          Sun: '',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: '',
          Sat: ''
        }
      ],
      timeTableSchedule: [
        {
          index: 1,
          time: '8:00 - 8:45'
        },
        {
          index: 2,
          time: '8:55 - 9:40'
        },
        {
          index: 3,
          time: '9:55 - 10:40'
        },
        {
          index: 4,
          time: '10:50 - 11:35'
        },
        {
          index: 5,
          time: '11:45 - 12:30'
        },
        {
          index: 6,
          time: '13:30 - 14:15'
        },
        {
          index: 7,
          time: '14:25 - 15:10'
        },
        {
          index: 8,
          time: '15:25 - 16:10'
        },
        {
          index: 9,
          time: '16:20 - 17:05'
        },
        {
          index: 10,
          time: '17:05 - 18:00'
        },
        {
          index: 11,
          time: '18:30 - 19:15'
        },
        {
          index: 12,
          time: '19:25 - 20:10'
        },
        {
          index: 13,
          time: '20:20 - 21:05'
        },
        {
          index: 14,
          time: '21:15 - 22:00'
        }
      ],
      timeTable1: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      timeTable2: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      timeTable3: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      timeTable4: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      timeTable5: ['', '', '项目管理', '项目管理', '项目管理', '编译原理', '编译原理', '编译原理', '', '', '面向对象分析与设计', '面向对象分析与设计', '面向对象分析与设计', ''],
      timeTable6: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      timeTable7: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      userInfo: {
        postCount: 0,
        commentCount: 0,
        likeCount: 0
      }
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
      axios.post('http://localhost:8081/user/setUserMajor', {
        userId: this.userId,
        major: this.major
      })
        .then(resp => {
          if (resp.status === 200) {
            this.$message.success('专业修改成功')
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
    },
    openChangeTimeTableBox () {
      this.$refs.changeTimeTableDlg.pop()
    }
  },
  created () {
    let _this = this
    axios.get('http://localhost:8081/user/getUserMajor?userId=' + this.userId)
      .then(resp => {
        if (resp.status === 200) {
          _this.major = resp.data
        } else {
          this.$message.error('error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
    axios.get('http://localhost:8081/user/getUserFavourArticles?userId=' + this.userId)
      .then(resp => {
        if (resp.status === 200) {
          _this.favourArticles = resp.data
        } else {
          this.$message.error('error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
    axios.get('http://localhost:8081/user/getUserFavourRatings?userId=' + this.userId)
      .then(resp => {
        if (resp.status === 200) {
          _this.favourRatings = resp.data
        } else {
          this.$message.error('error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
    axios.get('http://localhost:8081/user/getInfo?userId=' + this.userId)
      .then(resp => {
        if (resp.status === 200) {
          _this.userInfo = resp.data.data
        } else {
          this.$message.error('error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
    let formData = new FormData()
    formData.append('userId', this.userId)
    formData.append('day', 'Mon')
    axios({
      method: 'post',
      url: 'http://localhost:8081/user/getUserTimeTableByDay',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resp => {
        if (resp.status === 200) {
          _this.timeTable1 = resp.data.data.timeTable
        } else {
          this.$message.error('error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
    formData = new FormData()
    formData.append('userId', this.userId)
    formData.append('day', 'Tue')
    axios({
      method: 'post',
      url: 'http://localhost:8081/user/getUserTimeTableByDay',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resp => {
        if (resp.status === 200) {
          _this.timeTable2 = resp.data.data.timeTable
        } else {
          this.$message.error('error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
    formData = new FormData()
    formData.append('userId', this.userId)
    formData.append('day', 'Wed')
    axios({
      method: 'post',
      url: 'http://localhost:8081/user/getUserTimeTableByDay',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resp => {
        if (resp.status === 200) {
          _this.timeTable3 = resp.data.data.timeTable
        } else {
          this.$message.error('error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
    formData = new FormData()
    formData.append('userId', this.userId)
    formData.append('day', 'Thu')
    axios({
      method: 'post',
      url: 'http://localhost:8081/user/getUserTimeTableByDay',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resp => {
        if (resp.status === 200) {
          _this.timeTable4 = resp.data.data.timeTable
        } else {
          this.$message.error('error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
    formData = new FormData()
    formData.append('userId', this.userId)
    formData.append('day', 'Fri')
    axios({
      method: 'post',
      url: 'http://localhost:8081/user/getUserTimeTableByDay',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resp => {
        if (resp.status === 200) {
          _this.timeTable5 = resp.data.data.timeTable
        } else {
          this.$message.error('error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
    formData = new FormData()
    formData.append('userId', this.userId)
    formData.append('day', 'Sat')
    axios({
      method: 'post',
      url: 'http://localhost:8081/user/getUserTimeTableByDay',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resp => {
        if (resp.status === 200) {
          _this.timeTable6 = resp.data.data.timeTable
        } else {
          this.$message.error('error')
        }
      })
      .catch(error => {
        this.$message.error(error.response.data.message)
      })
    formData = new FormData()
    formData.append('userId', this.userId)
    formData.append('day', 'Sun')
    axios({
      method: 'post',
      url: 'http://localhost:8081/user/getUserTimeTableByDay',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(resp => {
        if (resp.status === 200) {
          _this.timeTable7 = resp.data.data.timeTable
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
h1 {
  font-size: 24px;
  font-weight: bold;
  color: #C0B283;
}

h2 {
  font-size: 16px;
  font-weight: bold;
  color: #C0B283;
}

.details-button {
  width: 120px;
  background-color: #575757;
}

.details-button2 {
  height: 30px;
  padding: 0 20px;
  background-color: #575757;
}
</style>
