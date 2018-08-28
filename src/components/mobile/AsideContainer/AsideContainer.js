import React from 'react';
import {NavLink} from 'react-router-dom';

import './AsideContainer.scss';

export default class AsideContainer extends React.Component {
    constructor() {
        super();

        this.thouch = this.thouch.bind(this);
    }

    componentDidMount() {
        this.props.getTheme();
        this.thouch();
    }
    componentDidUpdate() {
        if(this.props.isAsideShow) {
            document.body.className = 'asideContainer-open';
        } else {
            document.body.className = ''
        }
    }
    thouch() {
        let dom = document.getElementsByClassName('asideContainer')[0];
        let startX, startY, endX, endY, x, y;
        let that = this;//缓存this对象
        dom.addEventListener('touchstart', function (e) {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
        });
        dom.addEventListener('touchend', function (e) {
            endX = e.changedTouches[0].pageX;
            endY = e.changedTouches[0].pageY;
            x = endX - startX;
            y = endY - startY;

            if (Math.abs(x) > Math.abs(y) && x > 0) {
                //console.log('right');
            }
            if (Math.abs(x) > Math.abs(y) && x < 0) {
                //console.log('left');
                that.props.handleShowMore(false);
            }
            if (Math.abs(y) > Math.abs(x) && y > 0) {
                //console.log('bottom');
            }
            if (Math.abs(y) > Math.abs(x) && y < 0) {
                //console.log('top');
            }
        });
    }

    render() {
        let containerStyle = {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }

        let themeList = this.props.themeList.map(function(item) {
            return <li key={item.id}><NavLink to={'/theme/' + item.id} activeClassName="active" className="asideContainer-link">{item.name}</NavLink></li>
        });
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        return (
            <div className="asideContainer" style={this.props.isAsideShow? containerStyle : null}>
                <div className="asideContainer-wrapper">
                    <div className="asideContainer-header"></div>
                    <div className="asideContainer-nav-wrapper">
                        <ul className="asideContainer-nav"   onClick={() => {this.props.handleShowMore(false)}}>
                            <li>
                                <NavLink to="/" exact activeClassName="active" className="asideContainer-index-link">首页</NavLink>
                            </li>
                            {themeList}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}