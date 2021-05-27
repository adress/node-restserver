const { validationResult } = require('express-validator');

//esta funcion valida que si hay errores al realizar las validaciones de la peticion
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    //next() indica si llega a este punto debe seguir con las 
    //sigientes validaciones o los siguentes middlewares (seguir su flujo normal)
    next();
}

module.exports = {
    validarCampos
}