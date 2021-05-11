const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    email: {
        type: String,
        required: [true, 'El email es necesario'],
    },
    password: {
        type: String,
        required: [true, 'La clave es necesaria'],
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: [true, ' es necesario'],
        default: 'USER_ROLE',
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

module.exports = mongoose.model('Usuario', usuarioSchema);