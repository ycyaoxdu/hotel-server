const router = require('koa-router')();
var request = require('request-promise');


//db
const db = require('../../module/db');


//接收code--》请求接口--》记录openid

let appid = "wx3590eb11fdf22ed3";
let secret = "";
let grant_type ="authorization_code";


//显示信息
router.get('/', async (ctx)=>{

  console.log(ctx.request.query.code);
    const data = await request.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${ctx.request.query.code}&grant_type=${grant_type}`);
    ctx.body = data;

    
})

//https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code



module.exports = router.routes();