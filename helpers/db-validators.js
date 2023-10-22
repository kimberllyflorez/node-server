const Rol = require('../models/rol');
const User = require('../models/user');

const validateRol = async (rol='')=>{
    const existRol = await Rol.findOne({rol});
        if(!existRol){
            throw new  Error(`role: ${rol} is not define in the database`)
        }
    }

const validateEmail = async(email = '') =>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailExist = await User.findOne({email});
    
   if(emailExist){
    throw new Error(`this email${email} already exist`);

    // return res.status(400).json({
     //   msg: 'This Email already exist'
   // });
 }
//else if(!emailRegex.test(email)){
//     throw new Error(`this is not valid email`)
//     // return res.status(400).json({
//     //     msg: 'invalid email'
//     // });
//  }
}    

    module.exports = {
       validateRol,
       validateEmail
    }