const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const gameRouter = require('./routes/game');
const { secretKey } = require('./middleware/authorization');
const expressJwt = require('express-jwt');

const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expressJwt({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: ['/api/user/login'] }));


app.use((err, req, res, next) => {
  if (err) {
      res.status(401).json({ error: 'Unauthorized: Token is invalid' });
  }
});


app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/game', gameRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
