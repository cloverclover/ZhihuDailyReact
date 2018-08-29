import React from 'react';


import Comments from '../Comments/Comments';

import './LongComments.scss';

export default class LongComments extends React.Component {
    render() {


        let longComments = this.props.longComments.map(function(item) {
            return <Comments comments={item} key={item.id} />
        });

        return (
            <div className="longComments">
                <div className="comments-num">{longComments.length}条长评</div>
                {longComments}
            </div>
        );
    }
}