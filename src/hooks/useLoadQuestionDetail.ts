import { useParams } from 'react-router-dom'
import { getQuestionService } from '/@/services/question'
import { useRequest } from 'ahooks'

function useLoadQuestionDetail() {
  const { id = '' } = useParams() // 从URL参数中获取id
  function load() {
    return getQuestionService(id) // 调用getQuestionService函数获取问题详情
  }

  const { loading, data, error } = useRequest(load) // 使用useRequest钩子发送请求

  return { loading, data, error } // 返回loading、data和error
}

export default useLoadQuestionDetail
