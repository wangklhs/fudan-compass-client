<template>
  <el-container id="base_main">
    <el-container>

      <navigation-bar />

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
          <el-tabs type="border-card" v-model="browseType" @tab-click="handleTabClick">

            <el-tab-pane label="论坛" name="article">
              <el-card style="padding: 20px 0; margin-top: 10px">
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
                <el-card v-for="article in this.articleList" v-bind:key="article.id">
                  <el-row>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="11" style="text-align: left; white-space: nowrap; overflow: hidden">
                      <span v-if="article.title.length < 21" style="font-size: 16px; font-weight: bolder"> {{ article.title }} </span>
                      <span v-else style="font-size: 16px; font-weight: bolder"> {{ article.title.substr(0, 21) }}... </span>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="6" style="text-align: right; white-space: nowrap; overflow: hidden">
                      <span v-for="tag in article.tags" v-bind:key="tag" class="comment-tag">{{ tag }}</span>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="3" style="text-align: right">
                      <el-button type="primary" class="details-button" @click="checkArticleDetail(article.id)">查看详情</el-button>
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
                      <span style="margin: 0 20px"><i class="el-icon-chat-line-round" /> &nbsp;&nbsp;{{ article.comments.length }} </span>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                  </el-row>

                  <el-row v-for="(comment, index) in article.comments" v-show="index < 3" v-bind:key="comment.id">
                    <el-divider/>
                    <el-col :span="4" style="text-align: right">
                      <i class="el-icon-chat-dot-round" style="font-size: 18px; margin-right: 15px" />
                    </el-col>
                    <el-col :span="20">
                      <el-row style="text-align: left">
                        <el-col :span="22">
                          <span v-if="comment.content.length < 70"> {{ comment.content }} </span>
                          <span v-else> {{ comment.content.substr(0, 70) }}... </span>
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
            </el-tab-pane>

            <el-tab-pane label="课评" name="rating">

              <el-card style="padding: 20px 0; margin-top: 10px">
                <el-col :span="13">
                  <el-form ref="selectSearchByForm" :model="selectSearchByForm">
                    <el-input placeholder="请输入内容" v-model="selectSearchByForm.input">
                      <el-button slot="append" icon="el-icon-search" @click="searchRating()">搜索</el-button>
                    </el-input>
                  </el-form>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">
                  <el-select v-model="selectSearchBy" placeholder="类型筛选" style="width: 100%">
                    <el-option label="课程名称" value="1"></el-option>
                    <el-option label="课程类型" value="2"></el-option>
                    <el-option label="相关专业" value="3"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="orderBy" placeholder="排序方式" style="width: 100%">
                    <el-option
                      v-for="item in orderRatingOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>

              </el-card>

              <div>
                <el-card v-for="rating in this.ratingList" v-bind:key="rating.ratingId">
                  <el-row>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="5" style="text-align: left; white-space: nowrap; overflow: hidden">
                      <span v-if="rating.title.length < 16" style="font-size: 16px; font-weight: bolder"> {{ rating.title }} </span>
                      <span v-else style="font-size: 16px; font-weight: bolder"> {{ rating.title.substr(0, 16) }}... </span>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="12" style="text-align: right; white-space: nowrap; overflow: hidden">
                      <span class="comment-tag">{{ rating.courseName }}</span>
                      <span class="comment-tag">{{ rating.courseType }}</span>
                      <span class="comment-tag">{{ rating.relatedMajor }}</span>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="3" style="text-align: right">
                      <el-button type="primary" class="details-button" @click="checkRatingDetail(rating.ratingId)">查看详情
                      </el-button>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                  </el-row>

                  <el-row style="margin: 20px 0; text-align: left; line-height: 30px">
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="20">
                      <span v-if="rating.content.length < 180"> {{ rating.content }} </span>
                      <span v-else> {{ rating.content.substr(0, 180) }}... </span>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="5" style="text-align: left">
                      <span><i class="el-icon-user"/> &nbsp;&nbsp;{{ rating.userId }} </span>
                    </el-col>
                    <el-col :span="11" style="text-align: left">
                      <span><i class="el-icon-time"/> &nbsp;&nbsp;{{ rating.createTime }} </span>
                    </el-col>
                    <el-col :span="3" style="text-align: right">
                      <span><i class="el-icon-thumb"/> &nbsp;&nbsp;{{ rating.likeNum }} </span>
                    </el-col>
                    <el-col :span="3" style="text-align: right">
                      <span style="margin: 0 20px"><i class="el-icon-chat-line-round"/> &nbsp;&nbsp;{{ rating.commentNum }} </span>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                  </el-row>

                  <el-row v-for="(comment, index) in rating.comments" v-show="index < 3" v-bind:key="comment.commentId">
                    <el-divider/>
                    <el-col :span="4" style="text-align: right">
                      <i class="el-icon-chat-dot-round" style="font-size: 18px; margin-right: 15px"/>
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
                          <span><i class="el-icon-user"/> &nbsp;&nbsp;{{ comment.userId }} </span>
                        </el-col>
                        <el-col :span="7">
                          <span><i class="el-icon-time"/> &nbsp;&nbsp;{{ comment.createTime }} </span>
                        </el-col>
                        <el-col :span="2">&nbsp;</el-col>
                      </el-row>
                    </el-col>
                  </el-row>

                </el-card>

                <el-pagination
                  layout="prev, pager, next"
                  :total="totalCountRating"
                  :page-size="pageSizeRating"
                  :hide-on-single-page="true"
                  :current-page="pageNoRating"
                  @current-change="handleCurrentChangeRating"/>
              </div>
            </el-tab-pane>

          </el-tabs>
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
          <el-card v-if="browseType==='article'">
            <h2>热门tag</h2>
            <br>
            <div v-for="popTag in this.popTags" v-bind:key="popTag">
              <el-button type="text" @click="sortByTag(popTag)">
                # {{ popTag }}
              </el-button>
            </div>
