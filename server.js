// make `.jsx` file requirable by node
require('node-jsx').install();

var path = require('path');
var express = require('express');
var renderer = require('react-engine');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');


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

app.get('/', function(req, res) {
    res.render('home', {
        title: 'React Engine Demo',
        name: 'Home',
        selection: 'header-home'
    });
});

app.get('/page2', function(req, res) {
    res.render('page2', {
        title: 'React Engine Demo',
        name: 'Page 2',
        selection: 'header-page2'
    });
});

app.get('/add', function(req, res) {
    res.render('add', {
        title: 'Add',
        name: 'Add'
    });
});

app.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login',
        name: 'Login'
    });
});

app.get('/dashboard', function(req, res) {
    res.render('dashboard', {
        title: 'Dashboard',
        name: 'Dashboard'
    });
});

app.get('/signup', function(req, res) {
    res.render('signup', {
        title: 'Signup',
        name: 'Signup'
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
