const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        //realiza la conexion con la base de datos, el wait se usa porque la funcion retorna una promesa
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log("conexion con la base de datos realizada");

    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion con la base de datos');
    }

}

module.exports = { dbConnection }