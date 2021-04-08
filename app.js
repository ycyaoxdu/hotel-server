//引入
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
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

//配置render
render(app, {
  root: './views',
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});





//  //中间件
/**配置模板引擎 */
app.use(views('views', {
  extension:'ejs'
}));

/**bodyparser */
app.use(bodyParser());

/**static */
app.use(static('static'));


//  //


//配置路由
router.get('/', async (ctx)=>{
  //ctx.body = 'index';   //返回数据
  
  var result = await db.find('user', {});
  console.log(result);


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


//显示信息
router.get('/user', async (ctx)=>{

  var result = await db.find('user', {});

  await ctx.render('userinfo', {
    list:result 
  });

})

//管理员用户注册
router.get('/signup', async (ctx)=>{
//  let data = await db.insert('user', {"username":"zhangsan", "password":"123"});
//  console.log(data);

  await ctx.render('signup');

})
router.post('/doSignup', async (ctx)=>{
  //获取表单数据
  let data = await db.insert('user', ctx.request.body);

  try{
    if(data.result.ok){
      ctx.redirect('/')
    }
  }catch(err){
    console.log(err);
    ctx.redirect('/signup');
  }

})



//信息修改
router.get('/edit', async (ctx)=>{

  let data = await db.update('user', {"username":"zhangsan"}, {"password":"abcdef"});
  console.log(data);

})
//删除
router.get('/delete', async (ctx)=>{

  let data = await db.remove('user', {"username":"zhangsan"});
  console.log(data);

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

