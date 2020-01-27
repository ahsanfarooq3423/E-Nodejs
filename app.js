const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const User = require('./models/user');


const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.use((req, res, next) => {
    User.findById("5e2e56e7dc8114681c0ce8a5")
        .then(user => {
            console.log(user)
            req.user = user
        })
        .catch(err => console.log(err))
    next()
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


mongoConnect(() => {
    app.listen(3000);
} )





