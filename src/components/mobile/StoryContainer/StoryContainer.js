import React from 'react';
import {Route, Link} from 'react-router-dom';

import './StoryContainer.scss';

import CommentsContainer from '../CommentsContainer/CommentsContainer';

export default class StoryContainer extends React.Component {
    constructor() {
        super();

        this.handleBack = this.handleBack.bind(this);
    }

    handleBack() {
        let search = this.props.location.search;
        if(search) {
            let themeId = search.replace('?', '').split('=')[1];
            this.props.history.push('/theme/' +themeId);
        } else {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        this.container.scrollIntoView();
        this.props.getStoryContent(this.props.id);
    }

    render() {

        let {title, image, body, image_source, css, id} = this.props.storyContent.story;
        let {longComments, shortComments, popularity, comments} = this.props.storyExtra;

        let storyContent = (
            <React.Fragment>
                <div className="storyContainer-header">
                    <div className="storyContainer-back" onClick={this.handleBack}>
                        <div className="storyContainer-back-body"></div>
                    </div>
                    <div className="storyContainer-space"></div>
                    <div className="storyContainer-share">
                        <div className="storyContainer-share-body"></div>
                    </div>
                    <div className="storyContainer-collect">
                        <div className="storyContainer-collect-body"></div>
                    </div>
                    <Link to={'/story/' + id + '/comments'} className="storyContainer-comment">
                        <div className="storyContainer-comment-body">{comments}</div>
                    </Link>
                    <div className="storyContainer-like">
                        <div className="storyContainer-like-body">{popularity}</div>
                    </div>
                </div>
                <div className="storyContainer-image-wrapper">
                    <img src={image} className="storyContainer-image" />
                    <p className="storyContainer-title">{title}</p>
                    <p className="storyContainer-image-source">{image_source}</p>
                </div>
                <div className="storyContainer-body" dangerouslySetInnerHTML={{__html: body}}></div>
                <link rel="stylesheet" href={css} />
            </React.Fragment>
        );

        return (
            <div className="storyContainer" ref={el => {this.container = el}}>
                <Route path="/story/:id/comments" render={
                    ({match, history}) => <CommentsContainer 
                    longComments={this.props.longComments} 
                    shortComments={this.props.shortComments}
                    getLongComments={this.props.getLongComments}
                    commentsNum={comments}
                    match={match} 
                    history={history}
                    />
                } />
                <Route path="/story/:id" exact render={
                    () => storyContent
                } />
            </div>
        );
    }
}