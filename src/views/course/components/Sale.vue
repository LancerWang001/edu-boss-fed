<template>
  <div class="sale">
    <el-form-item label="限时秒杀开关">
      <el-switch
        v-model="value.activityCourse"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </el-form-item>
    <template v-if="value.activityCourse">
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="value.activityCourseDTO.beginTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="value.activityCourseDTO.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="秒杀价">
        <el-input v-model="value.activityCourseDTO.amount">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="秒杀库存">
        <el-input v-model="value.activityCourseDTO.stock">
          <template slot="append">个</template>
        </el-input>
      </el-form-item>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Sale',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isOnSale: false
    }
  }
})
</script>

<style scoped>

</style>
