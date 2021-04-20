
const router = require('koa-router')();

//db
const db = require('../../module/db');

/**
 *房间状态改为下拉框
 *  */

//显示信息
router.get('/', async (ctx) => {

  try {
    if (ctx.session.userInfo) {
      ctx.body = { code: 1, message: '已登陆' }
      //
      var result = await db.find('room', {});

      await ctx.render('admin/room/index', {
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


//add
router.get('/add', async (ctx) => {
  //  let data = await db.insert('room', {"roomname":"zhangsan", "password":"123"});
  //  console.log(data);
  await ctx.render('admin/room/add');

})

router.post('/doAdd', async (ctx) => {
  //获取表单数据
  let data = await db.insert('room', ctx.request.body);

  try {
    if (data.result.ok) {
      ctx.redirect('/admin/room')
    }
  } catch (err) {
    console.log(err);
    ctx.redirect('/admin/room/add');
  }

})



//信息修改
router.get('/edit', async (ctx) => {

  //  let data = await db.update('room', {"roomname":"zhangsan"}, {"password":"abcdef"});
  //  console.log(data);

  //通过id获取用户
  let id = ctx.query.id;
  let data = await db.find('room', { "_id": db.getObjectID(id) });

  await ctx.render('admin/room/edit', {

    list: data[0]    //id

  });


})

router.post('/doEdit', async (ctx) => {

  var id = ctx.request.body.id;
  var roomName = ctx.request.body.roomName;
  var roomType = ctx.request.body.roomType;
  //var roomPrice = ctx.request.body.roomPrice;
  var roomStatus = ctx.request.body.roomStatus;

  let data = await db.update('room', { "_id": db.getObjectID(id) }, {
    roomName, roomType, roomStatus
  })

  try {
    if (data.result.ok) {

      ctx.redirect('/admin/room')
    }
  } catch (err) {
    console.log(err);

    ctx.redirect('/admin/room/edit');
  }

})



//删除
router.get('/delete', async (ctx) => {
  //  let data = await db.remove('room', {"roomname":"zhangsan"});
  //  console.log(data);

  let id = ctx.query.id;

  var data = await db.remove('room', { "_id": db.getObjectID(id) });

  if (data) {
    ctx.redirect('/admin/room');
  }

})

//


module.exports = router.routes();