const { response } = require('express');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2

const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');
const { request } = require('http');

cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivo = async(req, res = response) => {
    try {
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });
    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const actualizarImagen = async(req, res = response) => {
    const { coleccion, id } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `no existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `no existe un producto con el id ${id}` });
            }
            break;
        default:
            return res.status(500).json({
                msg: `la accion para la coleccion ${coleccion} no ha sido implementada`
            });
    };

    //verificar si tiene una imagen previa
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen); //borra la imagen 
        }
    }
    const nombreArchivo = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombreArchivo;
    modelo.save(); //graba los cambios

    res.json({ modelo });
}

const mostrarImagen = async(req, res = response) => {
    const { coleccion, id } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `no existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `no existe un producto con el id ${id}` });
            }
            break;
        default:
            return res.status(500).json({
                msg: `la accion para la coleccion ${coleccion} no ha sido implementada`
            });
    };

    //verificar si tiene una imagen previa
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    const defaulPath = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(defaulPath);
}

const actualizarImagenCloudinary = async(req, res = response) => {
    const { coleccion, id } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `no existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `no existe un producto con el id ${id}` });
            }
            break;
        default:
            return res.status(500).json({
                msg: `la accion para la coleccion ${coleccion} no ha sido implementada`
            });
    };

    //verificar si tiene una imagen previa
    if (modelo.img) {
        //borrar imgen de cloudianry
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    //subir a cloudinary
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;
    modelo.save();

    res.json({ modelo });
}


module.exports = { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary }