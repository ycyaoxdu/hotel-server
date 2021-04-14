const router = require('koa-router')();


const order = require('./api/order');
const index = require('./api/index');


router.get('/', (ctx)=>{

    ctx.body = 'server api';

})


router.get('/userinfo', (ctx)=>{
    
    ctx.body = 'server api userinfo';

})

router.use('/order', order);
router.use('/index', index);






module.exports = router.routes();
