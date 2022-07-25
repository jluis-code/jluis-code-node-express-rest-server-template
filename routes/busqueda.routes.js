const { Router } = require('express');
const { check } = require('express-validator');
const { busqueda } = require('../controllers/busqueda.controller');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

// Obtener todas las categorias - publico
router.get('/:colleccion/:termino', busqueda);

module.exports = router;