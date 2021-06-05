//este import solo se realiza para habilidar el auto completado de vscode
const { response, request } = require('express')
const { Producto } = require('../models'); //impotacion del modelo usuario

/**
 * Display a listing of the resource.
 *
 * la especificacion de los parametros se hacen solo para habilitar el autocompletado
 * @return 
 */
const index = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
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
    const { estado, usuario, ...body } = req.body;

    const nombre = req.body.nombre.toUpperCase();

    const productoDB = await Producto.findOne({ nombre });
    if (productoDB) {
        return res.status(400).json({
            msg: `el producto ${productoDB.nombre} ya se encuentra en la base de datos`
        });
    }

    data = {
        ...body,
        nombre,
        usuario: req.usuario._id //middleware  
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);
}

/**
 * Display the specified resource.
 *
 * @param  int  $id
 * @return 
 */
const show = async(req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto);
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
    const { _id, estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id; //actualiza el usuario

    //new true devuele el documento actualziado
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.json(producto);
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