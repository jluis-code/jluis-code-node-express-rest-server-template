const { response, request } = require('express');
const Usuario = require('../models/user');
var bcryptjs = require('bcryptjs');


const userGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip(desde)
            .limit(limite)
    ]);


    res.json({
        total,
        usuarios
    })
}

const userPost = async (req, res = response) => {

    //obtener el body

    const { name, email, password, rol } = req.body;
    const usuario = new Usuario({
        name,
        email,
        password,
        rol
    });


    //Encryptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await usuario.save();

    res.json({
        usuario
    })
}

const userPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, email, password, google, ...resto } = req.body;

    // TODO Validar que exista contra DB
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);



    res.json({
        usuario
    })
}


const userDelete = async (req, res = response) => {

    const id = req.params.id;

    //Borrado fisico
    /*   const usuario = await Usuario.findByIdAndDelete(id);
  
    */
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json({
        usuario
    });


}


const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API'
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}