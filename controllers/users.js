const { response, request } = require('express');


const usuariosGet= (req = request, res = response)=>{
    const {name, surname, age} = req.query;
    res.json({
        msg: 'get APi',
        name,
        surname,
        age,
    });

}
const usuariosPost= (req, res = response)=>{
    const {name, surname} = req.body;
    res.json({
        msg: 'post APi',
        name,
        surname
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