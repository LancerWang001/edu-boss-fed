/**
 * 角色管理相关的接口
 */
import request from '@/utils/request'

// 按条件查询角色
export const getRolePages = (data: Record<string, any>): Promise<any> => request({
  method: 'POST',
  url: '/boss/role/getRolePages',
  data
})

// 保存或者更新角色
export const saveOrUpdateRole = (data: Record<string, any>): Promise<any> => request({
  method: 'POST',
  url: '/boss/role/saveOrUpdate',
  data
})

// 获取角色
export const getRole = (id: string): Promise<any> => request({
  method: 'GET',
  url: `/boss/role/${id}`
})

// 获取所有角色
export const getAllRoles = (): Promise<any> => request({
  method: 'GET',
  url: '/boss/role/all'
})

// 给用户分配角色
export const allocateUserRoles = (
  userId: number | string,
  roleIdList: number[]
): Promise<any> => request({
  method: 'POST',
  url: '/boss/role/allocateUserRoles',
  data: {
    userId,
    roleIdList
  }
})

// 查询用户角色
export const getRoleByUser = (userId: string): Promise<any> => request({
  method: 'GET',
  url: `/boss/role/user/${userId}`
})
