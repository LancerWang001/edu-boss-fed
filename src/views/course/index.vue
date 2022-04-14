<template>
  <div class="course">
    <el-card>
      <div slot="header">
        <span>数据筛选</span>
      </div>
      <el-form ref="searchForm" :model="searchForm" label-width="80px">
        <el-form-item label="课程名称" prop="courseName">
          <el-input type="text" v-model="searchForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchForm.status">
            <el-option label="全部" :value="null"></el-option>
            <el-option label="已上架" :value="1"></el-option>
            <el-option label="草稿" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="onReset">重置</el-button>
          <el-button type="primary" @click="onQuery" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br>
    <el-card style="marin-top: 20px">
      <div slot="header" class="queryHeader">
        <span>查询结果</span>
        <el-button
          type="primary"
          size="small"
          @click="$router.push({ name: 'course-create-edit' })"
        >添加课程</el-button>
      </div>
      <el-table :data="courseTable" v-loading="isLoading">
        <el-table-column
          label="ID"
          prop="id"
        ></el-table-column>
        <el-table-column
          label="课程名称"
          prop="courseName"
        ></el-table-column>
        <el-table-column
          label="价格"
          prop="price"
        ></el-table-column>
        <el-table-column
          label="排序"
          prop="sortNum"
        ></el-table-column>
        <el-table-column
          label="上架状态"
          prop="status"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.isLoading"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click="$router.push({
                name: 'course-create-edit',
                params: { courseId: scope.row.id }
              })"
            >编辑</el-button>
            <el-button>内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="searchForm.pageSize"
        :disabled="isLoading"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui/types/element-ui'
import { getQueryCourses, changeState } from '@/services/course'

export default Vue.extend({
  name: 'CourseIndex',
  data () {
    return {
      searchForm: {
        currentPage: 1,
        pageSize: 5,
        courseName: '',
        status: null
      },
      courseTable: [],
      total: 0,
      isLoading: false
    }
  },
  created () {
    this.loadCourses()
  },
  methods: {
    async loadCourses () {
      try {
        this.isLoading = true
        const { data } = await getQueryCourses(this.searchForm)
        this.courseTable = data.data.records.map((item: any) => ({
          ...item, isLoading: false
        }))
        this.total = data.data.total
      } finally {
        this.isLoading = false
      }
    },
    handleSizeChange (size: number) {
      this.searchForm.currentPage = 1
      this.searchForm.pageSize = size
      this.loadCourses()
    },
    handleCurrentChange (current: number) {
      this.searchForm.currentPage = current
      this.loadCourses()
    },
    onReset () {
      (this.$refs.searchForm as Form).resetFields()
      this.searchForm.currentPage = 1
      this.loadCourses()
    },
    onQuery () {
      this.searchForm.currentPage = 1
      this.loadCourses()
    },
    async onStateChange (course: any) {
      try {
        course.isLoading = true
        await changeState(course.id, course.status)
        this.$message.success(course.status === 0 ? '下架成功' : '上架成功')
      } finally {
        course.isLoading = false
      }
    }
  }
})
</script>

<style scoped lang="scss">
.queryHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
