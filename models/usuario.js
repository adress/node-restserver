const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    correo: {
        type: String,
        required: [true, 'El coreo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La clave es necesaria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'el rol es necesario'],
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

//Ocutlar argumentos del schema
//se una funcion normal ya que se usa el objeto this
UsuarioSchema.methods.toJSON = function() {
    //quita el __v y el password al realizar .toObject
    const { __v, password, _id, ...usuario } = this.toObject();

    //cambiar el _id por el _uid
    usuario.uid = _id;

    return usuario;
}

//la funcion model recibe nombre del modelo y el modelo, por defecto mongose 
//agrega la s al modelo enotnces el modelo quedara con el nombre modelos
module.exports = model('Usuario', UsuarioSchema)