import React from 'react';


import './HotNewsBlock.css';

import NewsBlockItem from '../NewsBlockItem/NewsBlockItem';

export default class HotNewsBlock extends React.Component {

    componentDidMount() {
        this.props.getHotStory();
    }

    render() {
        let hotStories = this.props.hotStories.map(function(item, index) {
            if(index % 4 == 0) {
                return <div className="main-news-item clear" key={item.id}><NewsBlockItem hotStory={item} /></div>
            } else {
                return <div className="main-news-item" key={item.id}><NewsBlockItem hotStory={item} /></div>
            }
        });
        return (
            <React.Fragment>
                {hotStories}
            </React.Fragment>
        );
    }
}