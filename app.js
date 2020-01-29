const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

// const User = require('./models/user');


const app = express();

// app.use((req, res, next) => {
//     User.findById("5e2e56e7dc8114681c0ce8a5")
//         .then(user => {
//             console.log(user)
//             req.user = user
//         })
//         .catch(err => console.log(err))
//     next()
// })

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb://ahsan:mongodb8008@ds157276.mlab.com:57276/shop-app', {useUnifiedTopology : true})
    .then(response => {
        console.log('CONNNECTED HUHU');
        app.listen(3000);
    })
    .catch(err => console.log(err))


