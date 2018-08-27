import React from 'react';

import './StoriesItem.scss';

export default class StoriesItem extends React.Component {
    render() {
        let {title, images} = this.props.story;
        return (
            <div className="storiesItem">
                <div className="storiesItem-image-wrapper">
                    <img src={images[0]} className="storiesItem-image" />
                </div>
                <div className="storiesItem-title">{title}</div>
            </div>
        );
    }
}