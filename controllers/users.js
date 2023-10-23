const { response, request } = require('express');

const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const user = require('../models/user');


const usuariosGet= async (req = request, res = response)=>{

//  const {name, surname, age} = req.query;
const {limit=5, from = 0 }=req.body;
const query = {state : true};

    const [total, users] = await Promise.all([
        //primise . all execute dsimultanialy
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);
    res.json({total, users});

}
const usuariosPost = async (req = request, res = response)=>{
    const {name, password, email, rol} = req.body;
    //validate
    const user = new User({name, password, email, rol});
   
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
const usuariosPut= async (req, res = response)=>{
    const id = req.params.id;
    const {_id, password, google, ...resto}= req.body;//extract pass and goog from the rest of arguments

    //validate against the db:  
    if (password){
        //change password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
//find by id: find by id whent got it chance the rest of data
    const user = await User.findByIdAndUpdate(id, {state: false});

    res.json(id);

}
const usuariosPatch= (req, res = response)=>{
    res.json({
        msg: 'patch APi'
    });
}
const usuarioDelete= async (req, res)=>{

    const {id }= req.params
    //in this way we deklete the user fisical- worse
    //const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id);

    res.json({
            id
    });

}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuarioDelete,
    usuariosPut
};