import React from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';

import './NewsMain.css';

import NewsBlock from '../NewsBlock/NewsBlock';
import HotNewsBlock from '../HotNewsBlock/HotNewsBlock';

export default class NewsMain extends React.Component {
    render() {
        

        console.log(this.props);
        let date = this.props.currentStories.date;
        let dateObject = new Date(date.substring(0,4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8));
        const week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        let dateString = (dateObject.getMonth() + 1) + '月' + dateObject.getDate() + '日  ' + week[dateObject.getDay()];

        return (
            <div className="main">
                <div className="main-time">
                    <Route path="/" exact render={
                        () => (
                            <div className="main-time-wrapper">
                                <div className="main-before" onClick={this.props.setPreviousDate}>前一天</div>
                                <div className="main-current">{dateString}</div>
                                <div className={this.props.isToday? 'main-after main-after-border' : 'main-after'} onClick={this.props.isToday? null : this.props.setNextDate}>后一天</div>
                            </div>
                        )
                    } />
                </div>
                <div className="main-body">
                    <div className="main-nav">
                        <ul className="main-nav-wrapper">
                        <li>
                            <NavLink to="/" exact activeClassName="main-nav-active">新闻</NavLink>
                        </li>
                        <li>
                            <NavLink to="/hotnews" activeClassName="main-nav-active">热门新闻</NavLink>
                        </li>
                    </ul>
                    </div>
                    <div className="main-news">
                    <Switch>
                        <Route path="/hotnews" render={
                            () => <HotNewsBlock hotStories={this.props.hotStories} getHotStory={this.props.getHotStory} />
                        } />
                        <Route path="/" render={
                            () => <NewsBlock stories={this.props.currentStories.stories} dateString={dateString} />
                        } />
                    </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

