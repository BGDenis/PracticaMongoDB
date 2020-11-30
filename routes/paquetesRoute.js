const {
    Router
} = require('express');
const {
    check
} = require('express-validator');
const {
    validarJWT
} = require('../midlewares/validarJWT');
const {
    validarCampos
} = require('../midlewares/validarCampos');
const {
    getPaquete,
    actualizarPaquete,
    eliminarPaquete,
    crearPaquete,
    getPaqueteId
} = require('../controllers/paquetesController');
const { getCamionesId } = require('../controllers/caminoesController');

const router = Router();

router.get('/', getPaquete);

router.get('/:id',getPaqueteId)

router.post('/', [
       //validarJWT,
        check('destinatario', 'El nombre del destinatario es obligatorio').not().isEmpty(),
        check('dirDestino', 'La direcion del destinatario es obligatorio').not().isEmpty(),
        //check('destino', 'El id del destino debe ser valido').isMongoId(),
        validarCampos
    ],
    crearPaquete);

router.put('/:id', [
        //validarJWT,
        check('destinatario', 'El nombre del destinatario es obligatorio').not().isEmpty(),
        check('dirDestino', 'La direcion del destinatario es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarPaquete);

router.delete('/:id', 
//validarJWT, 
eliminarPaquete);

module.exports = router; //para exportar