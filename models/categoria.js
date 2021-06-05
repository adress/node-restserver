const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
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
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    }
});

CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...categoria } = this.toObject(); //quita el __v al realizar .toJSON
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema)