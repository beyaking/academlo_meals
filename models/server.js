const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { userRouter } = require('../routes/user.routes');
const { mealRouter } = require('../routes/meal.routes');
const { restaurantRouter } = require('../routes/restaurant.routes');
const { orderRouter } = require('../routes/order.routes');
const initModel = require('./initModel');
const globalErrorHandler = require('../controllers/error.controller');
const morgan = require('morgan');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Path Routes
    this.paths = {
      user: '/api/v1/users',
      restaurant: '/api/v1/restaurants',
      meal: '/api/v1/meals',
      order: '/api/v1/orders',
    };

    //Connect to db
    this.database();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    if(process.env.NODE_ENV === 'development'){
      this.app.use(morgan('dev'))
    }
  }

  routes() {
    this.app.use(this.paths.user, userRouter);
    this.app.use(this.paths.meal, mealRouter);
    this.app.use(this.paths.restaurant, restaurantRouter);
    this.app.use(this.paths.order, orderRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));

    //relations

    initModel();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running On Port:', this.port);
    });
  }
}

module.exports = Server;
