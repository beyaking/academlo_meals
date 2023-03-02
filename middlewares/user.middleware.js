
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require('bcryptjs');
const User = require("../models/user.model");

exports.validUserByEmail = catchAsync(async(req, res, next)=>{
    const {email} = req.body;
    const user = await User.findOne({
        where:{
            email,
            status: true
        }
    })
    if(!user){
        return next(new AppError('The user is not registered', 401))
    }

    req.user = user;
    next()
})

exports.validPassword = catchAsync(async(req, res, next)=>{
    const {user}= req;
    const {password} = req.body;
    if(!(await bcrypt.compare(password, user.password))){
        return next(new AppError('Invalid Credentials', 401))
    }

    next()
})



exports.finderId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      
      where: {
        id,
        status: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    req.user = user;

    next();
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};

