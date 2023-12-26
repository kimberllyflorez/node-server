const { response, request } = require('express');

const User = require('../models/user');
const bcryptjs = require('bcryptjs');



const usuariosGet= async (req = request, res = response)=>{

//  const {name, surname, age} = req.query;
const {limit=5, from = 0 }=req.body;
const query = {state : true};

    const [total, users] = await Promise.all([ 
        //primise . all execute all promise that i want to execute. simultanialy
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))//desde x posicion  y limite hasta donde
        .limit(Number(limit))
    ]);
    res.json({total, users});

}
const usuariosPost = async (req = request, res = response)=>{
    //valores de extraccion de la request
    const {name, password, email, rol} = req.body;
    //validate/ estos seran los valored obligatorios em la creacion del user
    const user = new User({name, password, email, rol});
    //Here encrypt password. we can specify the number of wraps bear in minf it;s could take more time
    const salt =  bcryptjs.genSaltSync();
    user.password =bcryptjs.hashSync(password, salt);
   //here save in db
   await user.save();
    res.json({
        msg: 'post success APi',
        user,
    });

}
const usuariosPut= async (req, res = response)=>{
    const id = req.params.id;
    //extract what o dont want to modify
    const {_id, password, google, ...resto}= req.body;

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
        msg: 'patch APi success'
    });
}
const usuarioDelete= async (req, res)=>{
    //users dont should be delete from the regist so we shold be create a state to turn on or off and avoid delete user
    const {id }= req.params;
    const uid = req.uid;
    //in this way we delete the user fisical- worse
    //const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id, {state: false});
    const userAuthenticated = req.user;
    res.json({
            user,
            userAuthenticated
    });
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuarioDelete,
    usuariosPut
};