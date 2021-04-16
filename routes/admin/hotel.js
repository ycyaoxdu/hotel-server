const router = require('koa-router')();
const db = require('../../module/db');


//显示信息
router.get('/', async (ctx)=>{

    var result = await db.find('hotel', {});
  
    await ctx.render('admin/hotel/index', {
      list:result 
    });
  
  })


//信息修改
router.get('/edit', async (ctx)=>{

    //  let data = await db.update('hotel', {"hotelname":"zhangsan"}, {"password":"abcdef"});
    //  console.log(data);
    
      //通过id获取用户
      let id = ctx.query.id;
      let data = await db.find('hotel', {"_id":db.getObjectID(id)});
    
      await  ctx.render('admin/hotel/edit', {
    
        list:data[0]    //id
    
      });
    
    
    })
    
    router.post('/doEdit', async (ctx)=>{
    
      var id = ctx.request.body.id;
      var name = ctx.request.body.name;
      var telephone = ctx.request.body.telephone;
      var address = ctx.request.body.address;
    
      let data = await db.update('hotel', {"_id":db.getObjectID(id)}, {
        name, telephone, address 
      } )
    
      try{
        if(data.result.ok){
          
          ctx.redirect('/admin/hotel')
        }
      }catch(err){
        console.log(err);
        
        ctx.redirect('/admin/hotel/edit');
      }
    
    })


module.exports = router.routes();