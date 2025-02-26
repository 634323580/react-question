import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { LOGIN_PATHNAME } from '/@/router'
import { registerService } from '/@/services/user'
import style from './Register.module.scss'

type FieldType = {
  username: string
  password: string
  remember?: string
  confirm: string
  nickname?: string
}

const Register: React.FC = () => {
  const nav = useNavigate()

  const { loading, run } = useRequest(
    (values: FieldType) => {
      const { username, password, nickname } = values
      return registerService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功！')
        nav(LOGIN_PATHNAME)
      },
    }
  )

  const onFinish = (values: FieldType) => {
    run(values)
  }

  return (
    <div className={style.container}>
      <div>
        <Space>
          <Typography.Title level={2}>
            <UserAddOutlined />
          </Typography.Title>
          <Typography.Title level={2}>注册新用户</Typography.Title>
        </Space>
      </div>
      <div style={{ width: '300px' }}>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名！' },
              { type: 'string', min: 5, max: 20, message: '用户名长度为5-20个字符！' },
              { pattern: /^\w+$/, message: '只能包含字母、数字、下划线！' },
            ]}
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
            label="确认密码"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: '请输入密码！' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致！'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType> label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账号？去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
