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
const {
    getCamiones,
    actualizarCamion,
    eliminarCamion,
    crearCamion,
    getCamionesId
} = require('../controllers/caminoesController');

const router = Router();

router.get('/', getCamiones);

router.get('/:id', getCamionesId);

router.post('/', [
        // validarJWT,
        check('placa', 'La placa es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCamion);

router.put('/:id', [
        //validarJWT,
       // check('Placa', 'La placa es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarCamion);

router.delete('/:id',
    // validarJWT,
    eliminarCamion);

module.exports = router; //para exportar