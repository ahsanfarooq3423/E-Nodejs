const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem  = require('./models/cart-item');

const sequelize = require('./util/database');

const app = express();

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//Associations

// One to Many Relation Ship i.e. A user can create many products
Product.belongsTo(User, { contraints : true, onDelete : 'CASCADE' });
User.hasMany(Product);
// One to One Bidrectional Relationship
User.hasOne(Cart);
Cart.belongsTo(User);
//Many to many relation ship we have to define where 
// the Cart and Product references are stored
Cart.belongsToMany(Product, {through : CartItem});
Product.belongsToMany(Cart, {through  : CartItem});


sequelize.sync()
    //sync({force : true})
    .then(result => {
        // console.log(res) 
        return User.findByPk(1)
    })
    .then(user => {
        if (!user){
            return User.create({ name : 'Ahsan', email : 'test@test.com'})
        }
        return user
    })
    .then(user => {
        // console.log(user); 
        return user.createCart();  
        
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => console.log(err))

