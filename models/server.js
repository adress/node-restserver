const express = require('express')
const cors = require('cors')

class Server {

    constructor() {

        this.app = express(); //creando una instancia de express como una propiedad de la clase server
        this.port = process.env.PORT; //guarda el numero del puerto de la variable global process.env
        //prefijo ruta de usuarios
        this.usuariosPath = '/api/usuarios'; //prefijo de la ruta de usuarios

        // ejecuta el metodo que configura los Middlewares
        this.middlewares();

        //ejecuta el metodo que configura las rutas en app
        this.routes();
    }

    middlewares() {
        //.use indica que son middlewares

        //CORS
        //previene el cross original acess error, protege el  server 
        this.app.use(cors())

        //escritura y parseo del body, formatea los datos del body en json
        this.app.use(express.json())

        //middleware define la carpeta publica
        this.app.use(express.static('public'))
    }

    routes() {
        //routes import
        //this.app.use(require('../routes/user'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    //up server
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando puerto ${this.port}`);
        });
    }
}

//exporta el servidor para llamado desde otro archivo
module.exports = Server;