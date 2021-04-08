/**
 * 
 */


exports.getPostData = function(ctx){
    //获取数据(原生方法)
    
    return new Promise(function(resolve, reject){
        try{
            let str = '';
            ctx.req.on('data', function(chunk){
                str+=chunk;
            })

            ctx.req.on('end', function(chunk){
                resolve(str);
            })
        }catch(err){
            reject(err);
        }
    })

}


