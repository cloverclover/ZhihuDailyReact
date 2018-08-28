import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import MediaQuery from 'react-responsive';

import store from './redux/index';

import './index.css';

import PCIndex from './pages/pc_index/pc_index';
import MobileIndex from './pages/mobile_index/mobile_index';

console.log('store init', store.getState().story.storiesList)
store.subscribe(function(){
    console.log('store change', store.getState().story.storiesList);
})

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.Fragment>
                <MediaQuery query="(min-device-width: 1224px)">
                    <PCIndex />
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1224px)">
                    <MobileIndex />
                </MediaQuery>
            </React.Fragment>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);