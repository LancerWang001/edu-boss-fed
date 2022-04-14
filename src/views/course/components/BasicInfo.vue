<template>
  <div class="basic-info">
    <el-form-item label="课程名称" prop="courseName">
      <el-input v-model="value.courseName"></el-input>
    </el-form-item>
    <el-form-item label="课程简介" prop="brief">
      <el-input v-model="value.brief"></el-input>
    </el-form-item>
    <el-form-item label="课程概述">
      <el-input
        type="textarea"
        style="margin-bottom: 10px"
        placeholder="概述1"
        v-model="value.previewFirstField"
      ></el-input>
      <el-input
        type="textarea"
        placeholder="概述2"
        v-model="value.previewSecondField"
      ></el-input>
    </el-form-item>
    <el-form-item label="讲师姓名" prop="teacherDTO.teacherName">
      <el-input v-model="value.teacherDTO.teacherName"></el-input>
    </el-form-item>
    <el-form-item label="讲师简介" prop="teacherDTO.description">
      <el-input v-model="value.teacherDTO.description"></el-input>
    </el-form-item>
    <el-form-item label="课程排序" prop="sortNum">
      <el-input-number label="描述文字" v-model="value.sortNum"></el-input-number>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'info',
  props: {
    value: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">

</style>
