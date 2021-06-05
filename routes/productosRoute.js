const { Router } = require('express');
const { check } = require('express-validator');

const { index, store, update, destroy, show } = require('../controllers/productosController');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators')

//const {} = require('../helpers/db-validators');

const router = Router();
//configuracion de las rutas que provienen del controladord

//index
router.get('/', index);

//show one
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], show);

//store - usuario de la app
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('categoria', 'no es un id de Mongo válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], store);

//update
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], update)

//delete
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], destroy);

module.exports = router;