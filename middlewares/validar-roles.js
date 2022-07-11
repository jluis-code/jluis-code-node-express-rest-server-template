const { response } = require("express");

const esAdminRole = (req, res = response, next) => {

    const userLogueado = req.usuarioLogueado;

    if (userLogueado.rol !== 'ADMIN_ROLE') {
        res.status(401).json({
            msg: 'Usuario no autorizado - no es administrador'
        });
    }

    next();
}


const isValidRole = (...roles) => {


    return (req, res = response, next) => {
        const userLogueado = req.usuarioLogueado;
        console.log(userLogueado.rol);
        console.log(roles);
        if (!roles.includes('ADMIN_ROLE')) {
            return res.status(401).json({
                msg: 'Usuario no autorizado - no es administrador'
            });
        }
        next();
    }
}


module.exports = {
    esAdminRole,
    isValidRole
}