const router = require('koa-router')();




router.get('/', async (ctx)=>{

//    ctx.body = 'index !';

    await ctx.render('default/index');


})
//注意写法，相比后台少了斜杠
router.get('user', async (ctx)=>{
//    ctx.body = 'user';

    await ctx.render('default/user');


})





module.exports = router.routes();
