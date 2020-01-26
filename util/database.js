const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


const url = 'mongodb+srv://ahsanfarooq3423:mongodb8008@cluster0-wgwie.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(url);

const mongoConnect = callback => {
    client.connect()
        .then(client => {
            console.log('CONNECTED');
            callback(client);
        })
        .catch(err => {
            console.log(err)
        })
}


// const mongoConnect = callback => {
//     MongoClient.connect('mongodb+srv://ahsanfarooq3423:mongodb8008>@cluster0-wgwie.mongodb.net/test?retryWrites=true&w=majority',{ useUnifiedTopology: true }
//     )
//         .then(client => {
//             console.log('Connected!');
//             callback(client);
//         })
//         .catch(err => {
//             console.log(err)
//         })

// }



module.exports = mongoConnect;
