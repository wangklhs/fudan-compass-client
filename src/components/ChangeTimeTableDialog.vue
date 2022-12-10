<template>
  <el-dialog title="修改课程表信息" :visible.sync="visible" :append-to-body="true" width="45%">
    <el-form ref="form" :model="form" label-width="100px" style="padding: 0 50px">
      <el-form-item label="日期">
        <el-select v-model="form.day" placeholder="请选择课程表日期">
          <el-option label="周日" value="Sun"></el-option>
          <el-option label="周一" value="Mon"></el-option>
          <el-option label="周二" value="Tue"></el-option>
          <el-option label="周三" value="Wed"></el-option>
          <el-option label="周四" value="Thu"></el-option>
          <el-option label="周五" value="Fri"></el-option>
          <el-option label="周六" value="Sat"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第1节">
        <el-input v-model="form.courses[0]"></el-input>
      </el-form-item>
      <el-form-item label="第2节">
        <el-input v-model="form.courses[1]"></el-input>
      </el-form-item>
      <el-form-item label="第3节">
        <el-input v-model="form.courses[2]"></el-input>
      </el-form-item>
      <el-form-item label="第4节">
        <el-input v-model="form.courses[3]"></el-input>
      </el-form-item>
      <el-form-item label="第5节">
        <el-input v-model="form.courses[4]"></el-input>
      </el-form-item>
      <el-form-item label="第6节">
        <el-input v-model="form.courses[5]"></el-input>
      </el-form-item>
      <el-form-item label="第7节">
        <el-input v-model="form.courses[6]"></el-input>
      </el-form-item>
      <el-form-item label="第8节">
        <el-input v-model="form.courses[7]"></el-input>
      </el-form-item>
      <el-form-item label="第9节">
        <el-input v-model="form.courses[8]"></el-input>
      </el-form-item>
      <el-form-item label="第10节">
        <el-input v-model="form.courses[9]"></el-input>
      </el-form-item>
      <el-form-item label="第11节">
        <el-input v-model="form.courses[10]"></el-input>
      </el-form-item>
      <el-form-item label="第12节">
        <el-input v-model="form.courses[11]"></el-input>
      </el-form-item>
      <el-form-item label="第13节">
        <el-input v-model="form.courses[12]"></el-input>
      </el-form-item>
      <el-form-item label="第14节">
        <el-input v-model="form.courses[13]"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="success" @click="submitForm('form')" style="width: 150px; background-color: #575757">确认
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChangeTimeTableDialog',
  data () {
    return {
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      visible: false,
      form: {
        day: 'Sun',
        courses: ['', '', '', '', '', '', '', '', '', '', '', '', '', '']
      }
    }
  },
  methods: {
    pop () {
      this.visible = true
    },
    submitForm (formName) {
      this.visible = false
      axios.post('http://localhost:8081/setUserTimeTableByDay', {
        userId: this.userId,
        day: this.form.day,
        courses: this.form.courses
      })
        .then(resp => {
          if (resp.status === 200) {
            this.$message.success('课程表设置成功')
            this.$router.push({path: '/userDetail'})
          } else {
            this.$message.error('post error')
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message)
        })
    }
  }
}
</script>

<style scoped>

</style>
