const express =require('express')
const cors = require('cors');
class Server{
    constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRoutePath = '/api/usuarios';
    this.middleware();
    this.routes();

    }
    middleware(){
        this.app.use(cors());

        //parce and read
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.usuariosRoutePath, require('../routes/users'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('SERVER RUNUNG ', this.port);
        });
    }
}

module.exports = Server;