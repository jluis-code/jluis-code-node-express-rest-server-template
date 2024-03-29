const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es oblogatorio'],
            unique: true
        },
        estado: {
            type: Boolean,
            default: true,
            required: true,
        },
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
);

module.exports = model('Categoria', CategoriaSchema);