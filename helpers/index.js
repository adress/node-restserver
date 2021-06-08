const dbValidators = require('./db-validators');
const generarJwt = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

// ... exporta todo su contenido, es decir las funciones
module.exports = {
    ...dbValidators,
    ...generarJwt,
    ...googleVerify,
    ...subirArchivo
}