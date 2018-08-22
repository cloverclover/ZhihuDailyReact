import React from 'react';

import './Loading.css';
import loading from './loading.gif';

export default class Loading extends React.Component {
    render() {
        return (
            <div className="loading">
                <div className="loading-wrapper">
                    <div class="loading-text">加载中</div>
                </div>
            </div>
        );
    }
}