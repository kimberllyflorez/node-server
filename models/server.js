const express =require('express')
const cors = require('cors');
const { dbConection } = require('../db/config');
class Server{
    constructor(){
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersRoutePath = '/api/users';
    this.authPath = '/api/auth';

    this.middleware();
    this.routes();
    this.conectDb();

    }
   async conectDb(){
    await  dbConection();
    }
    middleware(){
        this.app.use(cors());
        //parce and read
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.usersRoutePath, require('../routes/users'));
        this.app.use(this.authPath, require('../routes/auth'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('SERVER RUNUNG ', this.port);
        });
    }
}

module.exports = Server;