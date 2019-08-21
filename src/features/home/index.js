import React from 'react';
import { Redirect } from 'react-router-dom';
import HomeHeader from './components/HomeHeader';
import HomeContent from './components/HomeContent';
import HomeFooter from './components/HomeFooter';
import styles from './index.css'
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;


function Home() {
  return (
    <Redirect to={{
      pathname: '/login',
    }}/>
  )
}

function test() {
  return (
    <Layout>
      <Header className={styles.header}>
        <HomeHeader />
      </Header>

      <Content>
        <HomeContent />
      </Content>

      <Footer>
        <HomeFooter />
      </Footer>
    </Layout>
  )
}

export default Home;