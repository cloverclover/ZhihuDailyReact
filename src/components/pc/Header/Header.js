import React from 'react';
import {NavLink} from 'react-router-dom';

import './Header.css';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header-wrapper">
                    <h1 className="header-title">知乎日报</h1>
                    <ul className="header-nav">
                        <li>
                            <NavLink to="/news"  className="header-new" activeClassName="nav-active nav-active-new">最新消息</NavLink>
                        </li>
                        <li>
                            <NavLink to="/theme" className="header-theme" activeClassName="nav-active nav-active-theme">主题日报</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className="header-about" activeClassName="nav-active nav-active-about">关于</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}