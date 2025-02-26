import { Button, Space, Divider, Tag, Modal, message, Popconfirm } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { updateQuestionService, duplicateQuestionService } from '/@/services/question'
import styles from './QuestionCard.module.scss'
import { useState } from 'react'
import { useRequest } from 'ahooks'

const { confirm } = Modal

// ts 自定义类型
type PropsType = {
  _id: string // 服务端 mongodb ，自动，_id 不重复
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

// FC - functional component
const QuestionCard: React.FC<PropsType> = props => {
  const nav = useNavigate()
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props

  // 修改标星
  const [isStarState, setIsStarState] = useState(isStar)

  const { loading: changeStarLoading, run: changeStar } = useRequest(
    () => updateQuestionService(_id, { isStar: !isStarState }),
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已更新')
      },
    }
  )

  const { loading: duplicateLoading, run: duplicate } = useRequest(
    () => duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`)
      },
    }
  )

  const [isDeleteState, setIsDeleteState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    () => updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('已删除')
        setIsDeleteState(true)
      },
    }
  )

  function onDelete() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteQuestion()
      },
    })
  }

  if (isDeleteState) {
    return null
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              <Space>
                {isStarState && <StarOutlined style={{ color: 'red' }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
              <span>答卷：{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: '12px 0' }} />
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <Space>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                type="text"
                icon={<LineChartOutlined />}
                onClick={() => nav(`/question/Stat/${_id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                type="text"
                size="small"
                icon={<StarOutlined />}
                onClick={changeStar}
                loading={changeStarLoading}
              >
                {isStarState ? '取消星标' : '星标'}
              </Button>

              <Popconfirm
                title="确定复制该问卷?"
                onConfirm={duplicate}
                okText="确定"
                cancelText="取消"
              >
                <Button type="text" size="small" icon={<CopyOutlined />} loading={duplicateLoading}>
                  复制
                </Button>
              </Popconfirm>
              <Button
                type="text"
                size="small"
                icon={<DeleteOutlined />}
                onClick={onDelete}
                loading={deleteLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard
