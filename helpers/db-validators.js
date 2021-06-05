const Role = require('../models/role');
const { Categoria, Usuario, Producto } = require('../models');

/**
 * Validaciones de Usuario
 */

//esta funcion valida si el rol recibido se encuentra en la base de datos
const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        //Error personalizado
        throw new Error(`El rol: ${rol} no está registrado en la BD`);
    }
}

//esta funcion  verifica 
const emailExiste = async(correo = '') => {
    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya se encuentra registrado`);
    }
}

//esta funcion  verifica 
const existeUsuarioPorId = async(id) => {
    //verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id} no existe`);
    }
}

/**
 * Validaciones de Categoria
 */

const existeCategoriaPorId = async(id) => {
    //verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id: ${id} no existe`);
    }
}

/**
 * Validaciones de Categoria
 */

const existeProductoPorId = async(id) => {
    //verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id: ${id} no existe`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}