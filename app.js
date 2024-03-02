const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
require("dotenv").config();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
require("./mongodb/db");

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://pinterst-clone-qox1.vercel.app',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'Pinterst-Frontend/build')));
// // Serve React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'Pinterst-Frontend/build', 'index.html'));
// });

// Logger and middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files (adjust the path if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
