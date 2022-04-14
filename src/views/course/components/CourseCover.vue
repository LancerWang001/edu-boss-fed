<template>
  <div class="course-cover">
    <el-form-item label="课程封面">
      <course-image
        v-model="value.courseListImg"
      ></course-image>
    </el-form-item>
    <el-form-item label="解锁封面">
      <course-image
        v-model="value.courseImgUrl"
      ></course-image>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseImage from './CourseImage.vue'

export default Vue.extend({
  name: 'CourseCover',
  components: { CourseImage },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
})
</script>
