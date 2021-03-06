const createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const io = require('socket.io')()
require('dotenv').config();

require('./db/db')

console.log(process.env.MY_SECRET)

const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');
const mazeRouter = require('./routes/maze');

const app = express();

const corsOptions = {
  origin: 'https://mazepagereed.herokuapp.com',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
 }
 app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('https://mazebackendreed.herokuapp.com/api/v1', apiRouter);
app.use('https://mazebackendreed.herokuapp.com/users', usersRouter);
app.use('https://mazebackendreed.herokuapp.com/maze', mazeRouter);
app.get('/', function(req, res){
  res.redirect('https://mazebackendreed.herokuapp.com/maze');
});



// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

const port = process.env.PORT || 8000;

app.listen(port, function(){
  console.log("Express server listening on port"+port);
});


module.exports = app;

