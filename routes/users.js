const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validar-jwt');
const {validateUserRol} = require('../middlewares/validate-rol.js')

const {  validateRol, validateEmail, validateUserbyId, } = require('../helpers/db-validators');
const { usuariosGet, 
        usuariosPost, 
        usuariosPatch,
        usuarioDelete,
        usuariosPut } = require('../controllers/users');


const router = Router();




router.get('/',usuariosGet);

router.post('/',[
    //este es el manejador de la ruta
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password is required and should be have more tat 3 letters').isLength({min:6}),
   // check('email', 'email not valid').isEmail(),
    check('email').custom(validateEmail),
    check('rol').custom(validateRol),
    validateFields
],usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    validarJWT,
    validateUserRol,
    check('id','This is not a mongo id').isMongoId(),
    check('id').custom(validateUserbyId),
    validateFields
], usuarioDelete);

router.put('/:id',[
    check('id','This is not a mongo id').isMongoId(),
    check('rol').custom(validateRol),// if i leave  this validation here it is gonna a be requered that usre input rol
    check('id').custom(validateUserbyId),
    validateFields
], usuariosPut);


module.exports = router;