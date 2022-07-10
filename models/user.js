/* let user = {
    name: '',
    email: '',
    password: '',
    img: '',
    rol: '',
    estado: '',
    google: '',
} */

const {Schema, model, models} = require('mongoose');

const rolEnum = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: 'Rol is either ADMIN_ROLE, USER_ROLE'
}; 

var enu = {
    values: ['pending', 'accept', 'decline']
  , message: 'Status is required.'
  }

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: [true, 'Rol is required'],
        enum: rolEnum
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    return user;
}


module.exports = model('User', UsuarioSchema);