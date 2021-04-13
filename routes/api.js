const router = require('koa-router')();




router.get('/', (ctx)=>{

    ctx.body = 'server api';

})

router.get('/userinfo', (ctx)=>{
    
    ctx.body = 'server api userinfo';

})

router.get('/order', (ctx)=>{

    ctx.body = 'server api order';

})






module.exports = router.routes();
