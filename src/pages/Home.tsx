import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '/@/router/index'
import style from './Home.module.scss'
import '../_mock/index'
import { useEffect } from 'react'
import { getQuestionService } from '/@/services/question'

const { Title, Paragraph } = Typography

const Home: React.FC = () => {
  const nav = useNavigate()

  useEffect(() => {
    getQuestionService('123').then(res => {
      console.log(res)
    })
  }, [])

  return (
    <div className={style.container}>
      <div className={style.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷100份，发布问卷90份，收到答卷 980份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
