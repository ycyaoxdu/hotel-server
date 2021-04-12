
const router = require('koa-router')();

//db
const db = require('../../module/db');




//显示信息
router.get('/', async (ctx)=>{

    var result = await db.find('advice', {});
  
    await ctx.render('admin/advice/index', {
      list:result 
    });
  
  })

//删除
router.get('/delete', async (ctx)=>{
    //  let data = await db.remove('user', {"username":"zhangsan"});
    //  console.log(data);

    let id = ctx.query.id;

    var data = await db.remove('advice', {"_id":db.getObjectID(id)});

    if(data){
        ctx.redirect('/admin/advice');
    }

})

//


module.exports = router.routes();