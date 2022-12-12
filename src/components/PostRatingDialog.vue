<template>
  <el-dialog title="发布课评" :visible.sync="visible" :append-to-body="true" width="45%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="padding: 0 50px">
      <el-form-item label="标题" :rules="{required: true, message: '标题不能为空', trigger: 'blur'}">
        <el-input v-model="form.title" maxlength="30" show-word-limit/>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="课程名称" :rules="{required: true, message: '课程名称不能为空', trigger: 'blur'}">
            <el-input v-model="form.courseName" maxlength="20" show-word-limit/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="课程类型" :rules="{required: true, message: '课程类型不能为空', trigger: 'blur'}">
            <el-input v-model="form.courseType" maxlength="10" show-word-limit/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="相关专业">
            <el-input v-model="form.relatedMajor" maxlength="10" show-word-limit/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="打分" prop="score" :rules="{required: true, message: '分数不能为空', trigger: 'blur'}">
            <el-slider
              v-model="form.score"
              :max="10"
              :step="1"
              show-stops>
            </el-slider>
            <!--            <el-input v-model.number="form.score" />-->
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="正文内容" :rules="{required: true, message: '正文内容不能为空', trigger: 'blur'}">
        <el-input type="textarea" v-model="form.content" :rows="5"/>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="success" @click="submitForm('form')" style="width: 150px; background-color: #575757">发布
        </el-button>
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
      userId: localStorage.getItem('userId') * 1,
      username: localStorage.getItem('username'),
      form: {
        title: '',
        content: '',
        courseName: '',
        courseType: '',
        relatedMajor: '',
        score: 0
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
      this.visible = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8081/ratings', {
            content: this.form.content,
            userId: this.userId,
            title: this.form.title,
            courseName: this.form.courseName,
            courseType: this.form.courseType,
            relatedMajor: this.form.relatedMajor,
            score: this.form.score
          })
            .then(resp => {
              if (resp.status === 200) {
                this.$message.success('课评发表成功')
                this.$router.push({path: '/'})
                location.reload()
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
