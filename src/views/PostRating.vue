<template>
  <el-container>
    <el-header>
      header
    </el-header>
    <el-main>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" >
        <el-form-item label="标题" :rules="{
      required: true, message: '标题不能为空', trigger: 'blur'
    }">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" :rules="{
      required: true, message: '课程名称不能为空', trigger: 'blur'
    }">
          <el-input v-model="form.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程类型" :rules="{
      required: true, message: '课程类型不能为空', trigger: 'blur'
    }">
          <el-input v-model="form.courseType"></el-input>
        </el-form-item>
        <el-form-item label="相关专业">
          <el-input v-model="form.relatedMajor"></el-input>
        </el-form-item>
        <el-form-item label="打分" prop="score">
          <el-input v-model.number="form.score"></el-input>
        </el-form-item>
        <el-form-item label="正文内容" :rules="{
      required: true, message: '正文内容不能为空', trigger: 'blur'
    }">
          <el-input type="textarea" v-model="form.content" :rows="10"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostRating',
  data () {
    let checkScore = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error('分数不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 0 || value > 10) {
            callback(new Error('请给出0-10分的整数分数'))
          } else {
            callback()
          }
        }
      }, 100)
    }
    return {
      username: localStorage.getItem('username') || '',
      form: {
        title: '',
        content: '',
        courseName: '',
        courseType: '',
        relatedMajor: '',
        score: ''
      },
      ifNew: true,
      rules: {
        score: [
          { validator: checkScore, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ifNew) {
            // let formData = new FormData()
            // formData.append('content', this.form.content)
            // formData.append('userId', this.username)
            // formData.append('title', this.form.title)
            // formData.append('tags', tagsData)
            // axios({
            //   method: 'post',
            //   url: 'http://localhost:8081/postArticle',
            //   headers: {
            //     'Content-Type': 'multipart/form-data'
            //   },
            //   data: formData
            // })
            axios.post('http://localhost:8081/postRating', {
              content: this.form.content,
              userId: this.username,
              title: this.form.title,
              courseName: this.form.courseName,
              courseType: this.form.courseType,
              relatedMajor: this.form.relatedMajor,
              score: this.form.score,
              ifNew: true
            })
              .then(resp => {
                if (resp.status === 200) {
                  this.$message.success('课评发表成功')
                } else {
                  this.$message.error('post error')
                }
              })
              .catch(error => {
                this.$message.error(error.response.data.message)
              })
          } else {
            axios.post('http://localhost:8081/postRating', {
              ratingId: this.$route.query.ratingId,
              content: this.form.content,
              userId: this.username,
              title: this.form.title,
              courseName: this.form.courseName,
              courseType: this.form.courseType,
              relatedMajor: this.form.relatedMajor,
              score: this.form.score,
              ifNew: false
            })
              .then(resp => {
                if (resp.status === 200) {
                  this.$message.success('课评修改成功')
                } else {
                  this.$message.error('post error')
                }
              })
              .catch(error => {
                this.$message.error(error.response.data.message)
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    if (this.$route.query.ratingId != null) {
      this.form.title = 'title'
      this.form.content = 'content'
      this.ifNew = false
      // let _this = this
      // let formData = new FormData()
      // formData.append('user_id', this.username)
      // formData.append('article_id', this.$route.query.articleID)
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
      //       _this.form.title = resp.data.articleDetail.title
      //       _this.form.content = resp.data.articleDetail.content
      //       _this.ifNew = false
      //       _this.tags = resp.data.articleDetail.tags
      //     } else {
      //       this.$message.error('search error')
      //     }
      //   })
      //   .catch(error => {
      //     this.$message.error(error.response.data.message)
      //   })
    }
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
  padding-left: 15%;
  padding-right: 15%;
}
</style>
