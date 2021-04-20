const router = require('koa-router')();


const order = require('./api/order');
const index = require('./api/index');
const userinfo = require('./api/userinfo');
const advice = require('./api/advice');
const hotel = require('./api/hotel');


router.get('/', (ctx)=>{

    ctx.body = 'server api';

})



router.use('/order', order);
router.use('/index', index);
router.use('/userinfo', userinfo);
router.use('/advice', advice);
router.use('/hotel', hotel);





module.exports = router.routes();
