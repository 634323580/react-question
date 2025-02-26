import { useRequest } from 'ahooks' // 引入 ahooks 库中的 useRequest 钩子函数
import { useSearchParams } from 'react-router-dom' // 引入 react-router-dom 库中的 useSearchParams 钩子函数
import { getQuestionListService } from '/@/services/question' // 引入自定义的 getQuestionListService 函数
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '/@/constant' // 引入自定义的 LIST_SEARCH_PARAM_KEY 常量

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const [searchParams] = useSearchParams() // 使用 useSearchParams 钩子函数获取 URL 中的查询参数
  const { data, loading, error, refresh } = useRequest(
    () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '' // 获取查询参数中的关键字
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
      return getQuestionListService({
        keyword,
        page,
        pageSize,
        ...opt,
      }) // 调用 getQuestionListService 函数获取问题列表数据
    },
    {
      refreshDeps: [searchParams], // 当查询参数发生变化时刷新数据
    }
  )
  return {
    data,
    loading,
    error,
    refresh,
  } // 返回数据、加载状态和错误信息
}

export default useLoadQuestionListData
