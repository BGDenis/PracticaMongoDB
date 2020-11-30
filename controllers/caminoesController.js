const {
    response
} = require('express');
const Camion = require('../models/CamionModel');

const getCamiones = async (req, res = response) => {
    const camiones = await Camion.find().
    populate('usuario', 'nombre img');
    res.json(
        //ok: true,
        camiones
    );
}
const getCamionesId = async (req, res = response) => {
    const id = req.params.id;
    const camiones = await Camion.findById(id);
    res.json(
        //ok: true,
        camiones
    );
}

const crearCamion = async (req, res = response) => {
    const uid = req.uid;

    const camion = new Camion({
        usuario: uid,
        ...req.body
    });

    try {
        const camionDB = await camion.save();
        res.json({
            ok: true,
            camion: camionDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarCamion = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const camion = await Camion.findById(id);
        if (!camion) {
            return res.status(404).json({
                ok: true,
                msg: 'Camion no existe'
            });
        }

        const cambiosCamion = {
            ...req.body,
            usuario: uid
        }
        const camionActualizado = await Camion.findByIdAndUpdate(id, cambiosCamion, {
            new: true
        });

        return res.json({
            ok: true,
            camion: camionActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarCamion = async (req, res = response) => {
    const id = req.params.id;
    try {
        const camion = await Camion.findById(id);
        if (!camion) {
            return res.status(404).json({
                ok: true,
                msg: 'Camion no existe'
            });
        }
        await Camion.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Camion Eliminado'
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
    getCamiones,
    crearCamion,
    actualizarCamion,
    eliminarCamion,
    getCamionesId
}