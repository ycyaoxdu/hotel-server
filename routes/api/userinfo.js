const router = require('koa-router')();

//db
const db = require('../../module/db');



//显示信息
router.get('/', async (ctx)=>{

  var result = await db.find('userinfo', {});

  await ctx.render('api/userinfo/index', {
    list:result 
  });

})




module.exports = router.routes();