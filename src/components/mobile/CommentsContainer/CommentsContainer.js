import React from 'react';

import './CommentsContainer.scss';

import LongComments from '../LongComments/LongComments';
import ShortComments from '../ShortCommnents/ShortComments';

export default class CommentsContainer extends React.Component {
    constructor() {
        super();
        this.handleBack = this.handleBack.bind(this);
    }

    handleBack() {
        let id = this.props.match.params.id
        this.props.history.push('/story/' + id);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getLongComments(id);
    }

    render() {



        return (
            <div className="commentsContainer">
                <div className="commentsContainer-header">
                    <div className="commentsContainer-back" onClick={this.handleBack}>
                        <div className="commentsContainer-back-body"></div>
                    </div>
                    <div className="commentsContainer-num">{this.props.commentsNum}条点评</div>
                    <div className="commentsContainer-space"></div>
                    <div className="commentsContainer-write">
                        <div className="commentsContainer-write-body"></div>
                    </div>
                </div>
                <LongComments longComments={this.props.longComments} />
                <ShortComments shortComments={this.props.shortComments} />
            </div>
        );
    }
}