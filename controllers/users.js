const { response, request } = require('express');

const User = require('../models/user');
const bcryptjs = require('bcryptjs');


const usuariosGet= (req = request, res = response)=>{
    const {name, surname, age} = req.query;
    res.json({
        msg: 'get APi',
        name,
        surname,
        age,
    });

}
const usuariosPost = async (req, res = response)=>{
    const {name, password, email, rol} = req.body;
    //validate
    const user = new User({name, password, email, rol});
    const emailExist = await User.findOne({email});
       if(emailExist){
        return res.status(400).json({
            msg: 'This Email already exist'
        });
    }
    //Here encrypt
    const salt =  bcryptjs.genSaltSync();
    user.password =bcryptjs.hashSync(password, salt);
   //here save in db
   await user.save();
    res.json({
        msg: 'post APi',
        user,
    });

}
const usuariosPut= (req, res = response)=>{
    const id = req.params.id;
    res.json({
        msg: 'post APi',
       id
    });

}
const usuariosPatch= (req, res = response)=>{
    res.json({
        msg: 'patch APi'
    });
}
const usuarioDelete= (req, res)=>{
    res.json({
        msg: 'delete api call'
    });

}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuarioDelete,
    usuariosPut
};