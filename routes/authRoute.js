const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
//configuracion de las rutas que provienen del controladord

//index
router.post('/login', [
    check('correo', 'Correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);


module.exports = router;