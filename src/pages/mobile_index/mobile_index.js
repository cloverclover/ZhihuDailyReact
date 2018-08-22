import React from 'react';
import {Route} from 'react-router-dom';

import './mobile_index.scss';

import StoriesContainer from '../../components/mobile/StoriesContainer/StoriesContainer';

export default class MobileIndex extends React.Component {


    componentWillMount() {
        let fontSizeInit = function() {
            //获取dom节点
            let htmlDom = document.documentElement;
            //获取设备可视宽度
            let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
            htmlDom.style.fontSize = (htmlWidth / 10) + 'px';
            console.log(htmlDom.style.fontSize);
        }
        fontSizeInit();
        window.addEventListener('resize', function() {
            fontSizeInit();
        })
    }

    render() {
        return (
            <div className="mobileIndex">
                <Route path="/" exact render={
                    () => <StoriesContainer />
                } />
            </div>
        );
    }
}