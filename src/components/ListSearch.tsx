import { useEffect, useState } from 'react'
import { Input } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '/@/constant'

const ListSearch: React.FC = () => {
  // 使用 useSearchParams hook 获取当前页面的搜索参数
  const [searchParams, setSearchParams] = useSearchParams()
  // 使用 useState hook 创建一个状态变量 value，并设置初始值为空字符串
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    // 从搜索参数中获取关键字
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY)
    // 如果关键字存在，则将其设置为 value 的值，否则设置为空字符串
    setValue(keyword || '')
  }, [searchParams])

  // 处理输入框值的变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 将输入框的值设置为 value 的值
    setValue(e.target.value)
  }

  // 处理搜索操作
  const handleSearch = (value: string) => {
    // 将搜索参数设置为包含关键字的对象，并使用 replace 选项替换当前的搜索参数
    setSearchParams({ [LIST_SEARCH_PARAM_KEY]: value }, { replace: true })
  }

  return (
    // 渲染一个带有搜索功能的输入框组件
    <Input.Search
      size="large"
      placeholder="输入关键字"
      allowClear
      value={value}
      onSearch={handleSearch}
      onChange={handleChange}
      style={{ width: '260px' }}
    />
  )
}

export default ListSearch
