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
    getCamionero,
    actualizarCamionero,
    eliminarCamionero,
    crearCamioneros
} = require('../controllers/camionerosControles');

const {
    validarJWT
} = require('../midlewares/validarJWT');

const router = Router();

router.get('/', getCamionero);

router.post('/', [
    //validarJWT,
    check('nombre', 'El nombre del camionero es obligatorio').not().isEmpty(),
    validarCampos
], crearCamioneros);

router.put('/:id', [
        //validarJWT,
        check('nombre', 'El nombre del camionero es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarCamionero);

router.delete('/:id',
    /*validarJWT*/
    eliminarCamionero);

module.exports = router;