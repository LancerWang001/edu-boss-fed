<template>
  <div class="role-list">
    <el-card>
      <div slot="header">
        <el-form :model="searchForm" ref="form">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item>
            <el-button @click="onSearchRole" type="primary" :disabled="isLoading">查询搜索</el-button>
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button :disabled="isLoading" @click="handleAdd">添加角色</el-button>
      <el-divider></el-divider>
      <el-table :data="roles" v-loading="isLoading">
        <el-table-column
          label="编号"
          type="index"
        />
        <el-table-column
          label="角色名称"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="描述"
          prop="description"
        ></el-table-column>
        <el-table-column
          label="添加时间"
          prop="createdTime"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                @click="$router.push({ name: 'alloc-menu', params: { roleId: scope.row.id } })"
              >分配菜单</el-button>
              <el-button type="text">分配资源</el-button>
            </div>
            <div>
              <el-button type="text" @click="onEditRole(scope.row)">编辑</el-button>
              <el-button type="text">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <create-or-edit-role
        v-if="dialogVisible"
        :isEdit="isEdit"
        :roleId="roleId"
        @cancel="dialogVisible = false"
        @success="handleSuccess"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEditRole from './CreateOrEdit.vue'
import { getRolePages } from '@/services/role'

export default Vue.extend({
  name: 'RoleList',
  components: { CreateOrEditRole },
  data () {
    return {
      dialogVisible: false,
      searchForm: {
        name: ''
      },
      roles: [],
      isLoading: false,
      roleId: null,
      isEdit: false
    }
  },

  created () {
    this.loadRoles()
  },

  methods: {
    handleClose (done: () => void) {
      this.$confirm('确认关闭？').then(() => { done() })
    },
    async loadRoles () {
      try {
        this.isLoading = true
        const { data } = await getRolePages(this.searchForm)
        if (data.code === '000000') {
          this.roles = data.data.records ?? []
        }
      } finally {
        this.isLoading = false
      }
    },
    onSearchRole () {
      this.loadRoles()
    },
    onReset () {
      this.loadRoles()
    },
    onEditRole (row: Record<string, any>) {
      this.dialogVisible = true
      this.roleId = row.id
      this.isEdit = true
    },
    handleAdd () {
      this.isEdit = false
      this.dialogVisible = false
    },
    handleSuccess () {
      this.dialogVisible = false
      this.loadRoles()
    }
  }
})
</script>

<style scoped>

</style>
