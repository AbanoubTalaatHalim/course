const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

var session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(fileUpload({
//     useTempFiles:true 
// }));
app.use(session({ secret: 'gp', cookie: { maxAge: 6000000 , expires:6000000 }, resave: false, saveUninitialized: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/user', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req
        .app
        .get('env') === 'development'
        ? err
        : {};

    // render the error page
    res.status(err.status || 500);
    res.render('404');
});

module.exports = app;