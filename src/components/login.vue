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
export default {
  name: 'Login',
  data () {
    return {
      // 默认选中读者身份，管理员默认图书馆为邯郸图书馆
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
      this.$message.info('username: ' + this.loginForm.username + '\npassword: ' + this.loginForm.password)
      /**
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this
          let formData = new FormData()
          formData.append('username', this.loginForm.username)
          formData.append('password', this.loginForm.password)
          axios({
            method: 'post',
            url: 'http://139.196.174.46:8081/login',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            data: formData
          })
            .then(resp => {
              if (resp.status === 200) {
                if (resp.data.authorities.indexOf('Reader') > -1 && _this.reader) {
                  this.$store.commit('login', resp.data)
                  // 页面重定向
                  let redirect = decodeURIComponent(this.$route.query.redirect || '/')
                  this.$router.replace({path: redirect})
                  // 存储用户权限的信息
                  localStorage.setItem('authority', resp.data.authorities)
                } else if ((resp.data.authorities.indexOf('Librarian') > -1  || resp.data.authorities.indexOf('Admin') > -1) && !_this.reader) {
                  this.$store.commit('login', resp.data)
                  let redirect = decodeURIComponent(this.$route.query.redirect || '/')
                  this.$router.replace({path: redirect})
                  // 存储管理员登录地点的信息
                  localStorage.setItem('librarianLocation', this.loginForm.radio + '图书馆')
                  localStorage.setItem('authority', resp.data.authorities)
                } else {
                  // 登录身份与账号不符
                  this.$message.error('authorities error')
                }
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
      }) */
    }
  }
}
</script>

<style scoped>

</style>
