const router = require('koa-router')();

//子路由
const user = require('./admin/user');
const room = require('./admin/room');
const order = require('./admin/order');
const hotel = require('./admin/hotel');
const advice = require('./admin/advice');
//


router.get('/', (ctx)=>{

    ctx.body = 'admin index';

})


//user  submodule
router.use('/user', user);

//room submodule
router.use('/room' , room);

//order submodule
router.use('/order', order);

//hotel submodule
router.use('/hotel', hotel);

//advice submodule
router.use('/advice', advice);



module.exports = router.routes();
