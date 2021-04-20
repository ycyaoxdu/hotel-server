const router = require('koa-router')();

//db
const db = require('../../module/db');




//显示信息
router.get('/', async (ctx) => {

  try {
    if (ctx.session.userInfo) {
      ctx.body = { code: 1, message: '已登陆' }
      //
      var result = await db.find('advice', {});

      await ctx.render('admin/advice/index', {
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

//删除
router.get('/delete', async (ctx) => {
  //  let data = await db.remove('user', {"username":"zhangsan"});
  //  console.log(data);

  let id = ctx.query.id;

  var data = await db.remove('advice', { "_id": db.getObjectID(id) });

  if (data) {
    ctx.redirect('/admin/advice');
  }

})

//


module.exports = router.routes();