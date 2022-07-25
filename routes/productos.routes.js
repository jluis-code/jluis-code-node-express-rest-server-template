const { Router } = require('express');
const { check } = require('express-validator');
const { productGetAll, productById, productCreate, productUpdate, productDelete } = require('../controllers/productos.controller');
const { existeProductoById } = require('../helpers/db-validators');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

// Obtener todas los productos - publico
router.get('/', productGetAll);

//Obtener un producto por ID - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
], productById);

//Crear un nuevo producto - privado - cualquiera con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    validarCampos
], productCreate);

//Actualir un producto por ID - privado - cualquiera con un token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
], productUpdate);

//Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
], productDelete);

module.exports = router;