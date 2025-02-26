import { Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '/@/constant'
import { useSearchParams } from 'react-router-dom'

type PropsType = {
  total: number
}

/**
 * 列表页面组件
 * @param props 组件属性
 */
const ListPage: React.FC<PropsType> = props => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    // 从 URL 参数中获取当前页码和每页显示数量
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setCurrent(page)
    setPageSize(pageSize)
  }, [searchParams])

  /**
   * 处理页码变化事件
   * @param page 当前页码
   * @param pageSize 每页显示数量
   */
  function handlePageChange(page: number, pageSize: number) {
    // 更新 URL 参数中的页码和每页显示数量
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    setSearchParams(searchParams)
  }

  return (
    <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange} />
  )
}
export default ListPage
