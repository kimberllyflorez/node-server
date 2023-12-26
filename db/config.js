const mongoose = require('mongoose');

const dbConection = async  ()=>{
    try {
       await  mongoose.connect(process.env.MONGODB_CNN, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true });
        console.log('Data base online');
    }catch(err){
        throw new Error('Error when init data base');
    }
}

module.exports = {
    dbConection
};