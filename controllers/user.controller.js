const {response, request} = require('express');


const userGet = (req = request, res = response) => {

    const {id, nombre} = req.query;

    res.json({
        msg: 'get API',
        id,
        nombre
    })
}

const userPost = (req, res = response) => {

    //obtener el body
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API',
        nombre,
        edad
    })
}

const userPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API',
        id
    })
}


const userDelete = (req, res = response) => {
    res.json({
        ok:true,
        msg:'delete API'
    })
}


const userPatch = (req, res = response) => {
    res.json({
        ok:true,
        msg:'patch API'
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}