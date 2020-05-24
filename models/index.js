const mongoose = require('mongoose')

var BdaySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    note: String,
    user_id: String
})

const bday = module.exports = mongoose.model('bday', BdaySchema)