const {
    response
} = require('express');
const Destino = require('../models/DestinoModel');

const getDestinos = async (req, res = response) => {
    const destinos = await Destino.find().populate('paquete', 'destinatario');
    res.json({
        ok: true,
        destinos
    });
}

const crearDestino = async (req, res = response) => {
    const uid = req.uid;
    const destino = new Destino({
        usuario: uid,
        ...req.body
    });
    try {
        const destinoDB = await destino.save();
        res.json({
            ok: true,
            destino: destinoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}

const actualizarDestino = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const destino = await Destino.findById(id);
        if (!destino) {
            return res.status(404).json({
                ok: true,
                msg: 'Destino no existe'
            });
        }
        const cambiosDestino = {
            ...req.body,
            usuario: uid
        }

        const destinoActualizado = await Destino.findByIdAndUpdate(id, cambiosInvestigador, {
            new: true
        });

        return res.json({
            ok: true,
            destino: destinoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}

const eliminarDestino = async (req, res = response) => {
    const id = req.params.id;
    try {

        const destino = await Destino.findById(id);
        if (!destino) {
            return res.status(404).json({
                ok: true,
                msg: 'Destino no existe'

            });
        }
        await Destino.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Destino Eliminado'
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
    getDestinos,
    crearDestino,
    actualizarDestino,
    eliminarDestino
}