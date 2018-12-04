import React from 'react';
import { render } from 'react-dom';
import { LocaleProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducer.js';
const store = createStore(reducer,
    {
        isFetching: false,
        goodsList: [{
            name: '小米8',
            price: 1399,
            imgSrc: require('./src/imges/8.jpg')
        }]
    }, applyMiddleware(thunk));

import zhCN from 'antd/lib/locale-provider/zh_CN';
import './index.less';
//引入组件
import App from './src/component/App';
render(
    <LocaleProvider locale={zhCN}>
        <Provider store={store}>
            <App />
        </Provider>
    </LocaleProvider>,
    document.getElementById('root'));