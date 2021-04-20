
const router = require('koa-router')();
const db = require('../../module/db');



//显示信息
router.get('/', async (ctx)=>{

  try {
    if (ctx.session.userInfo) {
      ctx.body = {code: 1, message: '已登陆'}

      var result = await db.find('order', {});
  
      await ctx.render('admin/order/index', {
        list:result 
      });

    } else {
      ctx.body = {code: 0, message: '未登陆'}
      // 跳转到登录页
      ctx.redirect('/index')
    }
  } catch(err) {
    throw new Error(err)
  }


  
  })

//信息修改
router.get('/edit', async (ctx)=>{

    //  let data = await db.update('order', {"ordername":"zhangsan"}, {"password":"abcdef"});
    //  console.log(data);
    
      //通过id获取用户
      let id = ctx.query.id;
      let data = await db.find('order', {"_id":db.getObjectID(id)});
    
      await  ctx.render('admin/order/edit', {
    
        list:data[0]    //id
    
      });
    
    
    })
    
    router.post('/doEdit', async (ctx)=>{
    
      var id = ctx.request.body.id;
      var status = ctx.request.body.status;
    
      let data = await db.update('order', {"_id":db.getObjectID(id)}, {
        status
      } )
    
      try{
        if(data.result.ok){
          
          ctx.redirect('/admin/order')
        }
      }catch(err){
        console.log(err);
        
        ctx.redirect('/admin/order/edit');
      }
    
    })
    
    



module.exports = router.routes();