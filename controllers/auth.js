exports.getLogin = (req, res, next) => {
    // const isLoggedIn =req.get('Cookie').split(';')[3].split('=')[1] === 'true'
    res.render('auth/login', {
        path : '/login',
        pageTitle : 'Login',
        isAuthenticated : false 
    })
}

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    res.session.isLoggedIn = true;
    res.redirect('/');
}

 