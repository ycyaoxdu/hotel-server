const router = require('koa-router')();


const order = require('./api/order');
const index = require('./api/index');
const userinfo = require('./api/userinfo');
const advice = require('./api/advice');
const hotel = require('./api/hotel');
const pay = require('./api/pay');

router.get('/', (ctx)=>{

    ctx.body = 'server api';

})



router.use('/order', order);
router.use('/index', index);
router.use('/userinfo', userinfo);
router.use('/advice', advice);
router.use('/hotel', hotel);
router.use('/pay', pay);




module.exports = router.routes();
