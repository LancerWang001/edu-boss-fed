<template>
  <div>
    <h1>头部</h1>
    <h2>侧边栏</h2>

    <!-- 子路由出口 -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutIndex'
})
</script>

<style scoped>

</style>
