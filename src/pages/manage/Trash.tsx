import { FC, useEffect, useState } from 'react'
import { Spin, Empty, Typography, Table, Tag, Button, Space, Modal, message } from 'antd'
import styles from './common.module.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '/@/components/ListSearch'
import useLoadQuestionListData from '/@/hooks/useLoadQuestionListData'
import ListPage from '/@/components/ListPage'
import { updateQuestionService, deleteQuestionService } from '/@/services/question'
import { useRequest } from 'ahooks'

const { confirm } = Modal
const { Title } = Typography

const Trash: FC = () => {
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total } = data
  const listJson = JSON.stringify(list)

  // 记录选择的行
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([])

  // 刷新时清空选择
  useEffect(() => {
    setSelectedIds([])
  }, [listJson])

  const { loading: recoverLoading, run: recover } = useRequest(
    async () => {
      // for await of 会串行执行
      // for await (const id of selectedIds) {
      //   await updateQuestionService(id as string, { isDeleted: false })
      // }
      // Promise.all 会并行执行
      await Promise.all(
        selectedIds.map(id => updateQuestionService(id as string, { isDeleted: false }))
      )
    },
    {
      manual: true,
      debounceWait: 100,
      onSuccess() {
        message.success('恢复成功')
        refresh()
      },
    }
  )

  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    () => deleteQuestionService(selectedIds as string[]),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        refresh()
      },
    }
  )

  function onDelete() {
    confirm({
      title: '确定彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk() {
        deleteQuestion()
      },
    })
  }

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  // 可以把 JSX 元素赋值给变量
  const TableElement = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            onClick={recover}
            loading={recoverLoading}
          >
            恢复
          </Button>
          <Button
            danger
            disabled={selectedIds.length === 0}
            onClick={onDelete}
            loading={deleteLoading}
          >
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedIds(selectedRowKeys)
          },
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        {list.length > 0 && TableElement}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
