import React from 'react';

import './ShortComments.scss';

import Comments from '../Comments/Comments';

export default class ShortComments extends React.Component {
    render() {
        let shortComments = this.props.shortComments.map(function(item) {
            return <Comments comments={item} />
        });
        return (
            <div className="shortComments">
                <div className="comments-num">{shortComments.length}条短评</div>
                {shortComments}
            </div>
        );
    }
}