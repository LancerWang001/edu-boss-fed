/**
 * 菜单相关接口
 */
import request from '@/utils/request'

// 保存或新增菜单
export const createOrUpdateMenu = (data: Record<string, any>):Promise<any> => request({
  method: 'POST',
  url: '/boss/menu/saveOrUpdate',
  data
})

// 获取编辑菜单页面信息
export const getEditMenuInfo = (id?: string):Promise<any> => request({
  method: 'GET',
  url: '/boss/menu/getEditMenuInfo',
  params: { id: id ?? '-1' }
})

// 获取所有菜单
export const getAllMenu = (id?: string):Promise<any> => request({
  method: 'GET',
  url: '/boss/menu/getAll'
})

// 删除菜单
export const deleteMenu = (id: number): Promise<any> => request({
  method: 'DELETE',
  url: `/boss/menu/${id}`
})

// 获取所有菜单并按层级展示
export const getMenuNodeList = (): Promise<any> => request({
  method: 'GET',
  url: '/boss/menu/getMenuNodeList'
})

// 给角色分配菜单
export const allocateRoleMenus = (
  roleId: string,
  menuIdList: any[]
): Promise<any> => request({
  method: 'POST',
  url: '/boss/menu/allocateRoleMenus',
  data: {
    roleId,
    menuIdList
  }
})

// 获取角色拥有的菜单列表
export const getRoleMenus = (roleId: string): Promise<any> => request({
  method: 'GET',
  url: '/boss/menu/getRoleMenus',
  params: { roleId }
})
