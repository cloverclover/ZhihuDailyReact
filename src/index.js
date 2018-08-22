import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import store from './redux/index';

import './index.css';

import PCIndex from './pages/pc_index/pc_index';

store.subscribe(function(){
    console.log(store.getState());
})

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PCIndex />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);