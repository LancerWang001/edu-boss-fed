<template>
  <div class="login">
    <el-form
      class="login-form"
      label-position="top"
      ref="form"
      label-width="80px"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onSubmit"
          :loading="isLoading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import qs from 'qs'
import { Form } from 'element-ui'
import request from '@/utils/request'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },
  methods: {
    /**
     * 测试账号：
     *  id： 18201288771
     *  pwd： 111111
     */
    async onSubmit () {
      try {
        // 1. 表单验证
        await (this.$refs.form as Form).validate()

        // 登录按钮 loading
        this.isLoading = true

        // 2. 验证通过 -> 提交表单
        const { data } = await request({
          method: 'POST',
          url: '/front/user/login',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify(this.form)
        })
        // 3. 处理请求结果
        //    失败：给出提示
        if (data.state !== 1) {
          return this.$message.error(data.message)
        }
        //    成功：跳转到首页
        this.$router.push({
          name: 'home'
        })
        this.$message.success('登录成功')
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 300px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}

.login-btn {
  width: 100%;
}
</style>
