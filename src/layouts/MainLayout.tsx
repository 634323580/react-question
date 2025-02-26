import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import style from './MainLayout.module.scss'
import { Layout } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={style.header}>
        <div className={style.left}>
          <Logo />
        </div>
        <div className={style.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={style.main}>
        <Outlet />
      </Content>
      <Footer className={style.footer}>小鹏问卷 &copy; 2023 - present , Created by 双越老师</Footer>
    </Layout>
  )
}

export default MainLayout
