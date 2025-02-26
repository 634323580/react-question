import { useEffect, useState, useRef, useMemo } from 'react'
import { useDebounceFn, useRequest } from 'ahooks'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { Spin, Typography } from 'antd'
import ListSearch from '/@/components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '/@/services/question'
import { LIST_PAGE_SIZE } from '/@/constant'

const { Title } = Typography

/**
 * 列表组件
 */
const List: React.FC = () => {
  // 是否已经开始加载数据
  const [started, setStarted] = useState(false)
  // 当前页码
  const [page, setPage] = useState(1)
  // 数据总数
  const [total, setTotal] = useState(0)
  // 数据列表
  const [list, setList] = useState<any[]>([])
  // 是否还有更多数据
  const haveMoreData = total > list.length

  // 获取搜索参数
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''

  // 当搜索参数发生变化时，重置状态
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setTotal(0)
    setList([])
  }, [keyword])

  // 使用 useRequest 进行数据请求
  const { loading, run: load } = useRequest(
    async () => {
      return getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  // 容器的引用
  const containerRef = useRef<HTMLDivElement>(null)

  // 使用 useDebounceFn 进行函数防抖
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem === null) return
      const domReact = elem.getBoundingClientRect()
      if (domReact === null) return
      const { top } = domReact
      const clientHeight = document.body.clientHeight
      if (top < clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 500,
    }
  )

  // 初始化时尝试加载更多数据
  useEffect(() => {
    tryLoadMore()
  }, [searchParams, tryLoadMore])

  // 当还有更多数据时，监听滚动事件
  useEffect(() => {
    if (haveMoreData) {
      console.log('addEventListener')
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      console.log('removeListener')
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [haveMoreData, tryLoadMore])

  // 加载更多内容的元素
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) {
      return <Spin />
    }
    if (total === 0) {
      return '暂无数据'
    }
    if (!haveMoreData) {
      return '没有更多数据了'
    }
  }, [haveMoreData, loading, started, total])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
