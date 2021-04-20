const router = require('koa-router')();

//db
const db = require('../../module/db');



//显示信息
router.get('/', async (ctx) => {


    let data =  await db.find('hotel', {});
    console.log(data)
    ctx.body = data[0];


})


module.exports = router.routes();