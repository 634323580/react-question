import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '/@/router'
import style from './Login.module.scss'
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { loginService } from '/@/services/user'
import { setToken } from '/@/utils/user-token'
type FieldType = {
  username: string
  password: string
  remember: boolean
}

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

// 记住用户信息到本地存储
function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

// 从本地存储中删除用户信息
function deleteUserFormStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

// 从本地存储中获取用户信息
function getUserFormStorage() {
  const username = localStorage.getItem(USERNAME_KEY) || ''
  const password = localStorage.getItem(PASSWORD_KEY) || ''
  return { username, password }
}

const Login: React.FC = () => {
  const [form] = Form.useForm<FieldType>()

  const nav = useNavigate()

  useEffect(() => {
    // 在组件挂载后，从本地存储中获取用户信息并设置到表单中
    const { username, password } = getUserFormStorage()
    form.setFieldsValue({ username, password })
  }, [form])

  const { loading, run } = useRequest(
    (username: string, password: string) => {
      return loginService(username, password)
    },
    {
      manual: true,
      onSuccess(result) {
        const token = result.token || ''
        setToken(token)
        message.success('登录成功！')
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )

  const onFinish = (values: FieldType) => {
    console.log('Received values:', values)
    const { username, password, remember } = values || {}
    run(username, password)
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFormStorage()
    }
  }

  return (
    <div className={style.container}>
      <div>
        <Space>
          <Typography.Title level={2}>
            <UserAddOutlined />
          </Typography.Title>
          <Typography.Title level={2}>用户登录</Typography.Title>
        </Space>
      </div>
      <div style={{ width: '300px' }}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            wrapperCol={{ offset: 8, span: 16 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
