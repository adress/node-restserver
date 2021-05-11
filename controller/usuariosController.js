//este import solo se realiza para habilidar el auto completado de vscode
const { response, request } = require('express')

const Usuario = require('../models/usuario')

/**
 * Display a listing of the resource.
 *
 * la especificacion de los parametros se hacen solo para habilitar el autocompletado
 * @return 
 */
const index = (req = request, res = response) => {

    //get query parms
    const query = req.query;


    res.json({
        msg: 'GET api',
        query
    });
}

/**
 * Show the form for creating a new resource.
 *
 * @return 
 */
const create = (req, res = response) => {

}

/**
 * Store a newly created resource in storage.
 *
 * @param 
 * @return 
 */
const store = (req, res = response) => {
    let body = req.body;
    console.log(body);

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role,
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return response.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
}

/**
 * Display the specified resource.
 *
 * @param  int  $id
 * @return 
 */
const show = (req, res = response) => {

}

/**
 * Show the form for editing the specified resource.
 *
 * @param  int  $id
 * @return \Illuminate\Http\Response
 */
const edit = (req, res = response) => {


}

/**
 * Update the specified resource in storage.
 * @param  int  $id
 * @return 
 */
const update = (req, res = response) => {
    let { id } = req.params;
    res.json({
        msg: "put method",
        id
    });
}

/**
 * Remove the specified resource from storage.
 *
 * @param  int  $id
 * @return 
 */
const destroy = (req, res = response) => {
    res.json('destroy  method');
}

module.exports = { index, store, update, destroy }