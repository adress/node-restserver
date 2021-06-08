const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {

        this.app = express(); //creando una instancia de express como una propiedad de la clase server
        this.port = process.env.PORT; //guarda el numero del puerto de la variable global process.env

        //definicion de los path de las rutas
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            upload: '/api/upload'
        };

        //conexion con la base de datos
        this.conectardb();

        // ejecuta el metodo que configura los Middlewares
        this.middlewares();

        //ejecuta el metodo que configura las rutas en app
        this.routes();
    }

    //conexion con la base de datos
    async conectardb() {
        await dbConnection();
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

        //carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        //routes import
        //this.app.use(require('../routes/user'));
        this.app.use(this.paths.auth, require('../routes/authRoute'));
        this.app.use(this.paths.buscar, require('../routes/buscarRoute'));
        this.app.use(this.paths.categorias, require('../routes/categoriasRoute'));
        this.app.use(this.paths.productos, require('../routes/productosRoute'));
        this.app.use(this.paths.upload, require('../routes/uploadRoute'));
        this.app.use(this.paths.usuarios, require('../routes/usuariosRoute'));
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