
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            msg: 'token not found'
        });
    }
    console.log(token);
    try {
      const {uid} =  jwt.verify(token,process.env.SECRETPRIVATEKEY);
      const user = await User.findById(uid) ;
      if(!user){
        return res.status(401).json({
            mes: "user does not exist in data base"
        })
      }
      if(!user.status){
        return res.status(401).json({
            mesg: 'user deleted'
        })
      }
      //en la req almacenamos los user
      req.user = user;
      next();
    } catch (error) { 
        console.log(error);
        res.status(401).json({
            msg:error
        })
    }
}

module.exports = {
    validarJWT
};