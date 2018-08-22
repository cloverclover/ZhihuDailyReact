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