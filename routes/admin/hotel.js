
const router = require('koa-router')();



router.get('/', async (ctx)=>{

    ctx.body = 'hotel index';

})






module.exports = router.routes();