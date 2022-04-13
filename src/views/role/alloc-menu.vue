<template>
  <div class="alloc-menu">
    <el-card>
      <div slot="header">
        <span>分配权限</span>
      </div>
      <el-tree
        ref="menu-tree"
        node-key="id"
        :data="menus"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        @node-click="handleNodeClick"
        show-checkbox
        default-expand-all
      ></el-tree>
      <div style="text-align: center; margin-top: 10px">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tree } from 'element-ui'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: [] as number[]
    }
  },
  created () {
    this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    getCheckedKeys (menus: Record<string, any>[]) {
      const reduceCheckedKeys = (acc: number[], menu: any) => {
        if (menu.selected && !menu.shown) {
          acc.push(menu.id)
        }
        if (menu.subMenuList) {
          return menu.subMenuList.reduce(reduceCheckedKeys, acc)
        }
        return acc
      }
      this.checkedKeys = menus.reduce(reduceCheckedKeys, [])
    },
    handleNodeClick (data: any) {
      console.log(data)
    },
    resetChecked () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    },
    async loadMenus () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId as string)
      if (data.code === '000000') {
        this.getCheckedKeys(data.data)
      }
    },
    async onSave () {
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      await allocateRoleMenus(
        this.roleId as string,
        menuIdList
      )
      this.$router.back()
    }
  }

})
</script>

<style scoped>

</style>
