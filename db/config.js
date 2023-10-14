const mongoose = require('mongoose');
const dbConection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
    }catch(err){
        throw new Error('error when init data base');
    }
}

module.exports = {
    dbConection
};