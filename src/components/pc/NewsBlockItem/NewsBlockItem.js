import React from 'react';
import {NavLink} from 'react-router-dom';

import './NewsBlockItem.css';

export default class NewsBlockItem extends React.Component {
    render() {
        let image = (this.props.story && this.props.story.images && this.props.story.images[0]) || (this.props.hotStory && this.props.hotStory.image);
        let title = (this.props.story && this.props.story.title) || this.props.hotStory.title;
        let date = this.props.dateString || '';
        let id = (this.props.story && this.props.story.id) || this.props.hotStory.id;
        let url = '/news/story/' + id;

        let imageEl = image? <img src={image} alt={title} className="newsblockitem_img" /> : <div className="newsblockitem_img"></div>;

        return (
            <div className="newsblockitem">
                <NavLink to={url} className="newsblockitem_wrapper">
                    {imageEl}
                    <p className="newsblockitem_desc">{title}</p>
                    <span className="newsblockitem_time">{date}</span>
                </NavLink>
            </div>
        );
    }
}