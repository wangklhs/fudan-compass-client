<template>
  <div class="login">
    <el-form class="form" @submit.native.prevent>
      <h1>Fudan Compass</h1>
      <el-form-item>
        <el-input
          v-model="username"
          placeholder="Username"
          autocomplete="off"
          class="input"
          prefix-icon="el-icon-user"/>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="password"
          placeholder="Password"
          autocomplete="off"
          show-password
          class="input"
          prefix-icon="el-icon-unlock"/>
      </el-form-item>
      <el-form-item size="large">
        <el-button
          class="button"
          size="medium"
          @click="Login"
          native-type="submit"
          type="primary">
          <span class="button-span">Login</span>
        </el-button>
      </el-form-item>
      <router-link to="register"><a>New User?</a></router-link>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    login () {
      // this.err = null
      // this.$auth({ username: this.username, password: this.password })
      //   .then(() => this.$router.replace('/'))
      //   .catch((err) => {
      //     console.log(err.message)
      //     if (err.response) {
      //       this.err =
      //         err.response.status !== 400
      //           ? err.response.statusText
      //           : 'Invalid credentials'
      //     } else {
      //       this.err = err.message
      //     }
      //   })
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 26px;
  font-weight: 600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: rgb(225, 225, 245);
  padding: 25px;
}
.button-span {
  font-size: 16px;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
a {
  font-size: 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: rgb(235, 235, 255);
  text-align: right;
  text-decoration-line: none;
}

.login {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: transparent url('https://images.unsplash.com/photo-1549556289-9706946b9c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80') no-repeat fixed;
  background-size: 100% 100%;
}
.form {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 500px;
  padding: 40px 50px;
  margin-bottom: 20px;
  border-radius: 18px;
  text-align: center;
  z-index: 1;
  background: inherit;
  overflow: hidden;
}

.form::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  width: calc(100% + 20px);
  /* + 两边各有一个空格  否则 无效*/
  height: calc(100% + 20px);
  background: inherit;
  box-shadow: 0 0 0 200px rgba(255, 255, 255, 0.25) inset;
  z-index: -1;
  filter: blur(6px);
  overflow: hidden;
}

.button {
  width: 100%;
}

/deep/ input:-webkit-autofill,
/deep/ input:-webkit-autofill:hover,
/deep/ input:-webkit-autofill:focus,
/deep/ input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: #3d5245 !important;
}

</style>

<!--<template>-->
<!--<div>-->
<!--  <el-container id="div-form" autofocus="autofocus">-->
<!--    <el-form :model="loginForm"-->
<!--             :rules="rules"-->
<!--             class="login_container"-->
<!--             label-position="left"-->
<!--             label-width="0px"-->
<!--             v-loading="loading"-->
<!--             :ref="loginForm"-->
<!--             size="small"-->
<!--             style="z-index: 10">-->
<!--      <h3 class="login_title">Login</h3>-->
<!--      <br>-->
<!--      <el-row>-->
<!--        <el-col :span="22" style="margin-left: 4.5%">-->
<!--          <el-form-item prop="username">-->
<!--            <el-input type="text"-->
<!--                      v-model="loginForm.username"-->
<!--                      auto-complete="off"-->
<!--                      placeholder="Username"/>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        <el-col :span="22" style="margin-left: 4.5%">-->
<!--          <el-form-item prop="password">-->
<!--            <el-input type="password"-->
<!--                      v-model="loginForm.password"-->
<!--                      auto-complete="off"-->
<!--                      placeholder="Password"/>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-form-item>-->
<!--        <div class="details-btn-container">-->
<!--          <div class="details-btn">-->
<!--            <a v-on:click="login(loginForm)">Login</a>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-form-item>-->

<!--    </el-form>-->
<!--  </el-container>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'Login',-->
<!--  data () {-->
<!--    return {-->
<!--      // 默认选中读者身份，管理员默认图书馆为邯郸图书馆-->
<!--      loginForm: {-->
<!--        username: '',-->
<!--        password: ''-->
<!--      },-->
<!--      rules: {-->
<!--        username: [{required: true, message: '', trigger: 'blur'}],-->
<!--        password: [{required: true, message: '', trigger: 'blur'}]-->
<!--      },-->
<!--      loading: false-->
<!--    }-->
<!--  },-->

<!--  methods: {-->
<!--    login (formName) {-->
<!--      this.$message.info('username: ' + this.loginForm.username + '\npassword: ' + this.loginForm.password)-->
<!--      /**-->
<!--      this.$refs[formName].validate(valid => {-->
<!--        if (valid) {-->
<!--          let _this = this-->
<!--          let formData = new FormData()-->
<!--          formData.append('username', this.loginForm.username)-->
<!--          formData.append('password', this.loginForm.password)-->
<!--          axios({-->
<!--            method: 'post',-->
<!--            url: 'http://139.196.174.46:8081/login',-->
<!--            headers: {-->
<!--              'Content-Type': 'multipart/form-data'-->
<!--            },-->
<!--            withCredentials: true,-->
<!--            data: formData-->
<!--          })-->
<!--            .then(resp => {-->
<!--              if (resp.status === 200) {-->
<!--                if (resp.data.authorities.indexOf('Reader') > -1 && _this.reader) {-->
<!--                  this.$store.commit('login', resp.data)-->
<!--                  // 页面重定向-->
<!--                  let redirect = decodeURIComponent(this.$route.query.redirect || '/')-->
<!--                  this.$router.replace({path: redirect})-->
<!--                  // 存储用户权限的信息-->
<!--                  localStorage.setItem('authority', resp.data.authorities)-->
<!--                } else if ((resp.data.authorities.indexOf('Librarian') > -1  || resp.data.authorities.indexOf('Admin') > -1) && !_this.reader) {-->
<!--                  this.$store.commit('login', resp.data)-->
<!--                  let redirect = decodeURIComponent(this.$route.query.redirect || '/')-->
<!--                  this.$router.replace({path: redirect})-->
<!--                  // 存储管理员登录地点的信息-->
<!--                  localStorage.setItem('librarianLocation', this.loginForm.radio + '图书馆')-->
<!--                  localStorage.setItem('authority', resp.data.authorities)-->
<!--                } else {-->
<!--                  // 登录身份与账号不符-->
<!--                  this.$message.error('authorities error')-->
<!--                }-->
<!--              } else {-->
<!--                this.$message.error('login error')-->
<!--              }-->
<!--            })-->
<!--            .catch(error => {-->
<!--              this.$message.error(error.response.data.message)-->
<!--            })-->
<!--        } else {-->
<!--          this.$message.error('wrong submit')-->
<!--        }-->
<!--      }) */-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
