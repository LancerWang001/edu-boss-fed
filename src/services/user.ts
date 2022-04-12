/**
 * 用户相关请求模块
 */
import qs from 'qs'
import axios from 'axios'
import request from '@/utils/request'
import store from '@/store'

type LoginData = {
  phone: string
  password: string
}

// 用户登录接口
export const login = (data: LoginData): Promise<any> => request({
  method: 'POST',
  url: '/front/user/login',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data)
})

// 刷新 token
export const refreshToken = () => axios.create()({
  method: 'POST',
  url: '/front/user/refresh_token',
  data: qs.stringify({
    // refresh_token 只能使用一次
    refreshtoken: store.state.user.refresh_token
  })
})

// 获取用户信息
export const getUserInfo = () => request({
  method: 'GET',
  url: '/front/user/getInfo'
})
