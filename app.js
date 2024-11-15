const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

/*MIDDLEWARE*/
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

/*ROUTE*/
app.get('/api/v1/tours/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      from: 'second',
    },
  });
});

app.get('/api/v1/tours/:id/:gender?', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      from: 'first',
    },
  });
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
