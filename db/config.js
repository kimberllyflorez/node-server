const mongoose = require('mongoose');

const dbConection =  ()=>{
    try {
         mongoose.connect(process.env.MONGODB_CNN);
        console.log('Data base online');
    }catch(err){
        throw new Error('Error when init data base');
    }
}

module.exports = {
    dbConection
};