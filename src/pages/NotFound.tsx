import { FC } from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HOME_PATHNAME } from '/@/router/index'

const NotFound: FC = () => {
  const nav = useNavigate()
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="抱款，您访问的页面不存在"
        extra={
          <Button
            type="primary"
            onClick={() =>
              nav({
                pathname: HOME_PATHNAME,
              })
            }
          >
            返回首页
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
