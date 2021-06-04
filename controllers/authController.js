const { response } = require('express'); //ayuda para el autocompletado
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify')

const login = async(req, res = response) => {
    const { correo, password } = req.body;

    try {
        //verifica email
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msj: 'Usuario / Contraseña no son correctos - email'
            });
        }

        //usuario activo
        if (!usuario.estado) {
            return res.status(400).json({
                msj: 'Usuario / Contraseña no son correctos - estado'
            });
        }

        //contrasena
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msj: 'Usuario / Contraseña no son correctos - password'
            });
        }

        //generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salio mal'
        });
    }
};


const googleSingin = async(req, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, correo, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        //si no exite el usuario se crea usuario
        if (!usuario) {
            data = {
                nombre,
                correo,
                password: ':D',
                img,
                google: true
            }
            usuario = new Usuario(data);
            await usuario.save();
        }

        //verificar el estado del usuario
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario Bloqueado'
            });
        }

        //gernar el jwt
        const token = await generarJWT(usuario.id);

        return res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msj: 'Token de google no váldio'
        });
    }

};

module.exports = { login, googleSingin };