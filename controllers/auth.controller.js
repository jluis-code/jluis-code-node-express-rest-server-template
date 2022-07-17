const { response } = require("express");
const bcryptjs = require('bcryptjs');

const { generarJWT } = require("../helpers/genetare-jwt");
const { googleVerify } = require("../helpers/google-verify");

const User = require('../models/user');

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

const googleSigIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {

        const { name, picture, email } = await googleVerify(id_token);
        console.log(name, picture, email);

        let usuario = await User.findOne({ email });
        console.log(usuario);


        if (!usuario) {

            const data = {
                name,
                email,
                password: ':P',
                img: picture,
                google: true
            }

            usuario = new User({
                name,
                email,
                password: ':P',
                rol: 'USER_ROLE'
            });

            //usuario = new Usuario(data);
            console.log(usuario);
            await usuario.save();
            console.log("usuario save");
        }

        //Si el usuario 
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Usuario no autorizado"
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: "El tokem no se pudo verificar"
        })
    }


}

module.exports = {
    login,
    googleSigIn
}