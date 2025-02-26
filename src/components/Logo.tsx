import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import style from './Logo.module.scss'
const { Title } = Typography

const Logo: FC = () => {
  return (
    <div className={style.container}>
      <Link to="/">
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小鹏问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
