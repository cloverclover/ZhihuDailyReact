import React from 'react';

import {convertToLocalString} from '../../../common/time';

import './StoriesList.scss';

import StoriesItem from '../StoriesItem/StoriesItem';

export default class StoriesList extends React.Component {
    render() {

        let date = convertToLocalString(this.props.stories.date);
        let stories = this.props.stories.stories.map(function (item) {
            return <StoriesItem story={item} key={item.id} />
        });

        return (
            <div className="storiesList">
                <div className="storiesList-date">
                    {date}
                </div>
                {stories}
            </div>
        );
    }
}