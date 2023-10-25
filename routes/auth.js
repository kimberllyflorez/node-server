const { Router } = require("express");
const { login } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const router = Router();

router.post('/login',[
    check('email', 'it is not a valid email//').isEmail(),
    check('password', ' password is required').not().isEmpty(),
    validateFields
],
login );//controllador 


module.exports = router;