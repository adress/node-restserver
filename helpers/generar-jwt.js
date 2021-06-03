const jwt = require('jsonwebtoken')

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_OR_PRIVATEKEY, {
                expiresIn: '4d'
            },
            (err, token) => {

                if (err) {
                    console.log(err);
                    reject('no se puede generar el token')
                } else {
                    resolve(token);
                }

            })
    });
}

module.exports = { generarJWT }