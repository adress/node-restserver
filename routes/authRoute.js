const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSingin } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
//configuracion de las rutas que provienen del controladord

router.post('/login', [
    check('correo', 'Correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    validarCampos
], googleSingin);

module.exports = router;