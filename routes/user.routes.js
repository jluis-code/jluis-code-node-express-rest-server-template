const { Router } = require('express');
const { check } = require('express-validator');

const { userGet,
    userPost,
    userPut,
    userDelete,
    userPatch } = require('../controllers/user.controller');

const { esRolValido, existeEmail, existeUsuarioById } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole, isValidRole } = require('../middlewares')

const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(esRolValido),
    validarCampos,
], userPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener al menos 8 dígitos').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    /* check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROL']), */
    check('rol').custom(esRolValido),
    check('email').custom(existeEmail),
    validarCampos
], userPost);

router.delete('/:id',
    [
        validarJWT,
        //esAdminRole,
        isValidRole('ADMIN_ROLE', 'DEV_ROL'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos,
    ], userDelete);

router.patch('/', userPatch);

module.exports = router;