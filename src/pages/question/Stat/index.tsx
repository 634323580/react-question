import useLoadQuestionDetail from '/@/hooks/useLoadQuestionDetail'

const Stat: React.FC = () => {
  const { loading, data } = useLoadQuestionDetail()
  return (
    <div>
      <p>Stat</p>
      {loading ? '加载中...' : JSON.stringify(data)}
    </div>
  )
}

export default Stat
