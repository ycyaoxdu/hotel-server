const router = require('koa-router')();
const { name } = require('ejs');
const db = require('../module/db');



router.get('/', async (ctx)=>{

//    ctx.body = 'index !';

    await ctx.render('default/index');

})

//注意写法，相比后台少了斜杠


router.post('/login', async (ctx)=>{

    try {
        const data = ctx.request.body
        const { username, password } = data

        var result = await db.find('user', { "username" : username });

        if (password == result[0].password) {
          // 保存登录状态，这句代码会在浏览器中生成一个以 "koa:sess" 为 Name 的 cookie
          ctx.session.userInfo = {username: username, userID: ''}
          ctx.body = {code: 1, message: '登陆成功'}
          ctx.redirect('/admin');
        } else {
          ctx.body = {code: 0, message: '账号或密码错误'}
          ctx.redirect('/')
        }
      } catch(err) {
        throw new Error(err)
      }

      console.log(ctx.session)
})


router.get('/logout', async (ctx)=>{
    try {
        // 将登录信息清空
        ctx.session = null
        // 跳转到登录页或网站首页
        ctx.redirect('/')
        console.log('logout')
      } catch(err) {
        throw new Error(err)
      }
})
  


module.exports = router.routes();
