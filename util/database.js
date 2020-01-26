const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb+srv://ahsanfarooq3423:mongodb8008@cluster0-wgwie.mongodb.net/shop?retryWrites=true&w=majority'

let _db;

const client = new MongoClient(url);

const mongoConnect = callback => {
    client.connect()
        .then(client => {
            console.log('CONNECTED');
            _db = client.db()
            callback();
        })
        .catch(err => {
            console.log(err)
        })
}

const getDb = () => {
    if (_db) {
        return _db
    }
    throw 'No Database Found!';
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
