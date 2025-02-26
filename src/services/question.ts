import axios, { ResDataType } from './ajax'
type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 获取单个问卷信息
export function getQuestionService(id: string): Promise<ResDataType> {
  return axios.get(`/api/question/${id}`)
}

// 创建问卷
export function createQuestionService(): Promise<ResDataType> {
  return axios.post('/api/question')
}

// 查询问卷列表
export function getQuestionListService(opt: Partial<SearchOption> = {}): Promise<ResDataType> {
  return axios.get('/api/question', { params: opt })
}

// 更新问卷
export function updateQuestionService(
  id: string,
  data: Partial<ResDataType>
): Promise<ResDataType> {
  return axios.patch(`/api/question/${id}`, data)
}

// 复制问卷
export function duplicateQuestionService(id: string): Promise<ResDataType> {
  return axios.post(`/api/question/duplicate/${id}`)
}

// 删除问卷
export function deleteQuestionService(id: string[]): Promise<ResDataType> {
  return axios.delete(`/api/question`, { data: id })
}
