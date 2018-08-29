import React from 'react';

import './ThemeContainer.scss';

import StoriesItem from '../StoriesItem/StoriesItem';
export default class ThemeContainer extends React.Component {

    componentDidMount() {
        this.props.getThemeContent(this.props.id);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.id != nextProps.id) {
            this.props.getThemeContent(nextProps.id);
        }
    }
    render() {

        let id = this.props.id;
        let {name, description, background, editors, stories} = this.props.themeContent;
        let storiesList = stories && stories.map(function(item) {
            return <StoriesItem story={item} key={item.id} themeId={id}  />
        });
        let editorsList = editors && editors.map(function(item) {
            return <img src={item.avatar} key={item.id} className="themeContainer-editors-item" />
        });

        return (
            <div className="themeContainer">
                <div className="themeContainer-header">
                    <div className="themeContainer-more" onClick={this.props.handleShowMore}>
                        <div className="themeContainer-more-body"></div>
                    </div>
                    <div className="themeContainer-title">
                        <div className="themeContainer-title-body">{name}</div>
                    </div>
                    <div className="themeContainer-space"></div>
                </div>
                <div className="themeContainer-image-wrapper">
                    <img src={background} className="themeContainer-image" />
                    <p className="themeContainer-description">{description}</p>
                </div>
                <div className="themeContainer-list-wrapper">
                    <div className="themeContainer-editors">
                        <div className="themeContainer-editors-title">主编</div>
                        <div className="themeContainer-editors-wrapper">
                            {editorsList}
                        </div>
                    </div>
                    {storiesList}
                </div>
            </div>
        );
    }
}