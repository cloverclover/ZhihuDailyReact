import React from 'react';
import {Route, Switch} from 'react-router-dom';

import ThemeItem from '../ThemeItem/ThemeItem';
import ThemeContent from '../ThemeContent/ThemeContent';

import './ThemeContainer.css';

export default class ThemeContainer extends React.Component {

    componentDidMount() {
        this.props.getTheme();
    }

    render() {


        let theme = this.props.theme && this.props.theme.map(function(item, index) {
            if(index % 4 == 0) {
                return <div className="themeContainer-item clear" key={item.id}><ThemeItem theme={item} /></div>
            } else {
                return <div className="themeContainer-item" key={item.id}><ThemeItem theme={item} /></div>
            }
        });

        return (
            <div className="themeContainer">
                <Switch>
                    <Route path="/theme/:id" render={({match}) => <ThemeContent id={match.params.id} themeContent={this.props.themeContent} getThemeContent={this.props.getThemeContent} />} />
                    <Route path="/theme" render={() => <div className="themeContainer-wrapper">{theme}</div>} />
                </Switch>
            </div>
        );
    }
}