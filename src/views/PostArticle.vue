<template>
  <el-container>
    <el-header>
      header
    </el-header>
    <el-main>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="标题" :rules="{
      required: true, message: '标题不能为空', trigger: 'blur'
    }">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="预设标签" v-if="ifNew">
          <el-checkbox-group v-model="form.tags">
            <el-checkbox label="娱乐" name="tags"></el-checkbox>
            <el-checkbox label="饮食" name="tags"></el-checkbox>
            <el-checkbox label="运动" name="tags"></el-checkbox>
            <el-checkbox label="生活" name="tags"></el-checkbox>
            <el-checkbox label="学习" name="tags"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          v-if="ifNew"
          v-for="(customTag, index) in form.customTags"
          :label="'自定义标签' + index"
          :key="customTag.key"
          :prop="'customTag.' + index + '.value'"
          :rules="{
      required: true, message: '自定义标签不能为空', trigger: 'blur'
    }"
        >
          <el-input v-model="customTag.value">
            <el-button @click.prevent="removeCustomTag(customTag)" slot="append">删除</el-button>
          </el-input>
        </el-form-item>
        <el-form-item v-if="ifNew">
          <el-button @click="addCustomTag">新增自定义标签</el-button>
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
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostArticle',
  data () {
    return {
      username: localStorage.getItem('username') || '',
      form: {
        title: '',
        content: '',
        tags: [],
        customTags: [{
          value: ''
        }]
      },
      ifNew: true,
      tags: []
    }
  },
  methods: {
    removeCustomTag (item) {
      let index = this.form.customTags.indexOf(item)
      if (index !== -1) {
        this.form.customTags.splice(index, 1)
      }
    },
    addCustomTag () {
      this.form.customTags.push({
        value: '',
        key: Date.now()
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ifNew) {
            // let formData = new FormData()
            // formData.append('content', this.form.content)
            // formData.append('user_id', this.username)
            // formData.append('title', this.form.title)
            let tagsData = []
            for (let i = 0; i < this.tags.length; i++) {
              tagsData.push(this.tags[i])
            }
            for (let i = 0; i < this.customTags.length; i++) {
              tagsData.push(this.customTags[i].value)
            }
            // formData.append('tags', tagsData)
            // axios({
            //   method: 'post',
            //   url: 'http://localhost:8081/postArticle',
            //   headers: {
            //     'Content-Type': 'multipart/form-data'
            //   },
            //   data: formData
            // })
            axios.post('http://localhost:8081/postArticle', {
              content: this.form.content,
              user_id: this.username,
              title: this.form.title,
              tags: tagsData,
              ifNew: true
            })
              .then(resp => {
                if (resp.status === 200) {
                  this.$message.success('文章发表成功')
                } else {
                  this.$message.error('post error')
                }
              })
              .catch(error => {
                this.$message.error(error.response.data.message)
              })
          } else {
            axios.post('http://localhost:8081/postArticle', {
              content: this.form.content,
              user_id: this.username,
              title: this.form.title,
              tags: this.tags,
              ifNew: false
            })
              .then(resp => {
                if (resp.status === 200) {
                  this.$message.success('文章修改成功')
                } else {
                  this.$message.error('post error')
                }
              })
              .catch(error => {
                this.$message.error(error.response.data.message)
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    if (this.$route.query.articleID != null) {
      this.form.title = 'title'
      this.form.content = 'content'
      this.ifNew = false
      // let _this = this
      // let formData = new FormData()
      // formData.append('user_id', this.username)
      // formData.append('article_id', this.$route.query.articleID)
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:8081/getArticleDetail',
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   data: formData
      // })
      //   .then(resp => {
      //     if (resp.status === 200) {
      //       _this.form.title = resp.data.articleDetail.title
      //       _this.form.content = resp.data.articleDetail.content
      //       _this.ifNew = false
      //       _this.tags = resp.data.articleDetail.tags
      //     } else {
      //       this.$message.error('search error')
      //     }
      //   })
      //   .catch(error => {
      //     this.$message.error(error.response.data.message)
      //   })
    }
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
  padding-left: 15%;
  padding-right: 15%;
}
</style>
