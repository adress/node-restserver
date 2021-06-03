const { response } = require('express'); //ayuda para el autocompletado
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

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

module.exports = { login };