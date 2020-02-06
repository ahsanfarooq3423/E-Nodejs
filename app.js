const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const session = require('express-session'); 

const errorController = require('./controllers/error');

const User = require('./models/user');


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({ secret : 'my secret', resave : false, saveUninitialized : false}) 
)

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
    User.findById("5e3584d6329e767ae169d346")
        .then(user => {
            req.user = user
            req.message = 'hello my name is ahsan farooq'
            next()
        })
        .catch(err => console.log(err))
})

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');



app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb://ahsan:mongodb8008@ds157276.mlab.com:57276/shop-app', { useUnifiedTopology: true })
    .then(response => {
        console.log('CONNNECTED HUHU');
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name : 'Ahsan',
                        email : 'ahsan@test.com',
                        cart : {
                            items : []
                        }
                    })
                    user.save()
                }
            })
        app.listen(3000);
    })
    .catch(err => console.log(err))


