const router = require('koa-router')();

//子路由
const user = require('./admin/user');
const room = require('./admin/room');
const order = require('./admin/order');
const hotel = require('./admin/hotel');
const advice = require('./admin/advice');
//







//
router.get('/', async (ctx) => {


    try {
        if (ctx.session.userInfo) {
            ctx.body = { code: 1, message: '已登陆' }

            await ctx.render('admin/index');
            
        } else {
            ctx.body = { code: 0, message: '未登陆' }
            // 跳转到登录页
            ctx.redirect('/index')
        }
    } catch (err) {
        throw new Error(err)
    }

})


//user  submodule
router.use('/user', user);

//room submodule
router.use('/room', room);

//order submodule
router.use('/order', order);

//hotel submodule
router.use('/hotel', hotel);

//advice submodule
router.use('/advice', advice);









module.exports = router.routes();
