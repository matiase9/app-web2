const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.logged = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};

exports.adminUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        const user = await User.findById(req.userData.userId);
        
        if (user.rol == 'admin'){
            next();
        } else {
            res.status(401).json({
                error: "You don't have enough permission to perform this action"
               });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};