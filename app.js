//引入
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const render = require('koa-art-template');
const session = require('koa-session');



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

//session
app.keys = ['login secret'];

const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};



//
app.use(session(CONFIG, app));


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

router.get('/', async (ctx)=>{
  ctx.redirect('/admin')
})

//层级路由
router.use('/index', index);

router.use('/admin', admin);
router.use('/api', api);







//启动路由
app
  .use(router.routes())               /* 启动路由 */
  .use(router.allowedMethods());      /* 自动设置响应头 */

//


//启动监听，port 3000
app.listen(3000);

