const Role = require('../models/role');
const Usuario = require('../models/usuario');


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

module.exports = { esRoleValido, emailExiste, existeUsuarioPorId }