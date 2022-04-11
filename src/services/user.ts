/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
import qs from 'qs'
import store from '@/store'

type LoginData = {
  phone: string
  password: string
}

export const login = (data: LoginData): Promise<any> => request({
  method: 'POST',
  url: '/front/user/login',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data)
})

export const getUserInfo = () => request({
  method: 'GET',
  url: '/front/user/getInfo'
})
