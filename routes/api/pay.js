
const router = require('koa-router')();

//db
const db = require('../../module/db');



//显示信息
router.post('/', async (ctx)=>{

    var price = await db.find('hotel', {});
    //console.log(price)
    var single = price[0].singleRoomPrice;
    var double = price[0].doubleRoomPrice;
    //console.log(single)

    let item = await db.find('order', { "_id" : db.getObjectID(ctx.request.body._id)});
    //console.log(item)

    if(item[0].type == 'single'){
        var money = item[0].time * single
    }else{
        var money = item[0].time * double
    }

    let data = await db.update('order', {"_id":db.getObjectID(id)}, {
        money
    })
    
    ctx.body = money


    //console.log(money)

    //await console.log(ctx)
    //await console.log(ctx.request)
    //console.log(ctx.request.body)

})


  


module.exports = router.routes();