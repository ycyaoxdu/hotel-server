const router = require('koa-router')();

//db
const db = require('../../module/db');



//显示信息
router.get('/', async (ctx)=>{

  ctx.body = 'hello api';

})




module.exports = router.routes();