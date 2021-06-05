const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'la categoria es obligatoria']
    },

});

ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject(); //quita el __v al realizar .toJSON
    return data;
}

module.exports = model('Producto', ProductoSchema)