const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPatch, usuarioDelete, usuariosPut, } = require('../controllers/users');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const Rol = require('../models/rol');
const router = Router();




router.get('/',usuariosGet);

router.post('/',[
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password is required and should be have more tat 3 letters').isLength({min:6}),
    check('email', 'email not valid').isEmail(),
    check('rol').custom(async (rol='')=>{
    const existRol = await Rol.findOne({rol});
        if(!existRol){
            return Error(`role: ${rol} is not define`)
        }
    }),
    validateFields
],usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuarioDelete);

router.put('/:id', usuariosPut);


module.exports = router;