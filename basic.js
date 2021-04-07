/*
1.  let、var、const区别？

let:    块作用域变量
var:    全局变量
const:  常量
*/

//2.  模板字符串
/*
var name = "zhangsan"
var age = 20
console.log(`${name} 's age is ${age} .`)
*/


//3.  回调函数
/*
function getData(callback){
    //1s时延
    setTimeout(function(){
        var name = 'zhangsan';
        //回调
        callback(name);
    }, 1000)
}
//此处调用时对callback函数传具体定义了
getData((data)=>{
    console.log(data);
})
*/

//4. Promise处理异步
//resolve   成功
//reject    失败

/*
var p = new Promise( function(resolve, reject){

        setTimeout(function(){
            var name = 'lisi';
            
            if(Math.random() < 0.5 ){
                resolve(name);
            }else{
                reject('失败了');
            }
        }, 1000);

})

p.then((data)=>{
    console.log(data);
})
*/
/*
function getdata(resolve, reject){

    setTimeout(function(){
        var name = 'wangwu';
        resolve(name);
    }, 1000);

}
//传入函数，不加括号
var p = new Promise(getdata);

p.then((data)=>{
    console.log(data);
})
*/


//5.    async   异步   
//      await   等待异步完成(必须用在异步方法内)
/*
async function getData(){

    return 'data';
}

console.log(getData());
*/

/*
// 1
var p = getData();

p.then((data)=>{
    console.log(data);
})
*/
/*
// 2
async function test(){
    var d = await getData();
    console.log(d);
}

test();
*/

/*
//await 改异步为同步
async function getddd(){
    console.log(2);
    return 'dadada';
}

async function ttt(){

    console.log(1);
    var d = await getddd();
    console.log(d);
    console.log(3);

}
ttt();
*/



/*
function getData(){
    return new Promise((resolve, reject)=>{

        setTimeout(()=>{
            var name = 'zl';
            resolve(name);

        },1000)
    })
}
var p = getData();
p.then(function(d){
    console.log(d);
})
*/


function getData(){
    return new Promise((resolve, reject)=>{

        setTimeout(()=>{
            var name = 'zl';
            resolve(name);

        },1000)
    })
}
async function test(){
    var data = await getData();
    console.log(data);
}

test();
















