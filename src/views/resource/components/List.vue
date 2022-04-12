<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="formInline" ref="form" class="demo-form-inline">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="formInline.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="formInline.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select clearable v-model="formInline.categoryId" placeholder="资源分类">
              <el-option
                v-for="cate of resourceCates"
                :key="cate.id"
                :label="cate.name"
                :value="cate.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="isLoading" type="primary" @click="onSubmit">查询搜索</el-button>
            <el-button :disabled="isLoading" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="resources"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.current"
        :page-sizes="[5, 10, 20]"
        :page-size="formInline.size"
        :disabled="isLoading"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getResourcePages, getAllCates } from '@/services/resource'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [],
      formInline: {
        id: undefined,
        name: '',
        startCreateTime: '',
        url: '',
        categoryId: null,
        endCreateTime: '',
        current: 1, // 当前页
        size: 5 // 每页数量
      },
      total: 0,
      resourceCates: [],
      isLoading: false
    }
  },
  created () {
    this.loadCates()
    this.loadResources()
  },
  methods: {
    onSubmit () {
      this.formInline.current = 1
      this.loadResources()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.formInline.current = 1
      this.loadResources()
    },
    async loadResources () {
      try {
        this.isLoading = true
        const { data } = await getResourcePages(this.formInline)
        if (data.code === '000000') {
          this.resources = data.data?.records ?? []
          this.total = data.data.total
        }
      } finally {
        this.isLoading = false
      }
    },
    async loadCates () {
      const { data } = await getAllCates()
      if (data.code === '000000') {
        this.resourceCates = data.data
      }
    },
    handleEdit () {
      console.log('edit')
    },
    handleDelete () {
      console.log('delete')
    },
    handleSizeChange (val: number) {
      this.formInline.size = val
      this.formInline.current = 1
      this.loadResources()
    },
    handleCurrentChange (val: number) {
      this.formInline.current = val
      this.loadResources()
    }
  }
})
</script>

<style lang="scss" scoped>
.resource-list .el-table {
  margin-bottom: 20px;
}
</style>
