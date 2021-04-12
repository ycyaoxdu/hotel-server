//引入
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const render = require('koa-art-template');


//实例化
const app = new Koa();
const router = new Router();

//db
const db = require('./module/db');


//引入自定义模块
// const common = require('./module/common');

const admin = require('./routes/admin');
const api = require('./routes/api');

const index = require('./routes/index');






//配置render
render(app, {
  root: './views',
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});



//  //中间件

/**bodyparser */
app.use(bodyParser());

/**static */
app.use(static('statics'));

//  //


//层级路由
router.use('/', index);

router.use('/admin', admin);
router.use('/api', api);







//启动路由
app
  .use(router.routes())               /* 启动路由 */
  .use(router.allowedMethods());      /* 自动设置响应头 */

//


//启动监听，port 3000
app.listen(3000);

