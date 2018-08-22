import React from 'react';

import './ThemeContent.css';

import ThemeStories from '../ThemeStories/ThemeStories';
import Loading from '../Loading/Loading';

export default class ThemeContent extends React.Component {


    componentDidMount() {
        this.props.getThemeContent(this.props.id);
    }

    render() {

        let isLoading = this.props.themeContent.isLoading;
        let name = this.props.themeContent && this.props.themeContent.name;
        let description = this.props.themeContent && this.props.themeContent.description;
        let background = this.props.themeContent && this.props.themeContent.background;
        let image_source = this.props.themeContent && this.props.themeContent.image_source;
        let themeStories = this.props.themeContent && this.props.themeContent.stories;

        let themeContent =  (
            <React.Fragment>
                <div className="themeContent-header-wrapper">
                    <div className="themeContent-header">
                        <img className="themeContent-img" src={background} alt={name}/>
                        <h1 className="themeContent-name">{name}</h1>
                        <p className="themeContent-description">{description}</p>
                        <p className="themeContent-imageSource">{image_source}</p>
                    </div>
                </div>
                <div className="themeContent-body-wrapper">
                    <ThemeStories themeStories={themeStories} />
                </div>
            </React.Fragment>
        );

        return (
            <div className="themeContent">
                {isLoading? <Loading /> : themeContent}
            </div>
        );
    }
}
