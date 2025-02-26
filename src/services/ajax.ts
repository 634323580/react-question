import axios from 'axios'
import { message } from 'antd'
import { getToken } from '/@/utils/user-token'

// 创建一个axios实例
const instance = axios.create({
  timeout: 1000 * 10, // 设置请求超时时间为10秒
})

instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}` // 设置请求头中的Authorization字段
    return config
  },
  error => Promise.reject(error)
)

// 添加响应拦截器
instance.interceptors.response.use(
  res => {
    const resData = (res.data || {}) as ResType
    const { errno, data, msg } = resData

    // 如果返回的errno不为0，则表示请求失败
    if (errno !== 0) {
      message.error(msg || '请求失败') // 显示错误消息
      throw new Error(msg) // 抛出错误
    }
    // res.data = data // 将响应数据设置为data字段
    // return res
    return (data || {}) as any // 返回响应数据
  },
  res => {
    // 处理请求失败
    return Promise.reject(res)
  }
)

export default instance

// 定义响应类型
export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

// 定义响应数据类型
export type ResDataType = {
  [key: string]: any
}
