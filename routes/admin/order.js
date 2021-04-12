
const router = require('koa-router')();



router.get('/', async (ctx)=>{

    ctx.body = 'order index';

})






module.exports = router.routes();