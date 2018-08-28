import React from 'react';
import {Link} from 'react-router-dom';

import './StoriesItem.scss';

export default class StoriesItem extends React.Component {
    render() {
        let {title, images, id} = this.props.story;
        let url = '/story/' + id;
        return (
            <div className="storiesItem">
                <Link to={url} className="storiesItem-link">
                    <div className="storiesItem-image-wrapper">
                        <img src={images && images[0]} className="storiesItem-image" />
                    </div>
                    <div className="storiesItem-title">{title}</div>
                </Link>
            </div>
        );
    }
}