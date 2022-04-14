/**
 * 课程相关接口
 */
import request from '@/utils/request'

// 分页查询课程信息
export const getQueryCourses = (
  data: Record<string, any>
): Promise<any> => request({
  method: 'POST',
  url: '/boss/course/getQueryCourses',
  data
})

// 课程上下架
export const changeState = (courseId: string, status: number) => request({
  method: 'GET',
  url: '/boss/course/changeState',
  params: { courseId, status }
})

// 保存或者更新课程信息
export const saveOrUpdateCourse = (data: Record<string, any>): Promise<any> => request({
  method: 'POST',
  url: '/boss/course/saveOrUpdateCourse',
  data
})

// 上传图片
export const upload = (
  data: FormData,
  onUploadProgress?: (progressEvent: ProgressEvent) => void
): Promise<any> => request({
  method: 'POST',
  url: '/boss/course/upload',
  data,
  onUploadProgress
})
