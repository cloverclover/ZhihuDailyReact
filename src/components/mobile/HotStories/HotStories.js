import React from 'react';
import {Link} from 'react-router-dom';

import './HotStories.scss';


export default class HotStories extends React.Component {

    constructor() {
        super();
        this.state ={
            current: 0,
            timer: null
        }
        this.goNext = this.goNext.bind(this);
        this.goPrevious = this.goPrevious.bind(this);
        this.thouch = this.thouch.bind(this);
    }
    goNext() {
        this.setState((prevState, props) => {
            if(prevState.current < props.hotStories.length - 1) {
                return {
                    current: prevState.current + 1
                }
            } else {
                return {
                    current: 0,
                }
            }
        })
    }
    goPrevious() {
        this.setState((prevState, props) => {
            if(prevState.current > 0) {
                return {
                    current: prevState.current -1
                }
            } else {
                return {
                    current: 4
                }
            }
        })
    }
    thouch() {
        let dom = document.getElementsByClassName('hotStories')[0];
        let startX, startY, endX, endY, x, y;
        let that = this;//缓存this对象
        dom.addEventListener('touchstart', function (e) {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
            clearInterval(that.state.timer);
        });
        dom.addEventListener('touchend', function (e) {
            endX = e.changedTouches[0].pageX;
            endY = e.changedTouches[0].pageY;
            x = endX - startX;
            y = endY - startY;

            if (Math.abs(x) > Math.abs(y) && x > 0) {
                //console.log('right');
                that.goPrevious();
            }
            if (Math.abs(x) > Math.abs(y) && x < 0) {
                //console.log('left');
                that.goNext();
            }
            if (Math.abs(y) > Math.abs(x) && y > 0) {
                //console.log('bottom');
            }
            if (Math.abs(y) > Math.abs(x) && y < 0) {
                //console.log('top');
            }

            that.setState({
                timer: setInterval(that.goNext, 5000)
            })
        });
    }

    componentDidMount() {
        //setInterval(this.goNext, 5000);
        this.setState({
            timer: setInterval(this.goNext, 5000)
        })
        this.thouch();
    }
    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {

        //设备宽度
        let deviceWidth = document.documentElement.clientWidth || document.body.clientWidth;
        //图片个数
        let imageNum = this.props.hotStories.length;
        //图片外框的长度
        let ulWidth = imageNum * deviceWidth;
        let hotStories = this.props.hotStories.map(function(item) {
            let url = '/story/' + item.id;
            return (
                <li key={item.id} style={{width: deviceWidth}}>
                    <Link to={url} className="hotStories-link">
                        <img src={item.image} className="hotStories-image" />
                        <div className="hotStories-image-mask">
                            <p className="hotStories-title">{item.title}</p>
                        </div>
                    </Link>
                </li>
            );
        });
        let currentIndex = this.state.current;
        let hotStoriesBtn = this.props.hotStories.map(function(item, index) {
            return <li key={item.id} className={index == currentIndex? 'active': ''}></li>
        });

        return (
            <div className="hotStories">
                <ul className="hotStories-image-list" style={{width: ulWidth, left: -this.state.current * deviceWidth}} ref={node => this.img = node}>
                    {hotStories}
                </ul>
                <ul className="hotStories-image-btn">
                    {hotStoriesBtn}
                </ul>
            </div>
        );
    }
}