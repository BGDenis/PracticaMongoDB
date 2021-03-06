const {
    Router
} = require('express');
const {
    check
} = require('express-validator');

const {
    validarCampos
} = require('../midlewares/validarCampos');
const {
    validarJWT
} = require('../midlewares/validarJWT');

/*LOGINGOOGLE*/
const {
    login,
    googleSingIn,
    renewToken
} = require('../controllers/authController');

const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene la estructura requerida').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);


router.get('/renew',
    validarJWT,
    renewToken);

/*loginGoogle*/
router.post('/google', [
    check('token', 'El token es obligatorio').not().isEmpty(),
    validarCampos
], googleSingIn);

module.exports = router;