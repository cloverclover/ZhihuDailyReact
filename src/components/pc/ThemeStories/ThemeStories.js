import React from 'react';

import './ThemeStories.css';

import NewsBlockItem from '../NewsBlockItem/NewsBlockItem';

export default class ThemeStories extends React.Component {
    render() {

        let themeStories = this.props.themeStories && this.props.themeStories.map(function(item, index) {
            if(index % 3 == 0) {
                return <div className="themeStories-item clear" key={item.id}><NewsBlockItem story={item} /></div>
            } else {
                return <div className="themeStories-item" key={item.id}><NewsBlockItem story={item} /></div>
            }
        });

        return (
            <React.Fragment>
                {themeStories}
            </React.Fragment>
        );
    }
}