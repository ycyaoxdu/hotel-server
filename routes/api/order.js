const router = require('koa-router')();

//db
const db = require('../../module/db');




//显示信息
router.get('/', async (ctx)=>{

  let id = ctx.request.body.openid;
  var result = await db.find('order', { "openid" : id});
  ctx.body = result;

})


//add
router.post('/doAdd', async (ctx)=>{
  console.log(ctx.request.body)
  //获取表单数据
  let data = await db.insert('order', ctx.request.body);

  ctx.body = 'create order success';
  console.log(data);

})

    

//信息修改
router.post('/edit', async (ctx)=>{

//  let data = await db.update('order', {"ordername":"zhangsan"}, {"password":"abcdef"});
//  console.log(data);

  //通过id获取用户
  let data = await db.find('order', { "openid" : ctx.request.body.openid});
  //console.log(data)
  ctx.body = data


})

router.post('/doEdit', async (ctx)=>{

  var name = ctx.request.body.name;
  var phone = ctx.request.body.phone;
  var type = ctx.request.body.type;
  var start = ctx.request.body.start;
  var end = ctx.request.body.end;

  let data = await db.update('order', { "_id" : db.getObjectID(ctx.request.body._id)  }, {
    name, phone, type, start, end 
  } ) 

  ctx.body = 'edit order success';

})

//
router.post('/editStatus', async (ctx)=>{
  var status = ctx.request.body.status;
  let data = await db.update('order', { "_id" : db.getObjectID(ctx.request.body._id) }, {
    status 
  })
  ctx.body = 'paid success';

  console.log(ctx.request.body) 
  //console.log(status)
  //console.log(ctx.request.body._id)

})




//删除
router.get('/delete', async (ctx)=>{
//  let data = await db.remove('order', {"ordername":"zhangsan"});
//  console.log(data);

  var data = await db.remove('order', { "_id" : db.getObjectID(ctx.request.body._id) }); 
//
})


module.exports = router.routes();