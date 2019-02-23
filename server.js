require('node-jsx').install({extension: '.jsx'})

var path = require('path');
var express = require('express');
var renderer = require('react-engine');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://ruzbr64gyqulrclw:bk7a5ftha8oloopx@z1ntn1zv0f1qbh8u.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/fy2di9gjooiln47y');

var User = require('./models/user');
var Entree = require('./models/entree');


var app = express();

app.set('port', process.env.PORT || 8080);

// create the view engine with `react-engine`
var engine = renderer.server.create({
    reactRoutes: path.join(__dirname + '/public/routes.jsx')
});

// set the engine
app.engine('.jsx', engine);

// set the view directory
app.set('views', __dirname + '/public/views');

// set jsx as the view engine
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', renderer.expressView);

//expose public folder as static assets
app.use(express.static(__dirname + '/public'));

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});



app.get('/add', function(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        res.render('add', {title: 'Add', name: 'Add'});
    }
    else { res.redirect('/login'); }
});

app.post('/add', function(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        Entree.create({
            userid: req.session.user.id,
            content: req.body.content
        })
            .then(user => {
                res.redirect('/dashboard');
            })
            .catch(error => {
                console.warn(error);
                res.redirect('/signup');
            });
    }
    else { res.redirect('/login'); }
});

// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.render('login', { title: 'Login', name: 'Login' });
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        });
    });

app.get('/dashboard', function(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        Entree.findAll({
            where: {userid: req.session.user.id}
        })
            .then(function (entrees) {
                res.render('dashboard', {title: 'Dashboard', heading: 'Dashboard', entrees: entrees});
            });
    }
    else { res.redirect('/login'); }
});

app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.render('signup', { title: 'ACTA REACT- Signup', name: 'Signup' });
    })
    .post((req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
            .then(user => {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            })
            .catch(error => {
                res.redirect('/signup');
            });
    });


// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

var port = process.env.PORT || 8080;

// start the express server
app.listen(port, () => console.log(`App started on port ${port}`));
