const mongoose = require('mongoose')

const Schema = mongoose.Schema

const clientSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4
    },
    email: { type: String },
    phone: { type: String },
    note: { type: String },
    products: { type: String }
}, {
    timestamps: true
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client