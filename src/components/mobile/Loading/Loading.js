import React from 'react';

import './Loading.scss';

export default class Loading extends React.Component {
    render() {
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        return (
            <div className="loading-mobile">
                <div className="loadig-body-mobile"></div>
            </div>
        );
    }
}