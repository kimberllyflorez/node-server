const { Schema, model }= require('mongoose')

const userSchema = Schema({
    name:{
        type: String,
        required: [true,'name is required '], 
    },
    email:{
        type: String,
        required: [true,'email is required '], 
    },
    password:{
        type: String,
        required: [true,'name is required '], 
    },
    img: {
        type: String,
    },
    rol:{
        type: String,
        require:true,
        enum: ['ADMIN_ROL','USER_ROL']
    },
    state:{
        type:Boolean,
        default: true,
    },
    google:{
        type:Boolean,
        default:true,
    }
});
//METHOS TO REWRITE THE MONGOOSE MODEL 

userSchema.methods.toJSON = function(){
    //this is instance created 
    //here we take out the fist two parameter and the rest is alocated in user
    const {__v, password, _id, ...user} = this.toObject(); 
    user.uid = _id;
    return user;
}
module.exports = model('User', userSchema);