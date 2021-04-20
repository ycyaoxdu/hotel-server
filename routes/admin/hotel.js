const router = require('koa-router')();
const db = require('../../module/db');


/***
 * 
 * 待做：添加房间价格信息
*/




//显示信息
router.get('/', async (ctx) => {

  try {
    if (ctx.session.userInfo) {
      ctx.body = { code: 1, message: '已登陆' }
      //
      var result = await db.find('hotel', {});

      await ctx.render('admin/hotel/index', {
        list: result
      });
      //
    } else {
      ctx.body = { code: 0, message: '未登陆' }
      // 跳转到登录页
      ctx.redirect('/index')
    }
  } catch (err) {
    throw new Error(err)
  }



})


//信息修改
router.get('/edit', async (ctx) => {

  //  let data = await db.update('hotel', {"hotelname":"zhangsan"}, {"password":"abcdef"});
  //  console.log(data);

  //通过id获取用户
  let id = ctx.query.id;
  let data = await db.find('hotel', { "_id": db.getObjectID(id) });

  await ctx.render('admin/hotel/edit', {

    list: data[0]    //id

  });


})

router.post('/doEdit', async (ctx) => {

  var id = ctx.request.body.id;
  var {    name, telephone, address, introduction, status, decorateTime, singleRoomPrice, doubleRoomPrice
  } = ctx.request.body; 





  let data = await db.update('hotel', { "_id": db.getObjectID(id) }, {
    name, telephone, address, introduction, status, decorateTime, singleRoomPrice, doubleRoomPrice
  })

  try {
    if (data.result.ok) {

      ctx.redirect('/admin/hotel')
    }
  } catch (err) {
    console.log(err);

    ctx.redirect('/admin/hotel/edit');
  }

})


module.exports = router.routes();