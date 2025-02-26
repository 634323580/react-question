import axios, { ResDataType } from './ajax'

// 获取用户信息
export function getUserInfoService(): Promise<ResDataType> {
  return axios.get('/api/user/info')
}
// 注册用户
export function registerService(
  username: string,
  password: string,
  nickname: string = username
): Promise<ResDataType> {
  return axios.post('/api/user/register', {
    username,
    password,
    nickname,
  })
}

// 登录
export function loginService(username: string, password: string): Promise<ResDataType> {
  return axios.post('/api/user/login', {
    username,
    password,
  })
}
