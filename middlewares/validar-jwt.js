const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')


const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    //verifica si se recibe el token
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        //verifica el jwt y extrae el uid
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'token no valido - usuario no existe'
            })
        }

        //verificar si uid no ha sido borrado
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'token no valido - estado false'
            })
        }
        req.usuario = usuario; //envia el usuario en el request, por tanto llega al controlador

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msj: 'Token no valido'
        });

    }




}


module.exports = { validarJWT }