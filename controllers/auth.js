const { response } = require("express");
const User = require('../models/user');
const bcrypt = require("bcryptjs/dist/bcrypt");
const { generateJWT } = require("../helpers/generate-jwt");
const login = async (req, res= response)=>{
    
    //1. verified if this user exist
    const {email, password}= req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg:'user/ password wrong --email'
            });
        }
        //2. user active in my db 
        if(!user.state){
            return res.status(400).json(
                {
                    msg:  'something went wrong-- status:false'
                }
                );
            }
            //3. validate password 
            const  validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
               return res.status(400).json({
                    msg:'something went weong-- password incorret' 
                });
            }
            
            //4. generate jwt
            
            const token = await generateJWT(user.id);
                 
            res.json({
                user,
                token
            })
        }catch(error){
            return res.status(500).json({
                msg: "something went wrong  tslk eith  kim"
            })
        }
        
    }
    
    
    module.exports= {login}