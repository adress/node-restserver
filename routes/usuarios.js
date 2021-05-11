const { Router } = require('express');
const { index, store, update, destroy } = require('../controller/usuariosController')
const router = Router();

//configuracion de las rutas que provienen del controladord

//index
router.get('/', index);

//update
router.put('/:id', update)

//store
router.post('/', store);

//delete
router.delete('/', destroy);


module.exports = router;