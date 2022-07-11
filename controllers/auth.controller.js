const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require("../models/user");
const { generarJWT } = require("../helpers/genetare-jwt");

const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar el email existe
        const usuario = await User.findOne({ email: email });
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario o password no son correctos"
            });
        }

        //Verificar si existe
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario o password no son correctos - estado"
            });
        }

        //Verficar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario o password no son correctos - password"
            });
        }


        //Generar el JWT
        console.log('generar jwt');
        const token = await generarJWT(usuario.id);
        console.log(token);
        console.log('termina jwt', token);


        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Algo salio mal"
        })
    }

}

module.exports = {
    login
}