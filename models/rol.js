const {Schema,model}= require('mongoose');

const rolSchema = Schema(
    {
     rol:{
        type: String,
        required:[ true , 'rol is required']
        }
    }
);

module.exports = ('rol', rolSchema);