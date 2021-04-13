const order = require('./api/order');

const router = require('koa-router')();




router.get('/', (ctx)=>{

    ctx.body = 'server api';

})

router.get('/index', (ctx)=>{
    
    ctx.body = 'server api index';

})

router.get('/userinfo', (ctx)=>{
    
    ctx.body = 'server api userinfo';

})

router.use('/order', order);






module.exports = router.routes();