<!--            <div>-->
<!--              <el-button type="text">-->
<!--                # 清除标签筛选-->
<!--              </el-button>-->
<!--            </div>-->
          </el-card>
          <el-card v-if="browseType==='rating'">
            <h2>热门课程类型</h2>
            <br>
            <div v-for="popCourseType in this.popCourseTypes" v-bind:key="popCourseType">
              <el-button type="text" @click="sortByCourseType(popCourseType)">
                # {{ popCourseType }}
              </el-button>
            </div>
<!--            <div>-->
<!--              <el-button type="text">-->
<!--                # 清除课程类型筛选-->
<!--              </el-button>-->
<!--            </div>-->
          </el-card>
        </el-aside>

      </el-container>
    </el-container>

  </el-container>
</template>

<script>
import axios from 'axios'
import NavigationBar from '@/components/NavigationBar'

let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
export default {
  name: 'Home',
  components: {
    NavigationBar
  },
  data () {
    return {
      title: '',
      form: {
        input: ''
      },
      selectSearchByForm: {
        input: ''
      },
      username: localStorage.getItem('username') || 'admin123',
      userId: localStorage.getItem('userId') || 1,
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
      orderRatingOptions: [{
        value: 0,
        label: '按发布时间排序'
      }, {
        value: 1,
        label: '按课评热度排序'
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
      totalElements: 5,
      totalPages: 1,
      pageNo: 1,
      pageSize: 5,
      totalCountRating: 1,
      totalPageRating: 1,
      pageNoRating: 1,
      pageSizeRating: 5,
      articleList: [
        {
          id: 1,
          userId: '19302010001',
          title: '标题qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
          content: '这是一篇很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文章',
          likeNum: 5,
          createTime: '2022-11-01 12:34:56',
          updateTime: '2022-12-01 12:34:56',
          tags: ['生活', '娱乐'],
          comments: [
            {
              id: 1,
              userId: '20302010001',
              content: '第一篇文章的第一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的评论',
              createTime: '2022-11-01 12:34:56',
              updateTime: '2022-11-01 12:34:56'
            }]
        }
      ],
      ratingList: [
        {
          ratingId: 1,
          userId: '19302010001',
          courseName: '项目管理',
          courseType: '专业必修课',
          relatedMajor: '软件工程',
          score: 5,
          title: '课程评价的标题111111111111',
          content: '这是一篇课程评价',
          commentNum: 1,
          likeNum: 3,
          createTime: '2022-11-01 12:34:56',
          updateTime: '2022-12-01 12:34:56',
          comments: [
            {
              commentId: 1,
              userId: '20302010001',
              commentContent: '第一篇课程评价的第一条评论',
              createTime: '2022-11-01 12:34:56',
              updateTime: '2022-11-01 12:34:56'
            }
          ]
        }
      ],
      popTags: ['娱乐', '饮食', '运动', '生活', '学习'],
      popCourseTypes: ['专业必修', '专业选修', '七大模块', '通识必修', '通识选修'],
      orderBy: 0,
      selectSearchBy: '',
      browseType: 'article'
    }
  },
  created () {
    // this.$message.info('created')
    let _this = this
    // let formData = new FormData()
    // formData.append('pageSize', this.pageSize)
    // formData.append('pageNo', this.pageNo)
    // formData.append('orderBy', this.orderBy)
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:8081/articles/search',
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   data: formData
    // })
    axios.post('http://localhost:8081/articles/search', {
      orderBy: this.orderBy,
      pageNo: this.pageNo - 1,
      pageSize: this.pageSize
    })
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data)
          _this.articleList = resp.data.content
          _this.totalCount = resp.data.totalElements
          _this.totalPage = resp.data.totalPages
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
      // let formData = new FormData()
      // formData.append('searchContent', this.form.input)
      // formData.append('pageSize', this.pageSize)
      // formData.append('pageNo', this.pageNo)
      // formData.append('orderBy', this.orderBy)
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:8081/search',
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   data: formData
      // })
      axios.post('http://localhost:8081/articles/search', {
        orderBy: this.orderBy,
        pageNo: this.pageNo - 1,
        pageSize: this.pageSize,
        searchContent: this.form.input,
        tags: this.tagOption
      })
        .then(resp => {
          if (resp.status === 200) {
            _this.articleList = resp.data.content
            _this.totalCount = resp.data.totalElements
            _this.totalPage = resp.data.totalPages
          } else {
            this.$message.error('search error')
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message)
        })
    },
    sortByTag (tag) {
      this.$message.info('sort by tags : ' + this.tagOption)
      this.tagOption = [tag]
      let _this = this
      // let formData = new FormData()
      // formData.append('tags', this.tagOption)
      // formData.append('pageSize', this.pageSize)
      // formData.append('pageNo', this.pageNo)
      // formData.append('orderBy', this.orderBy)
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:8081/sortByTag',
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   data: formData
      // })
      axios.post('http://localhost:8081/articles/search', {
        orderBy: this.orderBy,
        pageNo: this.pageNo - 1,
        pageSize: this.pageSize,
        tags: [tag]
      })
        .then(resp => {
          if (resp.status === 200) {
            _this.articleList = resp.data.content
            _this.totalCount = resp.data.totalElements
            _this.totalPage = resp.data.totalPages
          } else {
            this.$message.error('tag sort error')
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message)
        })
    },
    searchRating () {
      this.$message.info('search rating button clicked')
      let _this = this
      let formData = new FormData()
      formData.append('searchContent', this.form.input)
      formData.append('pageSize', this.pageSizeRating)
      formData.append('pageNo', this.pageNoRating)
      formData.append('orderBy', this.orderBy)
      if (this.selectSearchBy === 1) {
        formData.append('courseName', this.selectSearchByForm.input)
      } else if (this.selectSearchBy === 2) {
        formData.append('courseType', this.selectSearchByForm.input)
      } else if (this.selectSearchBy === 3) {
        formData.append('relatedMajor', this.selectSearchByForm.input)
      }
      axios({
        method: 'post',
        url: 'http://localhost:8081/sortRatings',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then(resp => {
          if (resp.status === 200) {
            _this.ratingList = resp.data.ratingList
            _this.totalCountRating = resp.data.totalCount
            _this.totalPageRating = resp.data.totalPage
          } else {
            this.$message.error('search error')
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message)
        })
    },
    sortByCourseType (courseType) {
      this.$message.info('sort by courseType : ' + courseType)
      let _this = this
      let formData = new FormData()
      formData.append('courseType', courseType)
      formData.append('pageSize', this.pageSize)
      formData.append('pageNo', this.pageNo)
      formData.append('orderBy', this.orderBy)
      axios({
        method: 'post',
        url: 'http://localhost:8081/sortRatings',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then(resp => {
          if (resp.status === 200) {
            _this.ratingList = resp.data.ratingList
            _this.totalCountRating = resp.data.totalCount
            _this.totalPageRating = resp.data.totalPage
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
    checkRatingDetail (id) {
      // this.$message.info('check article by id : ' + id)
      this.$router.push({path: 'ratingDetail', query: {ratingId: id}})
    },
    handleCurrentChange: function (val) {
      if (val !== this.pageNo) {
        this.pageNo = val
        this.$message.info('pageNo : ' + this.pageNo)
        this.search()
      }
    },
    handleCurrentChangeRating: function (val) {
      if (val !== this.pageNoRating) {
        this.pageNoRating = val
        this.$message.info('pageNo : ' + this.pageNoRating)
        this.searchRating()
      }
    },
    handleTabClick (tab, event) {
      if (this.browseType === 'article') {
        this.$message.info('browse article')
      } else if (this.browseType === 'rating') {
        this.$message.info('browse rating')
      }
    }
  }
}

</script>

<style scoped>
.link-button {
  width: 200px;
  margin: 5px 0;
  background-color: #575757;
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
