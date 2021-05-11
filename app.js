require('dotenv').config();

//crea una instancia de la clase servidor e inicia la escucha
const Server = require('./models/server');
const server = new Server();
server.listen();