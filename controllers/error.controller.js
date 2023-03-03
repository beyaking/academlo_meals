const AppError = require("../utils/appError");

const handleCastError22P02 = err => {
  const message = 'Some type of data send does not match was expected';
  return new AppError(message,400)
}

const handleJWTError = ()=> new AppError('Invalid token, please login again')


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  };
  
  const sendErrorProd = (err, res) => {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
  
        message: err.message,
      });
    } else {
      console.log('ERROR ', err);
      res.status(500).json({
        status: 'fail',
        message: 'Something went very wrong',
      });
    }
  };
  
  const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';
    if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, res);
    }
  
    if (process.env.NODE_ENV === 'production') {
      let error = { ...error };
      if (!error.parent?.code) {
        error = err;
      }

      if(error.parent?.code === '22P02') error = handleCastError22P02(error)
      if(error.name === 'JsonWebTokenError') error = handleJWTError(error)
  
      sendErrorProd(error, res);
    }
  };
  
  module.exports = globalErrorHandler;