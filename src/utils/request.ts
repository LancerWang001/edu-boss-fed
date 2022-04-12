import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import { refreshToken } from '@/services/user'

const redirectLogin = () => {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

const request = axios.create({
  // 配置选项
})

// 请求拦截
request.interceptors.request.use((config) => {
  const { user } = store.state
  if (user?.access_token) {
    (config.headers = config.headers || {}).Authorization = user.access_token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截
// 控制刷新 token 的数量
type RefreshAdaptor = {
  resolve?: (res: any) => any
  reject?: (res: any) => any
  refreshPromise?: Promise<any>
  startRefresh (): void
  endRefresh (): void
}
const refreshAdaptor: RefreshAdaptor = {
  resolve: undefined,
  reject: undefined,
  refreshPromise: undefined,
  startRefresh () {
    this.refreshPromise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  },
  endRefresh () {
    this.refreshPromise = undefined
    this.resolve = undefined
    this.reject = undefined
  }
}

request.interceptors.response.use((config) => {
  return config
}, async (error) => {
  // http 请求状态码超出 2xx 的情况处理
  if (error.response) {
    // 请求已发送且已收到响应，但状态码超出 2xx
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // 没有提供 token / token 无效 / token 过期
      // 1. 如果有 refresh_token 则尝试使用 refresh_token 获取新的 access_token
      if (store.state.user?.refresh_token) {
        // 1.1 成功 -> 将本次请求重新发出
        if (refreshAdaptor.refreshPromise) await refreshAdaptor.refreshPromise
        else {
          try {
            // 1.1.1 尝试获取新的 refresh_token
            refreshAdaptor.startRefresh()
            const { data } = await refreshToken()
            if (!data.success) {
              throw new Error('刷新 Token 失败')
            }
            // 1.1.2 把刷新拿到的 access_token 更新到容器和本地存储中
            store.commit('setUser', data.content)
            if (refreshAdaptor.resolve) refreshAdaptor.resolve(data)
          } catch (err) {
            // 1.2 失败 -> 跳转到登录页
            // 1.2.1 清除当前登录状态
            store.commit('setUser', null)
            if (refreshAdaptor.reject) refreshAdaptor.reject(err)
            // 1.2.2 重新跳转登录页
            return redirectLogin()
          } finally {
            refreshAdaptor.endRefresh()
          }
        }
        // 1.1.3 把本次失败的请求重新发出去
        return request(error.config)
      } else {
        return redirectLogin()
      }
      // 2. 否则直接跳转到登录页
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求的资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) {
    // 请求已发送，没有收到响应
    Message.error('请求超时，请刷新重试')
  } else {
    // 其他情况
    Message.error(`请求失败，${error.message}`)
  }
  // 抛出错误
  return Promise.reject(error)
})

export default request
