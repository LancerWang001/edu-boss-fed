/**
 * 资源相关请求
 */
import request from '@/utils/request'

// 按条件分页查询资源
export const getResourcePages = (data?: Record<string, any>): Promise<any> => request({
  method: 'POST',
  url: '/boss/resource/getResourcePages',
  data: data ?? {}
})

// 查询资源分类列表
export const getAllCates = (resourceId?: number): Promise<any> => request({
  method: 'GET',
  url: '/boss/resource/category/getAll',
  params: { resourceId }
})
