# ZhihuDailyReact
## 说明：
---
仿知乎日报React版
参考的API: [知乎日报API分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)

项目部分截图如下：

首页：
![首页截图](http://thyrsi.com/t6/361/1534909794x-1566688712.jpg)

热门新闻：
![热门新闻](http://thyrsi.com/t6/361/1534910091x1822611401.jpg)

主题日报：
![主题日报](http://thyrsi.com/t6/361/1534915144x-1404755516.jpg)
## 依赖
---
* 框架：React
* 前端路由：React-Router
* 数据：Redux
* HTTP请求：fetch

## 遇到问题以及解决办法
---
### 知乎API问题
#### 1. API不支持跨域
参考的知乎API是不支持跨域的，所以需要用后台转发请求。

解决方案：后台使用koa2+koa2-cors+request-promise将请求转发，代码如下，源代码在server/server.js中。
```
const koa = require('koa');
const cors = require('koa2-cors');
const requestPromise = require('request-promise');

const baseUrl = 'http://news-at.zhihu.com';

const app = new koa();

app.use(cors({
    origin: function() {
        return '*';
    }
}));

const main = async (ctx, next) => {
    const pathname = ctx.request.path;
    ctx.response.type = 'json';
    ctx.response.body = JSON.parse(await requestPromise(baseUrl + pathname));
}

app.use(main);
app.listen(8086);
console.log('app start at port 8086....');
```
### 2.图片防盗链问题
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

待续。。。
