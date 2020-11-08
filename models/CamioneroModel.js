const {
    Schema,
    model
} = require('mongoose');

const CamioneroSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String
    },
    telefono: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    Camion: {
        type: Schema.Types.ObjectId,
        ref: 'Camion',
        required: false
    },
    paqute: {
        type: Schema.Types.ObjectId,
        ref: 'Paquete',
        required: false
    }
}, {
    collection: 'Camioneros'
});

CamioneroSchema.method('toJSON', function () {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const {
        __v,
        ...object
    } = this.toObject();
    return object;
})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Camionero', CamioneroSchema);