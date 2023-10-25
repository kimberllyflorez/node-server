
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next)=>{
    const token = req.header('token');
    if(!token){
        return res.status(401).json({
            msg: 'token not found'
        });
    }
    console.log(token);
    next();
}

module.exports = {
    validarJWT
};