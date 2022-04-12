<template>
  <div class="menu-create">
    <create-or-edit :isEdit="true"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuEdit',
  components: { CreateOrEdit }
})
</script>

<style scoped>

</style>
