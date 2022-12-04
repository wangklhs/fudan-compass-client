<template>
  <el-container>
    <el-header>
      header
    </el-header>
    <el-main>

    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticleDetail',
  data () {
    return {
      username: localStorage.getItem('username') || '',
      articleID: this.$route.query.articleID
    }
  },
  created () {
    this.$message.info('check article by id : ' + this.articleID)
    // let _this = this
    // let formData = new FormData()
    // formData.append('user_id', this.username)
    // formData.append('article_id', this.$route.query.articleID)
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:8081/search',
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   data: formData
    // })
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       _this.articleList = resp.data.articleList
    //       _this.articlesCount = resp.data.articlesCount
    //     } else {
    //       this.$message.error('search error')
    //     }
    //   })
    //   .catch(error => {
    //     this.$message.error(error.response.data.message)
    //   })
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
}
</style>
