const { response } = require("express");

const validateUserRol =(req, res = response, next)=>{
    if(!req.user){
        return res.status(500).json({
            mes: "we want to validate without the token"
        });
    }
  const  {rol, name }= res.user;
  if (rol !== "ADMIN-ROL"){
    return res.status(401).json({
        mesj: "access denegate for this request "
    })
  }
  next();
}

module.exports = {validateUserRol}