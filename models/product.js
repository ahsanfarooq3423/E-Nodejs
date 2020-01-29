const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title : {
    type : String,
    required : true
  },
  price : {
    type : Number,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  imageUrl : {
    type : String, 
    required : true
  }
})

module.exports = mongoose.model('Product',productSchema);






// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     console.log(this._id)
//     if (this._id){
//       //if the _id is already present
//       dbOp = db.collection('products').updateOne({_id : this._id} , {$set : this})
//     }
//     else {
//      dbOp = db.collection('products').insertOne(this); 
//     }
//     return dbOp
//       .then(res => {
//         //console.log(res)
//       })
//       .catch(err => console.log(err))
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products').find().toArray()
//       .then(response => {
//         return response
//       })
//       .catch(err => console.log(err))
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db.collection('products').find({ _id : new mongodb.ObjectId(prodId)}).next()
//       .then(product => {
//         console.log(product)
//         return product
//       })
//       .catch(err => console.log(err))
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db.collection('products').deleteOne({ _id : new mongodb.ObjectId(prodId) })
//       .then(res => {
//         return res
//       })
//       .catch(err => console.log(err))
//   }
// }

// module.exports = Product;









