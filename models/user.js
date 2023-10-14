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
        enum: ['ADMIN_ROLE','USER_ROLE']
},
state:{
    type:Boolean,
    default: true,
},
})

module.exports = model('user', userSchema);