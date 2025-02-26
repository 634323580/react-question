import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Space, Button, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { createQuestionService } from '/@/services/question'
import style from './ManageLayout.module.scss'
import { useRequest } from 'ahooks'

const ManageLayout: React.FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const { loading, run: onCreate } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav('/question/edit/' + result.id) // 导航到编辑页面
      message.success('创建成功') // 显示成功消息
    },
  })

  return (
    <div className={style.container}>
      <div className={style.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            loading={loading}
            onClick={onCreate}
          >
            新建问卷
          </Button>
          <Divider />
          <Button
            type={pathname.startsWith('/manage/lis') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={style.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
