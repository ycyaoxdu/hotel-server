
const router = require('koa-router')();



router.get('/', async (ctx)=>{

    ctx.body = 'room index';

})





module.exports = router.routes();