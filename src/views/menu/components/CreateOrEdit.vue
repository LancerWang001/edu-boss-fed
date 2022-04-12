<template>
  <div class="menu-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑' : '添加' }}菜单</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择活动区域">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option
              v-for="item of parentMenuList"
              :label="item.name"
              :key="item.id"
              :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="shown">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number
          v-model="form.orderNum"
          :min="1" :max="10"
          label="排序" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'

export default Vue.extend({
  name: 'MenuCreateOrId',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: '123',
        href: '123',
        icon: '123',
        parentId: -1,
        description: '123',
        shown: false,
        orderNum: 0
      },
      parentMenuList: [] // 父级菜单列表
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async onSubmit () {
      // 表单验证
      const { data } = await createOrUpdateMenu(this.form)
      if (data.code === '000000') {
        this.$router.back()
      }
    },
    async loadMenuInfo () {
      const { data } = await getEditMenuInfo(this.$route.params.id)
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
        this.form = data.data?.menuInfo ?? this.form
      }
    }
  }
})
</script>

<style scoped>

</style>
