const { Categoria, Producto } = require('../models');
const Rol = require('../models/rol');
const Usuario = require('../models/user');

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error("El rol no está registrado en la Base de datos");
    }
}

//Verificar si el correo ya existe
const existeEmail = async (email = '') => {
    const existeInD = await Usuario.findOne({ email });
    if (existeInD) {
        throw new Error("Correo ingresado ya está registrado");
    }
}

//Verificar si el id existe
const existeUsuarioById = async (id) => {
    const existeInDB = await Usuario.findById(id);
    if (!existeInDB) {
        throw new Error("Usuario no existe con el Id indicado");
    }
}

//Verificar si el id existe
const existeCategoriaById = async (id) => {
    const existeInDB = await Categoria.findById(id);
    if (!existeInDB) {
        throw new Error("Categoria no existe con el Id indicado");
    }
}

//Verificar si el id existe
const existeProductoById = async (id) => {
    const existeInDB = await Producto.findById(id);
    if (!existeInDB) {
        throw new Error("Producto no existe con el Id indicado");
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioById,
    existeCategoriaById,
    existeProductoById
}