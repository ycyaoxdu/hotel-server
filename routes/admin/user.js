const router = require('koa-router')();

//db
const db = require('../../module/db');



//显示信息
router.get('/', async (ctx) => {
  //超级管理员才可管理user信息
  try {
    if(ctx.session.userInfo.username == 'superadmin'){
      ctx.body = { code: 1, message: '已登陆' }
      //
      var result = await db.find('user', {});

      await ctx.render('admin/user/index', {
        list: result
      });
      //
    }else if (ctx.session.userInfo) {
      ctx.body = { code: 1, message: '已登陆' }
      //
      ctx.redirect('/admin')

    } else {
      ctx.body = { code: 0, message: '未登陆' }
      // 跳转到登录页
      ctx.redirect('/index')

    }

  } catch (err) {
    throw new Error(err)
  }


  //认证超级管理员账号密码，通过才显示不通过直接重新定向


})


//管理员用户注册
router.get('/add', async (ctx) => {
  //  let data = await db.insert('user', {"username":"zhangsan", "password":"123"});
  //  console.log(data);
  await ctx.render('admin/user/add');

})

router.post('/doAdd', async (ctx) => {
  //获取表单数据
  let data = await db.insert('user', ctx.request.body);

  try {
    if (data.result.ok) {
      ctx.redirect('/admin/user')
    }
  } catch (err) {
    console.log(err);
    ctx.redirect('/admin/user/add');
  }

})



//信息修改
router.get('/edit', async (ctx) => {

  //  let data = await db.update('user', {"username":"zhangsan"}, {"password":"abcdef"});
  //  console.log(data);

  //通过id获取用户
  let id = ctx.query.id;
  let data = await db.find('user', { "_id": db.getObjectID(id) });

  await ctx.render('admin/user/edit', {

    list: data[0]    //id

  });


})

router.post('/doEdit', async (ctx) => {

  var id = ctx.request.body.id;
  var username = ctx.request.body.username;
  var password = ctx.request.body.password;

  let data = await db.update('user', { "_id": db.getObjectID(id) }, {
    username, password
  })

  try {
    if (data.result.ok) {

      ctx.redirect('/admin/user')
    }
  } catch (err) {
    console.log(err);

    ctx.redirect('/admin/user/edit');
  }

})



//删除
router.get('/delete', async (ctx) => {
  //  let data = await db.remove('user', {"username":"zhangsan"});
  //  console.log(data);

  let id = ctx.query.id;

  var data = await db.remove('user', { "_id": db.getObjectID(id) });

  if (data) {
    ctx.redirect('/admin/user');
  }

})

//


module.exports = router.routes();