import React from 'react';

import './StoriesContainer.scss';

import HotStories from '../HotStories/HotStories';
import StoriesList from '../StoriesList/StoriesList';

export default class StoriesContainer extends React.Component {
    render() {


        //console.log('storiesList-StoriesContainer', this.props.storiesList);
        let storiesList = this.props.storiesList && this.props.storiesList.map(function(item) {
            return <StoriesList stories={item} key={item.date} />
        });

        return (
            <div className="storiesContainer">
                <div className="storiesContainer-header">
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
                <div className="hotStories-wrapper">
                    <HotStories hotStories={this.props.hotStories} />
                </div>
                <div className="storiesList-wrapper">
                    {storiesList}
                </div>
            </div>
        );
    }
}