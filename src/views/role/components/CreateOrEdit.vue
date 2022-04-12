<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="isLoading" @click="$emit('cancel')">取消</el-button>
        <el-button :disabled="isLoading" @click="onSubmit" type="primary">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { saveOrUpdateRole } from '@/services/role'

export default Vue.extend({
  name: 'CreateOrEditRole',
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
      },
      isLoading: false
    }
  },
  methods: {
    onCancel () {
      (this.$refs.form as Form).resetFields()
    },
    async onSubmit () {
      try {
        this.isLoading = true
        await (this.$refs.form as Form).validate()
        await saveOrUpdateRole(this.form)
        this.$message('操作成功')
        this.$emit('success');
        (this.$refs.form as Form).resetFields()
      } finally {
        this.isLoading = false
      }
    }
  }
})
</script>

<style scoped>

</style>
