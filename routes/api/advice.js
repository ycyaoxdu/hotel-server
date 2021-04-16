
const router = require('koa-router')();

//db
const db = require('../../module/db');



//显示信息
router.post('/', async (ctx)=>{

  ctx.body = 'advice api'
  //await console.log(ctx)
  await console.log(ctx.request)
  await console.log(ctx.request.body)

})

  
router.post('/doAdd', async (ctx)=>{
  //获取表单数据
  let data = await db.insert('advice', ctx.request.body);
  ctx.body = 'add advice success';
    console.log(data);
})
  


module.exports = router.routes();