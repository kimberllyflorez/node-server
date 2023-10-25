const jwt = require('jsonwebtoken');

const generateJWT = (uid = ' ')=>{

    return new Promise((resolve, reject)=>{
            //the only thing that we are goinf to save in payload is uid
            const payload = {uid};
            jwt.sign(payload,process.env.SECRETPRIVATEKEY,{
                expiresIn: '24h'
            },(err, token)=>{
                if(err){
                    console.log(err),
                    reject('we could not generate the json token please try egain')
                }else{
                    resolve(token);
                }
            })
        }
    )
}
module.exports= {
generateJWT
}