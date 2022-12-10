<template>
  <div class="login">
    <el-form class="form" @submit.native.prevent :rules="rules" :model="form" :ref="form">
      <h1>Fudan Compass</h1>
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="Username"
          autocomplete="off"
          class="input"
          prefix-icon="el-icon-user"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
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
          @click="register"
          native-type="submit"
          type="primary">
          <span class="button-span">Register</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!/^[0-9]{11}$/.test(value)) {
        callback(new Error('请输入11位学号'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: ''
      },
      // username: '',
      // password: '',
      rules: {
        username: [{required: true, message: '请输入学号/工号', trigger: 'blur'}, {
          validator: validateUsername,
          trigger: 'blur'
        }, {min: 11, max: 11, message: '请输入11位学号'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}, {min: 6, max: 14, message: '密码应为6-14位'}]
      }
    }
  },

  methods: {
    register () {
      axios.post('http://localhost:8081/register', {
        username: this.form.username,
        password: this.form.password
      })
        .then(resp => {
          if (resp.status === 200) {
            this.$message.success('注册成功')
            this.$router.push({path: '/login'})
          } else {
            this.$message.error('error')
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
h1 {
  font-size: 26px;
  font-weight: 600;
  color: rgb(225, 225, 245);
  padding: 25px;
}

.button-span {
  font-size: 16px;
  font-weight: 500;
}

a {
  font-size: 14px;
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
  background: transparent url('https://images.unsplash.com/photo-1551524484-635f78221cc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80') no-repeat fixed;
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
