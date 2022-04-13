<template>
  <div class="user">
    <el-card>
      <div slot="header" class="user-header">
        <el-form size="small" inline :model="searchForm" ref="form">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="searchForm.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="dateRange">
            <el-date-picker
              v-model="searchForm.dateRange"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div>
          <el-button size="small" @click="reset">重置</el-button>
          <el-button size="small" type="primary" @click="onSearch">查询</el-button>
        </div>
      </div>
      <el-table :data="users">
        <el-table-column
          label="ID"
          prop="id"
        ></el-table-column>
        <el-table-column
          label="头像"
        >
          <template slot-scope="scope">
            <el-avatar
              shape="square"
              size="small"
              :src="scope.row.portrait || require('@/assets/default-avatar.png')"/>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="phone"
        >
        </el-table-column>
        <el-table-column
          label="注册时间"
          prop="createTime"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleSelectRole(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="searchForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%">
      <el-select v-model="selectedValue" multiple placeholder="请选择">
        <el-option
          v-for="item of options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAllocRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui/types/element-ui'
import { getUserPages } from '@/services/user'
import { getAllRoles, allocateUserRoles, getRoleByUser } from '@/services/role'

export default Vue.extend({
  name: 'UserIndex',
  data () {
    return {
      searchForm: {
        currentPage: 1,
        pageSize: 5,
        phone: '',
        userId: null,
        dateRange: []
      },
      totalSize: 0,
      users: [],
      dialogVisible: false,
      options: [],
      selectedValue: [] as number[],
      currentUser: null as (null | Record<string, any>)// 当前用户
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    reset () {
      (this.$refs.form as Form).resetFields()
      this.searchForm.currentPage = 1
      this.loadUser()
    },
    async loadUser () {
      try {
        const { dateRange, ...filters } = this.searchForm
        const { data } = await getUserPages({
          ...filters,
          startCreateTime: dateRange[0],
          endCreateTime: dateRange[1]
        })
        if (data.code === '000000') {
          this.users = data.data.records ?? []
          this.totalSize = data.data.total
        }
      } finally {

      }
    },
    onSearch () {
      this.searchForm.currentPage = 1
      this.loadUser()
    },
    handleSizeChange (val: number) {
      this.searchForm.currentPage = 1
      this.searchForm.pageSize = val
      this.loadUser()
    },
    handleCurrentChange (val: number) {
      this.searchForm.currentPage = val
      this.loadUser()
    },
    async handleSelectRole (row: Record<string, any>) {
      this.currentUser = row
      // 加载角色列表
      const [{ data: roleOptions }, { data: userRoles }] = await Promise.all([
        getAllRoles(),
        getRoleByUser(row.id)
      ])
      this.options = roleOptions.data
      this.selectedValue = userRoles.data.map((role: Record<string, any>) => role.id)
      // 展示对话框
      this.dialogVisible = true
    },
    async handleAllocRole () {
      await allocateUserRoles(this.currentUser?.id, this.selectedValue)
      this.$message.success('操作成功')
      this.dialogVisible = false
    }
  }
})
</script>

<style scoped lang="scss">
.el-select {
  width: 100%;
}
</style>
