import React from 'react';

import './StoryContent.css';

import Loading from '../Loading/Loading';

export default class StoryContent extends React.Component {

    componentWillMount() {
        this.props.getStoryContent(this.props.id);
    }

    render() {

        console.log('storyContent: ' ,this.props.storyContent.story);
        let {image, images, title, image_source: imageSource, body, css} = this.props.storyContent.story;
        let isLoading = this.props.storyContent.isLoading;
/*
        let image = this.props.storyContent && this.props.storyContent.image;
        let title = this.props.storyContent && this.props.storyContent.title;
        let imageSource = this.props.storyContent && this.props.storyContent.image_source;
        let body = this.props.storyContent && this.props.storyContent.body;
        let css = this.props.storyContent && this.props.storyContent.css && this.props.storyContent.css[0];
*/
        let storyContent = (
            <div className="storyContent">
                <div className="storyContent-image-wrapper">
                    <img src={image || images} className="storyContent-image" />
                    <h1 class="storyContent-title">{title}</h1>
                    <p class="storyContent-imageSource">{imageSource? '图片：' + imageSource : ''}</p>
                </div>
                <div dangerouslySetInnerHTML={{__html: body}} className="storyContent_body"></div>
                <style>{css}</style>
            </div>
        );
        return (
            <div className="storyContent">
                {isLoading? <Loading /> : storyContent}
            </div>
        );
    }
}