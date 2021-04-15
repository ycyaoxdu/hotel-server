const router = require('koa-router')();


const order = require('./api/order');
const index = require('./api/index');
const userinfo = require('./api/userinfo');


router.get('/', (ctx)=>{

    ctx.body = 'server api';

})



router.use('/order', order);
router.use('/index', index);
router.use('/userinfo', userinfo)






module.exports = router.routes();
