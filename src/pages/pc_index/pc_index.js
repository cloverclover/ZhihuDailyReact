import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';

import './pc_index.css'
import {getStory, getHotStory} from '../../redux/story';
import {setNextDate, setPreviousDate} from '../../redux/dataconfig';
import {getStoryContent} from '../../redux/storyContent';
import {getTheme} from '../../redux/theme'
import {getThemeContent} from '../../redux/themeContent';

import Header from '../../components/pc/Header/Header';
import NewsMain from '../../components/pc/NewsMain/NewsMain';
import StoryContent from '../../components/pc/StoryContent/StoryContent';
import ThemeContainer from '../../components/pc/ThemeContainer/ThemeContainer';

class PCIndex extends React.Component {

    /*
    componentWillMount() {
        this.props.history.push('/news/news');
    }
    */
    componentDidMount() {
        this.props.loadStory();
        //this.props.history.push('/news');
    }

    render() {
        return (
            <div className="news_pc">
                <Header />
                <Switch>
                    <Route path="/news/story/:id" render={({match}) => 
                            <StoryContent 
                            storyContent={this.props.storyContent} 
                            id={match.params.id} 
                            getStoryContent={this.props.getStoryContent}
                            />
                            }
                    />
                    <Route path="/theme" render={
                            () => <ThemeContainer 
                            getTheme={this.props.getTheme} 
                            getThemeContent={this.props.getThemeContent} 
                            theme={this.props.theme} 
                            themeContent={this.props.themeContent} 
                            />
                    } />

                    <Route path="/" render={() => 
                            <NewsMain 
                            currentStories={this.props.currentStories} 
                            isToday={this.props.isToday} 
                            hotStories={this.props.hotStories} 
                            setNextDate={this.props.setNextDate}
                            setPreviousDate={this.props.setPreviousDate}
                            getHotStory={this.props.getHotStory}
                            />} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentStories: state.story.currentStories,
        isToday: state.dataConfig.isToday,
        hotStories: state.story.hotStories,
        storyContent: state.storyContent,
        theme: state.theme.theme,
        themeContent: state.themeContent
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadStory: () => {
            dispatch(getStory())
        },
        setNextDate: () => {
            dispatch(setNextDate())
        },
        setPreviousDate: () => {
            dispatch(setPreviousDate())
        },
        getHotStory: () => {
            dispatch(getHotStory())
        },
        getStoryContent: (id) => {
            dispatch(getStoryContent(id))
        },
        getTheme: () => {
            dispatch(getTheme())
        },
        getThemeContent: (id) => {
            dispatch(getThemeContent(id))
        }

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PCIndex));