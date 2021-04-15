const router = require('koa-router')();

//db
const db = require('../../module/db');



//显示信息
router.post('/', async (ctx)=>{

  ctx.body = 'user info api'
  //await console.log(ctx)
  await console.log(ctx.request)
  await console.log(ctx.request.body)

})

//信息修改
router.post('/edit', async (ctx)=>{

  //  let data = await db.update('user', {"username":"zhangsan"}, {"password":"abcdef"});
  //  console.log(data);
  
    //通过id获取用户
    let id = ctx.request.body.openid;
    let data = await db.find('userinfo', {"openid": id });

    ctx.body = data ;
  
  
  })
  
  //
  router.post('/doEdit', async (ctx)=>{
  
    var id = ctx.request.body.openid;
    var name = ctx.request.body.name;
    var phonenumber = ctx.request.body.phonenumber;
  
    let data = await db.update('userinfo', {"openid":id}, {
      name, phonenumber
    } )
    
    ctx.body = 'edit success';
    
    console.log(ctx.request.body);

  })


module.exports = router.routes();