import { FC } from 'react'
import { Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '/@/router/index'
import { getUserInfoService } from '/@/services/user'
import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { removeToken } from '/@/utils/user-token'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const { data = {} } = useRequest(getUserInfoService)
  const { username, nickname } = data

  function logout() {
    removeToken()
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = () => (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
        <Button type="link" onClick={logout}>
          退出
        </Button>
      </span>
    </>
  )

  const Login = () => (
    <>
      <Link to={LOGIN_PATHNAME}>登录/用户信息</Link>
    </>
  )

  return <>{username ? <UserInfo /> : <Login />}</>
}
export default UserInfo
