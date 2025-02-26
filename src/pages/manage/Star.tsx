import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { Empty, Typography, Spin } from 'antd'
import ListSearch from '/@/components/ListSearch'
import ListPage from '/@/components/ListPage'
import useLoadQuestionListData from '/@/hooks/useLoadQuestionListData'

const { Title } = Typography

const List: React.FC = () => {
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total } = data
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
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
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default List
