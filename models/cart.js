const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );
  

module.exports = class Product {
    static addProduct(id, productPrice) {
        //Fetch the previous cart
        fs.readFile(p, (err,fileContent)=> {
            let cart = {products : [], totalPrice : 0}
            if (!err) {
                cart = JSON.parse(fileContent);
                //Analyze the previous cart
                const existingProduct  = cart.products.find(p => p.id === id);
                let updatedProduct;
                //Add new product / increase the quantity
                if (existingProduct) {
                    updatedProduct = {...existingProduct}
                    updatedProduct.qty  = updatedProduct.qty +1
                } else {
                    updatedProduct = {id : id, qty : 1}
                }
                cart.totalPrice = cart.totalPrice + productPrice;
            }

        })

    }
}