//필요한 모듈
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const expressValidator = require('express-validator');

//라우터 모음
const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
const signRouter = require('./routes/sign_up');
const loginRouter = require('./routes/login');
const memRouter = require('./routes/member');
//const communityRouter = require('./routes/community');
const indexMemRouter = require('./routes/index_mem');

const app = express();

//const mysql = require('mysql');
// const client = mysql.createConnection({
//     host: 'nodejs-008.cafe24.com',
//     user: 'betty970823',
//     password: 'KL@ttwhyo7D',
//     database: 'betty970823',
//     port: '3306',
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//미들웨어 등록
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(expressValidator());

//라우터 등록
app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/sign_up', signRouter);
app.use('/login', loginRouter);
app.use('/member', memRouter);
//app.use('/community', communityRouter);
app.use('/index_mem', indexMemRouter);

//에러 처리
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
