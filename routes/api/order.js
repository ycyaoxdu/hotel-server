const router = require('koa-router')();

//db
const db = require('../../module/db');




//显示信息
router.get('/', async (ctx)=>{

  let id = ctx.request.body.openid;
  var result = await db.find('user', { "openid" : id});
  ctx.body = result;

})


//add
router.post('/doAdd', async (ctx)=>{
  //获取表单数据
  let data = await db.insert('user', ctx.request.body);

  console.log(data);

})

    

//信息修改
router.get('/edit', async (ctx)=>{

//  let data = await db.update('user', {"username":"zhangsan"}, {"password":"abcdef"});
//  console.log(data);

  //通过id获取用户
  let id = ctx.query.id;
  let data = await db.find('user', {"_id":db.getObjectID(id)});

 


})

router.post('/doEdit', async (ctx)=>{

  var id = ctx.request.body.id;
  var username = ctx.request.body.username;


  let data = await db.update('user', {"_id":db.getObjectID(id)}, {
    username, password
  } )



})



//删除
router.get('/delete', async (ctx)=>{
//  let data = await db.remove('user', {"username":"zhangsan"});
//  console.log(data);

  let id = ctx.query.id;

  var data = await db.remove('user', {"_id":db.getObjectID(id)});


  
})

//



module.exports = router.routes();