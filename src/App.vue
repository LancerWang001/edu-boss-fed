<template>
  <div id="app">
    <!-- 根路由的出口 -->
    <router-view/>
    <p class="text">Hello world</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'

request({
  method: 'GET',
  url: '/boss/v2/api-docs?group=edu-boss-boot'
}).then((r) => {
  console.log(r)
})

export default Vue.extend({
  name: 'App'
})
</script>

<style scoped lang="scss">
// @import '~@/styles/variables.scss';
.text {
  color: $warning-color;
}
</style>
