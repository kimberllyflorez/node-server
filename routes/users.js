const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const {  validateRol, validateEmail } = require('../helpers/db-validators');
const { usuariosGet, 
        usuariosPost, 
        usuariosPatch,
        usuarioDelete,
        usuariosPut } = require('../controllers/users');

const router = Router();




router.get('/',usuariosGet);

router.post('/',[
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password is required and should be have more tat 3 letters').isLength({min:6}),
   // check('email', 'email not valid').isEmail(),
    check('email').custom(validateEmail),
    check('rol').custom(validateRol),
    validateFields
],usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuarioDelete);

router.put('/:id', usuariosPut);


module.exports = router;