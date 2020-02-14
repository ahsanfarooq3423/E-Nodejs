const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');

const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');

const MONGODB_URI = 'mongodb://ahsan:mongodb8008@ds157276.mlab.com:57276/shop-app';

const User = require('./models/user');

const app = express();

const csrfProtection = csrf();


//Create a store
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Create the middleware session
app.use(
    session({ secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store })
    )

app.use(csrfProtection);

app.use(flash())

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next()
        })
        .catch(err => console.log(err))
})

app.use( (req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next()
}) 


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);


mongoose.connect(MONGODB_URI, { useUnifiedTopology: true })
    .then(response => {
        console.log('CONNNECTED HUHU');
        app.listen(3000);
    })
    .catch(err => console.log(err));


