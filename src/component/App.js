import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root'
import { Layout, Menu, Pagination } from 'antd';
const { Header, Content, Footer } = Layout;

import GoodsList from './GoodList';
import AddModle from './AddModule';

class App extends Component {
    render() {
        return (
            <Layout className="layout">
                {/*导航区*/}
                <Header>
                    <div className="logo"></div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                    >
                        <AddModle></AddModle>
                    </Menu>
                </Header>
                {/*内容区*/}
                <Content>
                    <div className="content">
                        <GoodsList></GoodsList>
                        <Pagination className='pagination' defaultCurrent={1} total={50}></Pagination>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
    </Footer>
            </Layout>
        );
    }
}

export default hot(App);