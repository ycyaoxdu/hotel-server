const router = require('koa-router')();

//db
const db = require('../../module/db');



//显示信息
router.post('/', async (ctx)=>{

  ctx.body = 'user info api'
  //await console.log(ctx)
  //await console.log(ctx.request)
  await console.log(ctx.request.body)

})




module.exports = router.routes();