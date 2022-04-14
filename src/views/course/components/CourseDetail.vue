<template>
  <div class="course-detail">
    <el-form-item label="课程详情">
      <text-editor v-model="value.courseDescriptionMarkDown"/>
    </el-form-item>
    <el-form-item label="是否发布">
      <el-switch
        v-model="value.status"
        :active-value="1"
        :inactive-value="0"
        active-color="#13ce66"
        inactive-color="#ff4949"
      />
    </el-form-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TextEditor from '@/components/TextEditor/index.vue'

export default Vue.extend({
  name: 'CourseDetail',
  components: { TextEditor },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
