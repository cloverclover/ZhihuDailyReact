import React from 'react';

import './StoriesContainer.scss';

import HotStories from '../HotStories/HotStories';
import StoriesList from '../StoriesList/StoriesList';

export default class StoriesContainer extends React.Component {
    constructor() {
        super();
        this.state={
            isBottom: false
        }
        this.loadMore = this.loadMore.bind(this);
        this.handleMore = this.handleMore.bind(this);

    }
    handleMore() {
        this.props.handleShowMore(true);
    }
    loadMore() {
        //获取滚动条的位置
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //获取可视范围的高度
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //获取文档完整高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        /*
        console.log('scrollTop', scrollTop);
        console.log('clientHeight', clientHeight);
        console.log('scrollHeight', scrollHeight);
        console.log(scrollTop + clientHeight);
        */
        //判断是否到了底部,减1为消除误差
        if (scrollTop + clientHeight >= scrollHeight - 1) {
            if (!this.state.isBottom) {
                this.setState({
                    isBottom: true
                });
                this.props.setPreviousDate();
            }
        } else {
            this.setState({
                isBottom: false
            });
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.loadMore);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }

    render() {


        //console.log('storiesList-StoriesContainer', this.props.storiesList);
        let storiesList = this.props.storiesList && this.props.storiesList.map(function(item) {
            return <StoriesList stories={item} key={item.date} />
        });

        return (
            <div className="storiesContainer" ref={this.props.storiesContainerRef}>
                <div className="storiesContainer-header">
                    <div className="storiesContainer-more" onClick={this.handleMore}>
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