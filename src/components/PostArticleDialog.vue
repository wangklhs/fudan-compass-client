<template>
  <el-dialog title="发帖" :visible.sync="visible" :append-to-body="true" width="45%">
    <el-form ref="form" :model="form" label-width="100px" style="padding: 0 50px">
      <el-form-item label="标题" :rules="{required: true, message: '标题不能为空', trigger: 'blur'}">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="预设标签">
        <el-checkbox-group v-model="form.tags">
          <el-checkbox label="娱乐" name="tags"></el-checkbox>
          <el-checkbox label="饮食" name="tags"></el-checkbox>
          <el-checkbox label="运动" name="tags"></el-checkbox>
          <el-checkbox label="生活" name="tags"></el-checkbox>
          <el-checkbox label="学习" name="tags"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        v-for="(customTag, index) in form.customTags"
        :label="'自定义标签 ' + (index+1)"
        :key="customTag.key"
        :prop="'customTag.' + index + '.value'"
        :rules="{required: false, trigger: 'blur'}">
        <el-input v-model="customTag.value">
          <el-button @click.prevent="removeCustomTag(customTag)" slot="append">删除</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addCustomTag">新增自定义标签</el-button>
      </el-form-item>
      <el-form-item label="正文内容" :rules="{required: true, message: '正文内容不能为空', trigger: 'blur'}">
        <el-input type="textarea" v-model="form.content" :rows="5"></el-input>
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
  data () {
    return {
      visible: false,
      form: {
        title: '',
        content: '',
        tags: [],
        customTags: [{
          value: ''
        }]
      },
      tags: []
    }
  },
  methods: {
    pop (title) {
      this.visible = true
      this.form.title = title
    },
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
      this.visible = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // let formData = new FormData()
          // formData.append('content', this.form.content)
          // formData.append('userId', this.username)
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
            userId: this.username,
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
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
