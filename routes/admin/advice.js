
const router = require('koa-router')();



router.get('/', async (ctx)=>{

    ctx.body = 'advice index';

})






module.exports = router.routes();