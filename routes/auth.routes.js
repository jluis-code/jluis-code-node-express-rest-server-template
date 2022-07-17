const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSigIn } = require('../controllers/auth.controller');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El id_token es requerido').not().isEmpty(),
    validarCampos
], googleSigIn);

module.exports = router;