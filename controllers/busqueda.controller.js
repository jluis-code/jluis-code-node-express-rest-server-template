const { response, request } = require('express');
const { Usuario, Categoria, Producto } = require('../models');
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        console.log('es mongo ID');
        const resultado = await Usuario.findById(termino);
        return res.json({ results: resultado ? [resultado] : [] });
    }

    const regex = new RegExp(termino, 'i');
    console.log('busqueda por:', { nombre: regex });
    const resultados = await Usuario.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ estado: true }]
    });
    return res.json({ resultados });


}

const buscarCategorias = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        console.log('es mongo ID');
        const resultado = await Categoria.findById(termino);
        return res.json({ results: resultado ? [resultado] : [] });
    }

    const regex = new RegExp(termino, 'i');
    console.log('busqueda por:', { nombre: regex });
    const resultados = await Categoria.find({ nombre: regex, estado: true });
    return res.json({ resultados });


}

const buscarProductos = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        console.log('es mongo ID');
        const resultado = await Producto.findById(termino);
        return res.json({ results: resultado ? [resultado] : [] });
    }

    const regex = new RegExp(termino, 'i');
    console.log('busqueda por:', { nombre: regex });
    const resultados = await Producto.find({ nombre: regex, estado: true });
    return res.json({ resultados });


}


const busqueda = async (req = request, res = response) => {

    const colleccion = req.params.colleccion;
    const termino = req.params.termino;

    if (!coleccionesPermitidas.includes(colleccion.toLowerCase())) {
        return res.status(400).json({
            msg: `Coleccion no permitida para la búsqueda. Colecciones permitidas son ${coleccionesPermitidas}`
        });
    } else {

    }

    switch (colleccion) {
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        default:
            return res.status(500).json({
                msg: `Coleccion no configurada para la búsqueda: ${colleccion}`
            });
            break;
    }


    console.log(colleccion, termino);


    /*  res.json({
         total: 0,
         resultado: []
     }); */
}


module.exports = {
    busqueda
}