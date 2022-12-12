<template>
  <el-dialog title="发布文章" :visible.sync="visible" :append-to-body="true" width="45%">
    <el-form ref="form" :model="form" label-width="100px" style="padding: 0 50px">
      <el-form-item label="标题" :rules="{required: true, message: '标题不能为空', trigger: 'blur'}">
        <el-input v-model="form.title" maxlength="30" show-word-limit />
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
<!--      <el-form-item-->
<!--        v-for="(customTag, index) in form.customTags"-->
<!--        :label="'自定义标签 ' + (index+1)"-->
<!--        :key="customTag.key"-->
<!--        :prop="'customTag.' + index + '.value'"-->
<!--        :rules="{required: false, trigger: 'blur'}">-->
<!--        <el-input v-model="customTag.value">-->
<!--          <el-button @click.prevent="removeCustomTag(customTag)" slot="append">删除</el-button>-->
<!--        </el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" @click="addCustomTag">新增自定义标签</el-button>-->
<!--      </el-form-item>-->
      <el-form-item label="正文内容" :rules="{required: true, message: '正文内容不能为空', trigger: 'blur'}">
        <el-input type="textarea" v-model="form.content" :rows="5" />
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
      userId: localStorage.getItem('userId') * 1,
      username: localStorage.getItem('username'),
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
          axios.post('http://localhost:8081/articles', {
            content: this.form.content,
            userId: this.userId,
            title: this.form.title,
            tags: this.form.tags
          })
            .then(resp => {
              if (resp.status === 200) {
                this.$message.success('文章发表成功')
                this.$router.push({path: '/'})
                location.reload()
              } else {
                this.$message.error('post error')
              }
            })
            .catch(error => {
              this.$message.error(error.response.data.message)
            })
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
