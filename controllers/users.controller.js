const User = require("../models/user.model");

const bcrypt = require('bcryptjs');
const generateJWT = require("../utils/jwt");

exports.signup = async (req, res, next) => {
    const {name, email, password, role='normal'} = req.body

    const user = new User({name, email, password, role})

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const token = await generateJWT(user.id);

    res.status(201).json({
        status: 'sucess',
        id: user.id,
        token,
    })
};

