const MongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://localhost:27017/';

const dbname = 'hotel';


//connect

MongoClient.connect(dbUrl, (err, client)=>{

    if(err){
        console.log(err);
        return ;
    }

    var db = client.db(dbname);
    //add
    db.collection('user').insertOne({
        'username':"superadmin",
        'password':"123456",
        'isSuper':true 
    }, function(err, result){
        if(!err){
            console.log('add success.');

            client.close();
        }
    })

})