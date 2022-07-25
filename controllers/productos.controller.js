const { response, request } = require('express');
const { Producto, Usuario, Categoria } = require('../models/');

const productCreate = async (req, res = response) => {


    const { nombre, precio, categoria, descripcion = '', disponible } = req.body;

    /*
    * Verificar si el producto no existe
    */
    const productoDB = await Producto.findOne({ nombre });

    if (productoDB) {
        res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }

    /*
    * Verificar si la categoría existe
    */
    const categoriaDB = await Categoria.findById(categoria);

    if (!categoriaDB) {
        res.status(400).json({
            msg: `La categoría con Id ${categoria}, no existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        precio,
        categoria,
        descripcion,
        disponible,
        usuario: req.uid
    }

    const producto = new Producto(data);


    await producto.save();

    res.status(201).json(producto);
}

const productGetAll = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true })
            .skip(desde)
            .limit(limite)
            .populate('usuario', 'name')
    ]);


    res.json({
        total,
        productos
    });
}


const productById = async (req = request, res = response) => {

    const id = req.params.id;
    const producto = await Producto.findById(id);

    if (!producto) {
        res.status(400).json({
            msg: `No existe el producto con el id ${id}`
        });
    }

    res.json({
        producto
    });

}


const productUpdate = async (req, res = response) => {

    const id = req.params.id;

    const { nombre, precio, categoria, descripcion = '', disponible } = req.body;

    /*
    * Verificar si el producto ya existe
    */
    const productoDB = await Producto.findOne({ nombre });

    if (productoDB && id != productoDB.id) {
        res.status(400).json({
            msg: `Ya existe un producto con el nombre ${productoDB.nombre}`
        });
    }

    /*
    * Verificar si la categoría existe
    */
    if (categoria) {

        const categoriaDB = await Categoria.findById(categoria);

        if (!categoriaDB) {
            res.status(400).json({
                msg: `La categoría con Id ${categoria}, no existe`
            });
        }
    }

    //Generar la data a actualizar
    const data = {
        nombre,
        ...(precio && { precio }),
        ...(categoria && { categoria }),
        ...(descripcion && { descripcion }),
        ...(disponible && { disponible }),
        usuario: req.uid
    }

    const resultUpdate = await Producto.findByIdAndUpdate(id, data, { new: true });

    console.log(resultUpdate);


    res.json({
        resultUpdate
    });
}


const productDelete = async (req, res = response) => {

    const id = req.params.id;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        producto
    });
}

module.exports = {
    productCreate,
    productGetAll,
    productById,
    productUpdate,
    productDelete,
}