const router = require('koa-router')();

//db
const db = require('../../module/db');



//显示信息
router.get('/', async (ctx)=>{

  var result = await db.find('order', {});

  await ctx.render('api/order/index', {
    list:result 
  });

})


//管理员用户注册
router.get('/add', async (ctx)=>{
    //  let data = await db.insert('order', {"ordername":"zhangsan", "password":"123"});
    //  console.log(data);
      await ctx.render('api/order/add');
    
    })

router.post('/doAdd', async (ctx)=>{
  //获取表单数据
  let data = await db.insert('order', ctx.request.body);

  try{
    if(data.result.ok){
      ctx.redirect('/api/order')
    }
  }catch(err){
    console.log(err);
    ctx.redirect('/api/order/add');
  }

})

    

//信息修改
router.get('/edit', async (ctx)=>{

//  let data = await db.update('order', {"ordername":"zhangsan"}, {"password":"abcdef"});
//  console.log(data);

  //通过id获取用户
  let id = ctx.query.id;
  let data = await db.find('order', {"_id":db.getObjectID(id)});

  await  ctx.render('api/order/edit', {

    list:data[0]    //id

  });


})

router.post('/doEdit', async (ctx)=>{

  var id = ctx.request.body.id;
  var ordername = ctx.request.body.ordername;
  var password = ctx.request.body.password;

  let data = await db.update('order', {"_id":db.getObjectID(id)}, {
    ordername, password
  } )

  try{
    if(data.result.ok){
      
      ctx.redirect('/api/order')
    }
  }catch(err){
    console.log(err);
    
    ctx.redirect('/api/order/edit');
  }

})



//删除
router.get('/delete', async (ctx)=>{
//  let data = await db.remove('order', {"ordername":"zhangsan"});
//  console.log(data);

  let id = ctx.query.id;

  var data = await db.remove('order', {"_id":db.getObjectID(id)});

  if(data){
    ctx.redirect('/api/order');
  }

})

//


module.exports = router.routes();