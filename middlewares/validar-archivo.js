const { response } = require("express");

const validarArchivoSubir = (req, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'no hay archivos para subir' });
        return res.status(401).json({
            msg: 'No hay un archivo que subir'
        });
    }

    next();
}

module.exports = { validarArchivoSubir };