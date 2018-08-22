import React from 'react';
import {Link} from 'react-router-dom';

import './ThemeItem.css';

export default class ThemeItem extends React.Component {
    render() {

        let id = this.props.theme && this.props.theme.id;
        let name = this.props.theme && this.props.theme.name;
        let description = this.props.theme && this.props.theme.description;
        let thumbnail = this.props.theme && this.props.theme.thumbnail;
        let url = "/theme/" + id;

        return (
            <div className="themeItem">
                <Link to={url} className="themeItem-wrapper">
                    <img src={thumbnail} alt={name} className="themeItem-img" />
                    <p className="themeItem-name">{name}</p>
                    <p className="themeItem-description">{description}</p>
                </Link>
            </div>
        );
    }
}