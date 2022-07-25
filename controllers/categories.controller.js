const { response, request } = require('express');
const { Categoria } = require('../models');

const categoryGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true })
            .skip(desde)
            .limit(limite)
            .populate('usuario', 'name')
    ]);


    res.json({
        total,
        categorias
    });
}


const categoryById = async (req = request, res = response) => {

    const id = req.params.id;

    const categoria = await Categoria.findById(id);

    if (!categoria) {
        return res.status(400).json({
            msg: `No existe la categoría con el id ${id}`
        });
    }

    res.json({
        categoria
    });

}

const categoryPost = async (req, res = response) => {


    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar

    console.log(nombre);
    const data = {
        nombre,
        usuario: req.uid
    }

    const categoria = new Categoria(data);


    await categoria.save();

    res.status(201).json(categoria);
}

const categoryPut = async (req, res = response) => {

    const id = req.params.id;
    const { nombre } = req.body;
    console.log(nombre);
    console.log({ nombre });

    const resultUpdate = await Categoria.findByIdAndUpdate(id, { nombre }, { new: true });

    console.log(resultUpdate);


    res.json({
        resultUpdate
    });
}


const categoryDelete = async (req, res = response) => {

    const id = req.params.id;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        categoria
    });


}


const categoryPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API'
    })
}


module.exports = {
    categoryGet,
    categoryById,
    categoryPost,
    categoryPut,
    categoryDelete,
    categoryPatch
}