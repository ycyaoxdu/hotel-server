/**
 * db库
 */

const MongoClient = require('mongodb').MongoClient;
const Config = require('./config');
const ObjectID = require('mongodb').ObjectID;


class Db{

    static getInstance(){
    /**
     * 不存在则创建，存在直接返回。
     * 解决实例不共享问题
     * 利用单例，使不会创建新实例，进而使得只需连接一次数据库，提高速度
     */
        if(!Db.instance){
            Db.instance = new Db();
        }
        return Db.instance;
    }



    //构造
    constructor(){
        this.dbClient='';   //存放db对象
        this.connect();     //构造时直接连接
    }
    //连接数据库
    connect(){

        let _that = this;

        return new Promise((resolve, reject)=>{
            /*
            *解决了多次链接的问题
            *(同一个实例) 
            */
            if(!_that.dbClient){

                MongoClient.connect(Config.dbUrl, (err, client)=>{

                    if(err){

                        reject(err);

                    }else{
                        
                        var db = client.db(Config.dbName);
                        _that.dbClient = db;
                        resolve(_that.dbClient);

                    }
                })

            } else {
                resolve(_that.dbClient);
            }

        })
    }
    //查找
    find(collectionName, json){

        return new Promise((resolve, reject)=>{

            this.connect().then((db)=>{

                var result = db.collection(collectionName).find(json);

                result.toArray(function(err, docs){

                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(docs);

                })
            })
        })
    }

    //
    insert(collectionName, json){

        return new Promise((resolve, reject)=>{

            this.connect().then((db)=>{

                db.collection(collectionName).insertOne(json, function(err, result){

                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }

                })

            })
        })

    }

    //json1条件     json2数据
    update(collectionName, json1, json2){

        return new Promise((resolve, reject)=>{

            this.connect().then((db)=>{
                
                db.collection(collectionName).updateOne(json1, {$set:json2}, (err, result)=>{

                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }

                })
            })

        })

    }

    //
    remove(collectionName, json){

        return new Promise((resolve, reject)=>{

            this.connect().then((db)=>{
                
                db.collection(collectionName).removeOne(json, (err, result)=>{

                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }

                })
            })

        })

    }

    //getObjID
    getObjectID(id){

        return new ObjectID(id);

    }

}



module.exports = Db.getInstance();


//
/**
 * 
var myDb = Db.getInstance();

myDb.find('user', {}).then((data)=>{
    console.log(data);
})
 */