const { Router } = require('express');
const { check } = require('express-validator');

const { index, store, update, destroy, show } = require('../controllers/categoriasController');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoriaPorId } = require('../helpers/db-validators')

//const {} = require('../helpers/db-validators');

const router = Router();
//configuracion de las rutas que provienen del controladord

//index
router.get('/', index);

//show one
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], show);

//store - usuario de la app
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    validarCampos
], store);

//update
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    validarCampos
], update)

//delete
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], destroy);

module.exports = router;