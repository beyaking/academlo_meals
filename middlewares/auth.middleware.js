const {promisify} = require('util')
const jwt = require('jsonwebtoken');
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.protect = catchAsync(async(req, res, next)=>{
    let token;
    if(
        req.header.authorization &&
        req.header.authorization.startWith('Bearer')
    ){
        token = req.authorization.split('')[1]
    }

    if(!token){
        return next(new AppError('You are not logged in! Please log in to get access',401))
    }

    const decode = await promisify(jwt.verify)(
        token, 
        process.env.SECRET_JWT_SEED
        )

    const user = await User.findOne({
        where:{
            id: decode.id,
            status: true,
        }
    })

    if (!user){
           return next(
            new AppError('The owner of thos token is not longer avalaible',401)
           ) 
    }

    const changeTimeStamp = parseInt(
        user.passwordChangeAt.getTime() / 1000,10

    )

    if(decode.iat < changeTimeStamp){
        return next(new AppError('User recently change password'))
    }

    req.sessionUser = user;

    next()
})