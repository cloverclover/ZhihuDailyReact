import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './mobile_index.scss';

import {getStory, getHotStory} from '../../redux/story';
import {setPreviousDate} from '../../redux/dataconfig';

import StoriesContainer from '../../components/mobile/StoriesContainer/StoriesContainer';

class MobileIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            isBottom: false
        }
        this.loadMore = this.loadMore.bind(this);
    }

    componentWillMount() {
        let fontSizeInit = function() {
            //获取dom节点
            let htmlDom = document.documentElement;
            //获取设备可视宽度
            let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
            htmlDom.style.fontSize = (htmlWidth / 10) + 'px';
            console.log(htmlDom.style.fontSize);
        }
        fontSizeInit();
        window.addEventListener('resize', function() {
            fontSizeInit();
        })
    }
    componentDidMount() {
        this.props.getStory();
        this.props.getHotStory();
        window.addEventListener('scroll', this.loadMore);
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
        if(scrollTop + clientHeight >= scrollHeight - 1) {
            if(!this.state.isBottom) {
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

    render() {
        return (
            <div className="mobileIndex">
                <Route path="/" exact render={
                    () => <StoriesContainer 
                    getStory={this.props.getStory} 
                    storiesList={this.props.storiesList} 
                    hotStories={this.props.hotStories}
                    />
                } />
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('redux state', state);
    return {
        storiesList: state.story.storiesList,
        hotStories: state.story.hotStories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStory: () => { dispatch(getStory()) },
        setPreviousDate: () => { dispatch(setPreviousDate()) },
        getHotStory: () => { dispatch(getHotStory()) }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileIndex));