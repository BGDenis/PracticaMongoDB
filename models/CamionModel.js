const {
    Schema,
    model
} = require('mongoose');

const CamionSchema = Schema({
    placa: {
        type: String,
        required: true
    },
    modelo: {
        type: String
    },
    tipo: {
        type: String
    },
    capacidad: {
        type: String
    },
}, {
    collection: 'Camiones'
}); // codigo utilizado para asignar el nombre de la colleccion en mongodb

CamionSchema.method('toJSON', function () {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const {
        __v,
        ...object
    } = this.toObject();
    return object;
})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Camion', CamionSchema);