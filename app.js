//引入
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');

//实例化
const app = new Koa();
const router = new Router();


//引入自定义模块
// const common = require('./module/common');




//  //中间件
/**配置模板引擎 */
app.use(views('views', {
  extension:'ejs'
}));

/**bodyparser */
app.use(bodyParser());


//  //


//配置路由
router.get('/', async (ctx)=>{
  //ctx.body = 'index';   //返回数据
  
  let title = "nihao";
  await ctx.render('index', {
    title:title
  });

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

router.post('/add', async (ctx)=>{
  /**获取表单提交的数据(原生方法) */
//  var data = await common.getPostData(ctx);
//  console.log(data);
//  ctx.body = data;

  ctx.body = ctx.request.body;  //获取表单提交数据

})





//启动路由
app
  .use(router.routes())               /* 启动路由 */
  .use(router.allowedMethods());      /* 自动设置响应头 */

//







//启动监听，port 3000
app.listen(3000);

