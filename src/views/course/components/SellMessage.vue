<template>
  <div class="sell-message">
    <el-form-item label="售卖价格">
      <el-input v-model="value.discounts">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品原价">
      <el-input v-model="value.price">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="销量">
      <el-input v-model="value.sales">
        <template slot="append">单</template>
      </el-input>
    </el-form-item>
    <el-form-item label="活动标签">
      <el-input v-model="value.discountsTag"></el-input>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SellMessage',
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
