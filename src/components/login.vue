<template>
<div>
  <el-container id="div-form" autofocus="autofocus">
    <el-form :model="loginForm"
             :rules="rules"
             class="login_container"
             label-position="left"
             label-width="0px"
             v-loading="loading"
             :ref="loginForm"
             size="small"
             style="z-index: 10">
      <h3 class="login_title">Login</h3>
      <br>
      <el-row>
        <el-col :span="22" style="margin-left: 4.5%">
          <el-form-item prop="username">
            <el-input type="text"
                      v-model="loginForm.username"
                      auto-complete="off"
                      placeholder="Username"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" style="margin-left: 4.5%">
          <el-form-item prop="password">
            <el-input type="password"
                      v-model="loginForm.password"
                      auto-complete="off"
                      placeholder="Password"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <div class="details-btn-container">
          <div class="details-btn">
            <a v-on:click="login(loginForm)">Login</a>
          </div>
        </div>
      </el-form-item>

    </el-form>
  </el-container>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true, message: '', trigger: 'blur'}],
        password: [{required: true, message: '', trigger: 'blur'}]
      },
      loading: false
    }
  },

  methods: {
    login (formName) {
      // this.$message.info('username: ' + this.loginForm.username + '\npassword: ' + this.loginForm.password)
      // this.$router.replace('/')

      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this
          let formData = new FormData()
          formData.append('username', this.loginForm.username)
          formData.append('password', this.loginForm.password)
          axios({
            method: 'post',
            url: 'http://localhost:8081/login',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: formData
          })
            .then(resp => {
              if (resp.status === 200) {
                localStorage.setItem('authority', resp.data.authority)
                localStorage.setItem('username', _this.loginForm.username)
                this.$router.replace('/')
              } else {
                this.$message.error('login error')
              }
            })
            .catch(error => {
              this.$message.error(error.response.data.message)
            })
        } else {
          this.$message.error('wrong submit')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
