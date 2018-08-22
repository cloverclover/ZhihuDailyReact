import React from 'react';

import './StoriesContainer.scss';

export default class StoriesContainer extends React.Component {
    render() {
        return (
            <div className="storiesContainer">
                < div className = "storiesContainer-header" >
                    <div className="storiesContainer-more">
                        <div className="storiesContainer-more-body"></div>
                    </div>
                    <div className="storiesContainer-title">
                        <div className="storiesContainer-title-body">首页</div>
                    </div>
                    <div className="storiesContainer-space"></div>
                    <div className="storiesContainer-remind">
                        <div className="storiesContainer-remind-body"></div>
                    </div>
                    <div className="storiesContainer-about">
                        <div className="storiesContainer-about-body"></div>
                    </div>
                </div>
            </div>
        );
    }
}