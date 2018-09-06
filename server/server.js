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
    //ctx.response.type = 'json';
    //ctx.response.body = JSON.parse(await requestPromise(baseUrl + pathname));
    //ctx.response.body = await requestPromise(baseUrl + pathname);
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