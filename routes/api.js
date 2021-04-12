const router = require('koa-router')();




router.get('/', (ctx)=>{

    ctx.body = 'api index';

})

router.get('/user', (ctx)=>{
    
    ctx.body = 'api user';

})

router.get('/order', (ctx)=>{

    ctx.body = 'order';

})






module.exports = router.routes();
