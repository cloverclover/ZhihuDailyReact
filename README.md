# ZhihuDailyReact
## 说明：
---
仿知乎日报React版

参考的API: [知乎日报API分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)

项目预览地址：[预览地址](http://134.175.8.131:8082/) (PC端和移动端都是这个地址，移动端用手机访问或f12打开设备模拟器，请刷新)

项目部分截图如下：
#### PC端

首页：

![首页截图](http://thyrsi.com/t6/369/1536548575x-1566675128.jpg)

主题日报：

![主题日报](http://thyrsi.com/t6/369/1536548676x-1922733639.jpg)

#### 移动端
移动端首页：

![移动端首页](http://thyrsi.com/t6/369/1536548702x-1922733639.png)

移动端新闻内容：

![移动端新闻内容](http://thyrsi.com/t6/369/1536548771x-1922735314.png)

移动端主题日报：

![移动端主题日报](http://thyrsi.com/t6/369/1536548806x-1922735314.png)

## 依赖
---
* 框架：React 16
* 前端路由：React-Router 4.0
* 数据：Redux
* HTTP请求：whatwg-fetch（外加es6-promise兼容ie）
* 移动端UI：REM布局+flex
* 移动端css预处理：sass
* 设备判断：react-responsive

## 遇到问题以及解决办法
---
### 知乎API问题
#### 1. API不支持跨域
参考的知乎API是不支持跨域的，所以需要用后台转发请求。

解决方案：后台使用koa2+koa2-cors+axios将请求转发，代码如下，源代码在server/server.js中。
```
const koa = require('koa');
const cors = require('koa2-cors');
const axios = require('axios');

const baseUrl = 'http://news-at.zhihu.com';

const app = new koa();

app.use(cors({
    origin: function() {
        return '*';
    }
}));

const main = async (ctx, next) => {
    const pathname = ctx.request.path;
    let res = await axios.get(baseUrl + pathname)
                .then(
                    response => {
                        if (response.headers['content-type'].indexOf('json') >= 0) {
                            return {
                                contentType: response.headers['content-type'],
                                body: response.data
                            }
                        } else {
                            return {
                                contentType: response.headers['content-type'],
                                body: response.data
                            }
                        }
                    }
                );
    ctx.response.type = res.contentType;
    ctx.response.body = res.body;
}

app.use(main);
app.listen(8086);
console.log('app start at port 8086....');
```
#### 2. 图片防盗链问题
知乎的图片会通过判断referer头，如果不是指定的域名，会返回403。

解决方案：目前通过免费的网站进行自动转储，该网站为https://images.weserv.nl/ 但是图片似乎清晰度不够。主要通过实现一个自定义的过滤器，将所有的知乎图片转到该网址：
```
export function filterImage(url) {
    return url.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
}
```
使用方法如下：
```
fetch('http://localhost:8086' + '/api/4/news/' + id)
        .then(response => response.json())
        .then(res => JSON.parse(filterImage(JSON.stringify(res))))
```
ps：后面可能会通过后端转发拦截请求来实现展示高清图片。

### 2. React-Router问题

#### 1. 在跳转到同一个路径而参数不同的链接，地址栏变化了，但是页面没有变化？

场景描述：当我从“用户推荐日报”跳转到“电影日报时”，地址栏链接变化了，而页面数据依然为“用户推荐日报”的内容。

路由一：/theme/12

路由二：/theme/3

也就是说从路由一跳转到路由二，没有重新获取数据。这个问题在vue-router中同样存在，vue是通过watch来检测$router的变化进而可以判断是否需要重新获取数据。

解决方案：

一般对于组件初始数据的获取放在componentDidMount函数中处理，这个方法只会在组件初始化时执行一次。

而从路由一跳转到路由二，使用的是同一个组件，react直接复用了，所以不会触发componentDidMount函数。

但是路由跳转后props.id变化了，会触发componentWillReceiveProps函数，所以可以在这个函数中进行再次获取数据，就可以触发更新。

### 3. 移动端适配问题

#### 1. react-responsive

```
npm i -S react-responsive
```
在代码中配置

```
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import store from './redux/index';
import './index.css';
import PCIndex from './pages/pc_index/pc_index';
import MobileIndex from './pages/mobile_index/mobile_index';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.Fragment>
                <MediaQuery query="(min-device-width: 1224px)">
                    <PCIndex />
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1224px)">
                    <MobileIndex />
                </MediaQuery>
            </React.Fragment>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
```

设置query属性后，就可以根据屏幕分辨率来决定是加载Pc端还是加载移动端的组件，PC端和移动端可以独立开发，当然redux用的是同一个。

#### 2. rem布局

关于rem布局的介绍可自行百度，此处只涉及实现部分。

首先要获取设备的宽度，根据宽度动态设置html元素的font-size值：

```
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
```

然后使用sass中的自定义函数功能把设计稿的px单位转换为rem单位，本人使用的是以自己手机截图为设计稿，使用ps量得的尺寸。

```
@function px2rem($px) {
    $rem: 40.3px;
    @return ($px / 2.675 / $rem)+rem;
}

//使用示例
.loading-mobile {
    width: 100%;
    .loadig-body-mobile {
        margin: px2rem(600px) auto;
        width: px2rem(100px);
        height: px2rem(100px);
        background-image: url(./loading.gif);
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }
}

//经过sass转换后的结果.loading-mobile {
  width: 100%; }
  .loading-mobile .loadig-body-mobile {
    margin: 5.56573rem auto;
    width: 0.92762rem;
    height: 0.92762rem;
    background-image: url(./loading.gif);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat; }
```

#### 3. 侧边栏

侧边栏的动画和事件都是js原生实现的：

![侧边栏](http://thyrsi.com/t6/369/1536548890x-1404750136.gif)

实现思路：

先通过绝对定位将侧边栏移出视野，当在首页点击左上角的按钮时，改变侧边栏的left值，然后配合之前加好的transition实现动画效果

#### 4. 滑动穿透

问题描述：侧边栏出现后，一开始使用PC端常用的mask效果时，上下滑动侧边栏底部也会一起动

解决方案：同时设置本身和body元素的css如下：

```
position: fixed;
width: 100%;
```
参考文章：[移动端滚动穿透问题完美解决方案](https://uedsky.com/2016-06/mobile-modal-scroll/)

## 结束语

如果我的项目有给你提供帮助，请帮我打颗小星星。

做完这个项目，感觉对react理解更加深刻了，不论是组件间的组织和传值，还是结合redux以及操作异步action，都更加得心应手。

个人项目难免有bug，不足之处，敬请指正，谢谢！
