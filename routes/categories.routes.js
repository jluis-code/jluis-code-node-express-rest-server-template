const { Router } = require('express');
const { check } = require('express-validator');
const { categoryGet, categoryPost, categoryPut, categoryDelete, categoryById } = require('../controllers/categories.controller');
const { existeCategoriaById } = require('../helpers/db-validators');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', categoryGet);

//Obtener una categoría por ID - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoryById);

//Crear una  nueva categoría - privado - cualquiera con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoryPost);

//Actualir una categoria por ID - privado - cualquiera con un token valido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeCategoriaById),
    validarCampos
], categoryPut);

//Borrar un categoría - Admin
router.delete('/:id', [
    validarJWT,
    validarCampos,
    check('id').custom(existeCategoriaById),
], categoryDelete);

module.exports = router;