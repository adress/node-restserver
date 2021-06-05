//este import solo se realiza para habilidar el auto completado de vscode
const { response, request } = require('express')
const { Categoria } = require('../models'); //impotacion del modelo usuario

/**
 * Display a listing of the resource.
 *
 * la especificacion de los parametros se hacen solo para habilitar el autocompletado
 * @return 
 */
const index = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
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
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        res.status(400).json({
            msg: `La categoria ${nombre.nombre} ya se encuentra en la base de datos`
        });
    }

    //generar la data, es pusible acceder al usaurio por el middleware validarJWT
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);
}

/**
 * Display the specified resource.
 *
 * @param  int  $id
 * @return 
 */
const show = async(req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.json(categoria);
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
    const { _id, estado, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id; //actualiza el usuario

    //new true devuele el documento actualziado
    const categoria = await Categoria.findByIdAndUpdate(id, resto, { new: true });
    res.json(categoria);
}

/**
 * Remove the specified resource from storage.
 *
 * @param  int  $id
 * @return 
 */
const destroy = async(req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });
    res.json(categoria);
}

module.exports = {
    index,
    store,
    update,
    destroy,
    show
}