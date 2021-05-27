const { Router } = require('express');
const { check } = require('express-validator');

const { index, store, update, destroy } = require('../controllers/usuariosController');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();
//configuracion de las rutas que provienen del controladord

//index
router.get('/', index);

//update
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], update)

//store
// ruta, middellware, contolador
router.post('/', [
        check('nombre', 'Correo no valido').not().isEmpty(),
        check('password', 'el password debe tener almenos 6 caracteres').isLength({ min: 6 }),
        check('correo', 'Correo no valido').isEmail(),
        //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']), valisacion desde una lista
        check('rol').custom(esRoleValido),
        check('correo').custom(emailExiste),
        validarCampos
    ],
    store);

//delete
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], destroy);


module.exports = router;