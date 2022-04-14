/**
 * 阿里云上传相关请求模块
 */
import request from '@/utils/request'

// 获取阿里云视频上传凭证
export const getAliyunVideoUploadAddressAdnAuth = (
  fileName: string,
  imageUrl: string
): Promise<any> => request({
  method: 'GET',
  url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
  params: { fileName, imageUrl }
})

// 获取阿里云图片上传凭证
export const getAliyunImagUploadAddressAdnAuth = (): Promise<any> => request({
  method: 'GET',
  url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
})

// 阿里云转码请求
export const aliyunTransCode = (
  data: {
    lessonId: string
    coverImageUrl: string
    fileId: string
    fileName: string
  }
): Promise<any> => request({
  method: 'POST',
  url: '/boss/course/upload/aliyunTransCode.json',
  data
})

// 阿里云转码进度
export const geteAliyunTransCodePercent = (lessonId: string | number): Promise<any> => request({
  method: 'GET',
  url: '/boss/course/upload/aliyunTransCodePercent.json',
  params: { lessonId }
})
