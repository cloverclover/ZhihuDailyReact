import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './mobile_index.scss';

import {getStory, getHotStory} from '../../redux/story';
import {setPreviousDate} from '../../redux/dataconfig';
import {getStoryContent} from '../../redux/storyContent';
import {getLongComments} from '../../redux/comment';
import {getTheme} from '../../redux/theme';
import {getThemeContent} from '../../redux/themeContent';

import StoriesContainer from '../../components/mobile/StoriesContainer/StoriesContainer';
import StoryContainer from '../../components/mobile/StoryContainer/StoryContainer';
import AsideContainer from '../../components/mobile/AsideContainer/AsideContainer';
import ThemeContainer from '../../components/mobile/ThemeContainer/ThemeContainer';

class MobileIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            isAsideShow: false,
        }
        this.handleShowMore = this.handleShowMore.bind(this);
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
    }

    handleShowMore(isShow) {
        this.setState({
            isAsideShow: isShow
        })
    }

    render() {
        return (
            <div className="mobileIndex">
                <AsideContainer 
                    themeList={this.props.themeList}
                    getTheme={this.props.getTheme}
                    isAsideShow={this.state.isAsideShow}
                    handleShowMore={this.handleShowMore}
                    />
                <Route path="/theme/:id" render={
                    ({match}) => <ThemeContainer 
                    getThemeContent={this.props.getThemeContent} 
                    themeContent={this.props.themeContent}
                    id={match.params.id}
                    handleShowMore={this.handleShowMore}
                    />
                } />
                <Route path="/story/:id" render={
                    ({match, history, location}) => <StoryContainer 
                    getStoryContent={this.props.getStoryContent} 
                    getLongComments={this.props.getLongComments} 
                    storyContent={this.props.storyContent} 
                    storyExtra={this.props.storyExtra} 
                    longComments={this.props.longComments}
                    shortComments={this.props.shortComments}
                    id={match.params.id} 
                    history={history} 
                    location={location}
                    />
                } />
                <Route path="/" exact render={
                    ({history}) => <StoriesContainer 
                    getStory={this.props.getStory} 
                    storiesList={this.props.storiesList} 
                    hotStories={this.props.hotStories}
                    history={history}
                    storiesContainerRef={el => this.storiesContainerElement = el}
                    handleShowMore={this.handleShowMore}
                    setPreviousDate={this.props.setPreviousDate}
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
        hotStories: state.story.hotStories,
        storyContent: state.storyContent,
        storyExtra: state.comment.storyExtra,
        longComments: state.comment.longComments,
        shortComments: state.comment.shortComments,
        themeList: state.theme.theme,
        themeContent: state.themeContent
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStory: () => { dispatch(getStory()) },
        setPreviousDate: () => { dispatch(setPreviousDate()) },
        getHotStory: () => { dispatch(getHotStory()) },
        getStoryContent: (id) => { dispatch(getStoryContent(id)) },
        getLongComments: (id) => { dispatch(getLongComments(id)) },
        getTheme: () => { dispatch(getTheme()) },
        getThemeContent: (id) => { dispatch(getThemeContent(id)) }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileIndex));