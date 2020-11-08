const {
    Schema,
    model
} = require('mongoose');

const DestinoSchema = Schema({
    ciudad: {
        type: String,
        required: true
    },
    codCiudad:{
        type: String,
        required: true
    },
    paquete:{
        type: Schema.Types.ObjectId,
        ref: 'Paquete',
        required: false
    }
}, {
    collection: 'Destinos'
}); // codigo utilizado para asignar el nombre de la colleccion en mongodb

DestinoSchema.method('toJSON', function () {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const {
        __v,
        ...object
    } = this.toObject();
    return object;
})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Destino', DestinoSchema);