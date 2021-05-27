//este import solo se realiza para habilidar el auto completado de vscode
const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario'); //impotacion del modelo usuario

/**
 * Display a listing of the resource.
 *
 * la especificacion de los parametros se hacen solo para habilitar el autocompletado
 * @return 
 */
const index = async(req = request, res = response) => {
    //get query parms
    const { limite = 5, desde = 0 } = req.query;
    //query que indica que solo se consultan los usuarios activos
    const query = { estado: true }

    /* ejecuta las promesas de manera simultanea si falla una todo dara un error,
        retorna cada una de las promesas en un arreglo, asi que se puede desestructurar
    */
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
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
const store = async(req, res = response) => {
    //desestructurar el body
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //enciptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en bd
    await usuario.save();
    console.log("Nuevo usuario almacenado.");

    res.json({
        usuario
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
const update = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

/**
 * Remove the specified resource from storage.
 *
 * @param  int  $id
 * @return 
 */
const destroy = async(req, res = response) => {
    const { id } = req.params;

    //const usuario = await Usuario.findByIdAndDelete(id); //borra el documeto de la BD
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario);
}

module.exports = { index, store, update, destroy }