const Koa = require('koa');
const app = new Koa();

//配置路由

//中间件



app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);

