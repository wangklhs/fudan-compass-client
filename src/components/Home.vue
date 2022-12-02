<template>
  <el-container id="base_main">
      <el-container>
        <el-header style="height: 64px; font-size: 14px; text-align: left; background-color: rgb(48,114,184); color: #ffffff">
          <!-- 顶端登录、个人中心栏 -->
          <el-menu class="el-menu-demo" mode="horizontal" :default-active="'0-1'" background-color="rgb(48, 114, 184)"
                   text-color="#fff" active-text-color="#87ddff">
            <span style="float: left; margin-left: 1%; margin-right: 10%">
              <span class="home-title">Fudan Compass</span>
            </span>
<!--            <el-submenu index="3" class="menu-top-item">-->
<!--              <template slot="title"><i class="el-icon-user"/>-->
<!--                <span slot="title"><b>个人中心</b></span>-->
<!--              </template>-->
<!--              <el-menu-item index="3-1" class="menu-item">-->
<!--                <i class="el-icon-s-order" style="margin-left: 20%"/>个人中心-->
<!--              </el-menu-item>-->
<!--              <el-menu-item index="3-2" class="menu-item">-->
<!--                <i class="el-icon-s-order" style="margin-left: 20%"/>退出登录-->
<!--              </el-menu-item>-->
<!--            </el-submenu>-->
            <el-form ref="form" :model="form">
              <el-input placeholder="请输入内容" v-model="form.input">
                <el-button slot="append" icon="el-icon-search" @click="submitForm(form)"> 搜索</el-button>
              </el-input>
            </el-form>
            <el-button type="success" icon="el-icon-wallet" style="margin-top: -7px; margin-left: 30px" v-on:click="post()"> 发帖</el-button>
            <el-dropdown trigger="hover" @command="handleCommand"  >
            <span class="el-dropdown-link el-input__inner"  style="display:block;width:200px;">
                <span  style="color:lightslategray">个人中心</span>
            </span>
              <el-dropdown-menu >
                <el-dropdown-item command="personal center">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span style="float: right; margin-right: 0">
              <span style="position: relative; right: 0">
                <el-divider direction="vertical"/>
                <router-link to="/login" class="home-login-button">Login</router-link>
              </span>
            </span>

          </el-menu>
        </el-header>
        <el-main style="background-color: rgba(66,155,255,0.07)">
          <router-view>
          </router-view>
        </el-main>

      </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      fit: 'cover',
      form: {
        input: ''
      },
      books: [],
      show: false, // 展示书籍部分是否显示
      booksPerPage: 8, // 一页展示的数量
      cur: 1, // 当前页码
      starColors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  methods: {
    submitForm () {
      this.$message.info('button clicked')
    },
    handleCommand (command) {
      if (command === 'logout') {
        // store.commit('logout');
        this.$message.info('logout')
        this.$router.push('/login')
      }
    },
    post () {
      this.$message.info('post')
    }
  }
}
</script>

<style scoped>

</style>
