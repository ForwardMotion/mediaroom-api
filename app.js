// Load env variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Create express app
var express = require('express');
var app = express();

// Include express and middleware
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Load middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,// process.env.CORS_CREDENTIALS,
}));

const cookie_secret = process.env.COOKIE_SECRET;
app.use(cookieParser(cookie_secret));
app.use(express.static(path.join(__dirname, process.env.BLOG_EXPORT_PATH)));

// Module based middlewares go here...
var authMiddleware = require('./modules/users/users.middleware');
app.use(authMiddleware);

// Include the routes you wish to use
var indexRouter = require('./routes/index');
app.use('/', indexRouter);
var blogRouter = require('./routes/blog');
app.use('/blog', blogRouter);
var authRouter = require('./routes/auth');
app.use('/auth', authRouter);
var usersRouter = require('./modules/users/users.routes.js');
app.use('/users', usersRouter);

module.exports = app;
