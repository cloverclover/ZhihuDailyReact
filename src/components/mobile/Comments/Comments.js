import React from 'react';

import './Comments.scss';

export default class Comments extends React.Component {
    render() {
        let {author, content, avatar, time, reply_to, likes} = this.props.comments;
        return (
            <div className="comments">
                <div className="comments-item">
                    <div className="comments-icon">
                        <img src={avatar} className="comments-icon-image" />
                    </div>
                    <div className="comments-body">
                        <div className="comments-body-header">
                            <span className="comments-body-name">{author}</span>
                            <span className="comments-body-like">{likes}</span>
                        </div>
                        <div className="comments-body-content">{content}</div>
                        <div className="comments-body-time">{time}</div>
                    </div>
                </div>
            </div>
        );
    }
}