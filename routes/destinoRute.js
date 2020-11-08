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
    getDestinos,
    actualizarDestino,
    eliminarDestino,
    crearDestino
} = require('../controllers/destinosController');

const router = Router();

router.get('/', getDestinos);

router.post('/', [
        validarJWT,
        // check('paquete', 'El id del paquete debe ser valido').isMongoId(),
        validarCampos
    ],
    crearDestino);

router.put('/:id', [
        validarJWT,
        //check('paquete', 'El id del paquete debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarDestino);

router.delete('/:id', validarJWT, eliminarDestino);



module.exports = router; //para exportar