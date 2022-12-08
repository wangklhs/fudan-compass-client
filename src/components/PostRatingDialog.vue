<template>
  <el-dialog title="发布课评" :visible.sync="visible" :append-to-body="true" width="45%">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
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
  </el-dialog>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostRatingDialog',
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
      visible: false,
      username: localStorage.getItem('username') || '',
      form: {
        title: '',
        content: '',
        courseName: '',
        courseType: '',
        relatedMajor: '',
        score: ''
      },
      rules: {
        score: [
          {validator: checkScore, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    pop (title) {
      this.visible = true
      this.form.title = title
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
