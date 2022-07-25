const { response } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const validarJWT = async (req, res = response, next) => {

    const token = req.header('x-token');
    console.log(token);

    if (!token) {
        return res.status(401).json({
            msg: "No es un usuario autorizado"
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        const usuarioLogueado = await User.findById(uid);

        //Verificar si se obtien un usuario
        if (!usuarioLogueado) {
            return res.status(401).json({
                msg: "Token no valido - usuario no existe"
            });
        }


        //Verificar el estado del usuario logueado
        if (!usuarioLogueado.estado) {
            return res.status(401).json({
                msg: "Token no valido-  usuario con estado en false"
            });
        }

        req.uid = uid;
        req.usuarioLogueado = usuarioLogueado;
        next();

    } catch (error) {
        return res.status(401).json({
            msg: "No es un usuario autorizado",
            error: error.name ? error.name : ''
        });
    }
}

module.exports = {
    validarJWT
};