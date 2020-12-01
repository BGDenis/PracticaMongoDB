const {
    response
} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarioModel');
const validarCampos = require('../midlewares/validarCampos');
const {
    generateJWT
} = require('../helpers/jwt');

const login = async (req, res = response) => {

    const {
        email,
        password
    } = req.body;
    try {

        //verificar que el email exista en la bd
        const usuarioDB = await Usuario.findOne({
            email
        });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no registrado'
            });
        }
        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'password no valido'
            });
        }

        //Generacion de token utilizando jwt
        const token = await generateJWT(usuarioDB.id);
        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, comunicarse con el administrador'
        });
    }


}
const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const token = await generateJWT(uid);

    res.json({
        ok: true,
        token
    });
}
const googleSingIn = async (req, res = response) => {
    const googletoken = req.body.token;
    try {
        const {
            name,
            email,
            picture
        } = await googleVerify(googletoken);

        const usuarioDB = await Usuario.findOne({
            email
        });

        let usuario;
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }
        await usuario.save();
        const token = await generateJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'token incorrecto'
        });
    }
}

module.exports = {
    login,
    renewToken,
    googleSingIn,
}