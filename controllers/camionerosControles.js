const {
    response
} = require('express');
const Camionero = require('../models/CamioneroModel');


const getCamionero = async (req, res = response) => {
    const camioneros = await Camionero.find().
    populate('usuario', 'nombre img').populate('camion', 'placa modelo');
    
    res.json(
 //       ok: true,
        camioneros,
    );
}
const crearCamioneros = async (req, res = response) => {
    const uid = req.uid;

    const camionero = new Camionero({
        usuario: uid,
        ...req.body
    });

    try {
        const camioneroDB = await camionero.save();
        res.json({
            ok: true,
            camionero: camioneroDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarCamionero = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const camionero = await Camionero.findById(id);
        if (!camionero) {
            return res.status(404).json({
                ok: true,
                msg: 'Camionero no existe'
            });
        }
        const cambiosCamionero = {
            ...req.body,
            usuario: uid
        }
        const camioneroActualizado = await Camionero.findByIdAndUpdate(id, cambiosCamionero, {
            new: true
        });
        return res.json({
            ok: true,
            camionero: camioneroActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarCamionero = async (req, res = response) => {
    const id = req.params.id;
    try {
        const camionero = await Camionero.findById(id);
        if (!camionero) {
            return res.status(404).json({
                ok: true,
                msg: 'Camionero no existe'

            });
        }
        await Camionero.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Camionero Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}

module.exports = {
    getCamionero,
    crearCamioneros,
    actualizarCamionero,
    eliminarCamionero
}