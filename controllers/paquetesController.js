const {
    response
} = require('express');
const {
    model
} = require('../models/PaqueteModel');
const Paquete = require('../models/PaqueteModel');

const getPaquete = async (req, res = response) => {
    const paquete = await Paquete.find()/*.populate("destino","ciudad codCiudad")*/;
    /*populate('camionero', 'nombre telefono').
    populate('destino', 'ciudad');*/
    res.json(
       // ok: true,
       paquete
    );
}

const getPaqueteId = async (req, res = response) => {
    const id = req.params.id;
    const paquete = await Paquete.findById(id);
    res.json(
        //ok: true,
        paquete
    );
}

const crearPaquete = async (req, res = response) => {
    const uid = req.uid;
    const paquete = new Paquete({
        usuario: uid,
        ...req.body
    });
    try {
        const paqueteDB = await paquete.save();
        res.json({
            ok: true,
            Paquete: paqueteDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarPaquete = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {

        const paquete = await Paquete.findById(id);
        if (!paquete) {
            return res.status(404).json({
                ok: true,
                msg: 'paquete no existe'
            });
        }
        const cambiosPaquete = {
            ...req.body,
            usuario: uid
        }
        const paqueteActualizado = await Paquete.findByIdAndUpdate(id, cambiosPaquete, {
            new: true
        });
        return res.json({
            ok: true,
            Paquete: paqueteActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarPaquete = async (req, res = response) => {
    const id = req.params.id;
    try {
        const paquete = await Paquete.findById(id);
        if (!paquete) {
            return res.status(404).json({
                ok: true,
                msg: 'paquete no existe'

            });
        }

        await Paquete.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Paquete Eliminado'

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
    getPaquete,
    crearPaquete,
    actualizarPaquete,
    eliminarPaquete,
    getPaqueteId
}