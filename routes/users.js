const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPatch, usuarioDelete, usuariosPut, } = require('../controllers/users');
const router = Router();


router.get('/',usuariosGet);

router.post('/',usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuarioDelete);

router.put('/:id', usuariosPut);


module.exports = router;