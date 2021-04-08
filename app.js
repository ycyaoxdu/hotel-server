//引入
const Koa = require('koa');
const Router = require('koa-router');


//实例化
const app = new Koa();
const router = new Router();


//配置路由
router.get('/', async (ctx)=>{

  ctx.body = 'index';   //返回数据

}).get('/new', async (ctx)=>{

  console.log(ctx.query);
  console.log(ctx.querystring);
  console.log(url);

  ctx.body = 'new';

}).get('/newscontent/:aid', async (ctx)=>{    //获取动态路由
  console.log(ctx.params);
  ctx.body='test';
})


//

//启动路由
app
  .use(router.routes())               /* 启动路由 */
  .use(router.allowedMethods());      /* 自动设置响应头 */

//


//中间件

//





//启动监听，port 3000
app.listen(3000);

