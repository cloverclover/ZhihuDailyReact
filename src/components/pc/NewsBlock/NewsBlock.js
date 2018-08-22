import React from 'react';

import './NewsBlock.css';

import NewsBlockItem from '../NewsBlockItem/NewsBlockItem';

export default class NewsBlock extends React.Component {
    render() {
        let dateString = this.props.dateString;
        let stories = this.props.stories.map(function(item, index) {
            let id = item.id || item.news_id;
            if(index % 4 == 0) {
                return <div className="main-news-item clear" key={id}><NewsBlockItem story={item} dateString={dateString} /></div>
            } else {
                return <div className="main-news-item" key={id}><NewsBlockItem story={item} dateString={dateString} /></div>
            }
        });
        return (
            <React.Fragment>
                {stories}
            </React.Fragment>
        );
    }
}