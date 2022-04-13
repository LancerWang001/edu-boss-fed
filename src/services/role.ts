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
