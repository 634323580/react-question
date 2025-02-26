import useLoadQuestionDetail from '/@/hooks/useLoadQuestionDetail'

const Edit: React.FC = () => {
  const { loading, data } = useLoadQuestionDetail()
  return (
    <div>
      <p>Edit</p>
      {loading ? '加载中...' : JSON.stringify(data)}
    </div>
  )
}

export default Edit
