<template>
  <el-container>
    <el-container>

      <navigation-bar/>

      <el-container style="margin: 84px 0 20px 0">
        <el-aside width="35%">
          <el-tabs type="border-card" v-model="browseType" @tab-click="handleTabClick">
            <el-tab-pane label="收藏文章" name="article">
              <el-card v-for="article in this.favourArticles" v-bind:key="article.articleId">
                {{ article.title }} <br>
                {{ article.createTime.substr(0, 10) }}
<!--                发帖人： {{ article.userId }} &nbsp;&nbsp;&nbsp;&nbsp; 发帖时间：{{ article.createTime }} &nbsp;&nbsp;&nbsp;&nbsp;-->
                标签： <span v-for="tag in article.tags" v-bind:key="tag"> {{ tag }} &nbsp;&nbsp; </span>
                <el-button type="primary" @click="checkArticleDetail(article.articleId)">查看详情</el-button>
                <br>
                {{ article.content }}
                <br>
                点赞数：{{ article.likeNum }} &nbsp;&nbsp;&nbsp;&nbsp;
                评论数： {{ article.commentNum }} &nbsp;&nbsp;&nbsp;&nbsp;
              </el-card>
            </el-tab-pane>

            <el-tab-pane label="收藏课评" name="rating">
              <el-card v-for="rating in this.favourRatings" v-bind:key="rating.ratingId">
                {{ rating.title }} <br>
                {{ rating.createTime.substr(0, 10) }}
<!--                发帖人： {{ rating.userId }} &nbsp;&nbsp;&nbsp;&nbsp; 发帖时间：{{ rating.createTime }} &nbsp;&nbsp;&nbsp;&nbsp;-->
                相关课程： {{ rating.courseName }} &nbsp;&nbsp;&nbsp;&nbsp; 课程类型： {{ rating.courseType }} &nbsp;&nbsp;&nbsp;&nbsp;
                相关专业： {{ rating.relatedMajor }} &nbsp;&nbsp;&nbsp;&nbsp; 打分： {{ rating.score }} &nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="primary" @click="checkRatingDetail(rating.ratingId)">查看详情</el-button>
                <br>
                {{ rating.content }}
                <br>
                点赞数：{{ rating.likeNum }} &nbsp;&nbsp;&nbsp;&nbsp;
                评论数： {{ rating.commentNum }} &nbsp;&nbsp;&nbsp;&nbsp;
              </el-card>
            </el-tab-pane>
          </el-tabs>

        </el-aside>

        <el-main>
          <el-card>
            用户名:&nbsp;{{ username }}
            <br>
            所在专业:&nbsp;{{ major }}
            <el-button type="primary" @click="openChangeMajorBox">修改专业信息</el-button>
          </el-card>

          <el-card>
            <div>
              课程表
              <el-button type="primary" @click="openChangeTimeTableBox">修改课程表信息</el-button>
            </div>
            <el-row>
              <el-table :data="timeTableSchedule" stripe>
                <el-table-column prop="index" label="节数" width="50" />
                <el-table-column prop="time" label="时间" width="100" />
                <el-table-column label="周日" width="90">
                  <template slot-scope="scope">
                    <span>{{ timeTable7[scope.$index] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="周一" width="90">
                  <template slot-scope="scope">
                    <span>{{ timeTable1[scope.$index] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="周二" width="90">
                  <template slot-scope="scope">
                    <span>{{ timeTable2[scope.$index] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="周三" width="90">
                  <template slot-scope="scope">
                    <span>{{ timeTable3[scope.$index] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="周四" width="90">
                  <template slot-scope="scope">
                    <span>{{ timeTable4[scope.$index] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="周五" width="90">
                  <template slot-scope="scope">
                    <span>{{ timeTable5[scope.$index] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="周六" width="90">
                  <template slot-scope="scope">
                    <span>{{ timeTable6[scope.$index] }}</span>
                  </template>
                </el-table-column>
              </el-table>
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
      timeTable1: ['', '', '1-3', '', '', '', '', '', '', '', '', '', '', ''],
      timeTable2: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      timeTable3: ['', '', '', '3-4', '', '', '', '', '', '', '', '', '', ''],
      timeTable4: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      timeTable5: ['', '', '项目管理', '项目管理', '项目管理', '编译原理', '编译原理', '编译原理', '', '', '面向对象分析与设计', '面向对象分析与设计', '面向对象分析与设计', ''],
      timeTable6: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      timeTable7: ['', '', '', '', '7-5', '', '', '', '', '', '', '', '', '']
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
    // axios.post('http://localhost:8081/getUserTimeTableByDay', {
    //   userId: this.userId,
    //   day: 'Mon'
    // })
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       // console.log(resp.data)
    //       _this.timeTable1 = resp.data.timeTable
    //     } else {
    //       this.$message.error('error')
    //     }
    //   })
    //   .catch(error => {
    //     this.$message.error(error.response.data.message)
    //   })
    // axios.post('http://localhost:8081/getUserTimeTableByDay', {
    //   userId: this.userId,
    //   day: 'Tue'
    // })
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       // console.log(resp.data)
    //       _this.timeTable2 = resp.data.timeTable
    //     } else {
    //       this.$message.error('error')
    //     }
    //   })
    //   .catch(error => {
    //     this.$message.error(error.response.data.message)
    //   })
    // axios.post('http://localhost:8081/getUserTimeTableByDay', {
    //   userId: this.userId,
    //   day: 'Wed'
    // })
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       // console.log(resp.data)
    //       _this.timeTable3 = resp.data.timeTable
    //     } else {
    //       this.$message.error('error')
    //     }
    //   })
    //   .catch(error => {
    //     this.$message.error(error.response.data.message)
    //   })
    // axios.post('http://localhost:8081/getUserTimeTableByDay', {
    //   userId: this.userId,
    //   day: 'Thu'
    // })
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       // console.log(resp.data)
    //       _this.timeTable4 = resp.data.timeTable
    //     } else {
    //       this.$message.error('error')
    //     }
    //   })
    //   .catch(error => {
    //     this.$message.error(error.response.data.message)
    //   })
    // axios.post('http://localhost:8081/getUserTimeTableByDay', {
    //   userId: this.userId,
    //   day: 'Fri'
    // })
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       // console.log(resp.data)
    //       _this.timeTable5 = resp.data.timeTable
    //     } else {
    //       this.$message.error('error')
    //     }
    //   })
    //   .catch(error => {
    //     this.$message.error(error.response.data.message)
    //   })
    // axios.post('http://localhost:8081/getUserTimeTableByDay', {
    //   userId: this.userId,
    //   day: 'Sat'
    // })
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       // console.log(resp.data)
    //       _this.timeTable6 = resp.data.timeTable
    //     } else {
    //       this.$message.error('error')
    //     }
    //   })
    //   .catch(error => {
    //     this.$message.error(error.response.data.message)
    //   })
    // axios.post('http://localhost:8081/getUserTimeTableByDay', {
    //   userId: this.userId,
    //   day: 'Sun'
    // })
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       // console.log(resp.data)
    //       _this.timeTable7 = resp.data.timeTable
    //     } else {
    //       this.$message.error('error')
    //     }
    //   })
    //   .catch(error => {
    //     this.$message.error(error.response.data.message)
    //   })
  }
}
</script>

<style scoped>

</style>
