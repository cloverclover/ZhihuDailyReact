import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import store from './redux/index';

import './index.css';

import PCIndex from './pages/pc_index/pc_index';
import MobileIndex from './pages/mobile_index/mobile_index';

store.subscribe(function(){
    console.log(store.getState());
})

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <MobileIndex />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);