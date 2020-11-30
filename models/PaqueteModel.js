const {
    Schema,
    model
} = require('mongoose');

const PaqueteSchema = Schema({
    destinatario: {
        type: String,
        require: true
    },
    dirDestino:{
        type: String,
        require: true
    },
    descripcion: {
        type: String,
    },
   
    camionero: {
        type: Schema.Types.ObjectId,
        ref: 'Camionero',
        required: false
    },
   destino:{
        type: Schema.Types.ObjectId,
        ref: 'Destino',
        required: false
    }
}, {
    collection: 'Paquetes'
});

PaqueteSchema.method('toJSON', function () {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const {
        __v,
       ...object
    } = this.toObject();
    return object;
})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Paquete',PaqueteSchema);