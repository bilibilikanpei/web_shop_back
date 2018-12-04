import React, { Component } from 'react';
import { Layout, Menu, Pagination } from 'antd';
const { Header, Content, Footer } = Layout;

import GoodsList from './GoodList';
import AddModle from './AddModule';

class app extends Component {
    render() {
        return (
            <Layout className="layout">
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

export default app;