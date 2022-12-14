<template>
  <el-header>
    <el-row style="margin: 15px 0">
      <el-col :span="6" style="margin: 0 1% 0 1.5%; white-space: nowrap; overflow: hidden; text-align: left">
        <div style="width: 40px; display: inline-block; vertical-align: middle">
          <img src="static/images/compass.png" alt="" width="30px">
        </div>
        <div style="display: inline-block; vertical-align: middle">
          <router-link to='/' style="text-decoration: none">
            <h1>Fudan Compass</h1>
          </router-link>
        </div>
      </el-col>
      <el-col :span="7" style="text-align: right">
        <el-input placeholder="快来发布一个新的帖子吧！在这里输入标题" v-model="title"/>
      </el-col>
      <el-col :span="2" style="text-align: left; margin: 0 10px">
        <el-select v-model="postOption" placeholder="发帖类型" style="width: 100%">
          <el-option
            v-for="item in postOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="text-align: left; margin: 0 10px">
        <el-button type="success" icon="el-icon-chat-round"
                   v-on:click="post()"> 发帖
        </el-button>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="2" style="text-align: center">
        <el-dropdown trigger="hover" @command="handleCommand" style="cursor: pointer">
              <span class="el-dropdown-link el-input__inner" style="display: block; width: 120px; border-radius: 20px">
                <i class="el-icon-user"/> <span style="color: lightslategray">个人中心</span>
              </span>
          <el-dropdown-menu>
            <el-dropdown-item command="personal center">个人中心</el-dropdown-item>
            <el-dropdown-item command="login">登录</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
    </el-row>

    <post-article-dialog ref="postArticleDlg"/>
    <post-rating-dialog ref="postRatingDlg"/>

  </el-header>
</template>

<script>
import PostArticleDialog from '@/components/PostArticleDialog'
import PostRatingDialog from '@/components/PostRatingDialog'

export default {
  components: {
    PostArticleDialog,
    PostRatingDialog
  },
  data () {
    return {
      postOptions: [{
        value: '文章',
        label: '文章'
      }, {
        value: '课评',
        label: '课评'
      }],
      postOption: '文章',
      title: ''
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        // store.commit('logout');
        this.$message.info('已退出登录')
        localStorage.removeItem('username')
        localStorage.removeItem('authority')
        this.$router.push('/login')
      } else if (command === 'login') {
        // this.$message.info('login')
        this.$router.push('/login')
      } else if (command === 'personal center') {
        // this.$message.info('personal center')
        this.$router.push('/userDetail')
      }
    },
    post () {
      if (this.postOption === '文章') {
        this.$refs.postArticleDlg.pop(this.title)
        this.$message.info('postArticle')
      } else if (this.postOption === '课评') {
        this.$refs.postRatingDlg.pop(this.title)
        this.$message.info('postRating')
      }
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 28px;
  font-weight: bold;
  color: #C0B283;
}
</style>
