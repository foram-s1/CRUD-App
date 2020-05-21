const mongoose = require('mongoose')

var BdaySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: "dd/mm/yyyy",
        required: true
    },
    note: String
})

const bday = module.exports = mongoose.model('bday', BdaySchema)