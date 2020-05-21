const express = require('express')
var router = express.Router()

const Bday = require('../models')

router.get('/bdays', (req, res) => {
    Bday.find((err, docs) => {
        if (!err) {
            res.json({ docs })
        } else {
            res.json({ msg: 'Getting Error' })
        }
    })
})
//bday{ name,date,note}
//add bday
router.post('/bday/add', (req, res) => {
    var newBday = new Bday({
        name: req.body.name,
        date: req.body.date,
        note: req.body.note
    })
    newBday.save().then((doc) => {
        res.json({ doc })
    }).catch((err) => {
        res.json({ "error": "Bad Data" })
    })
})
//delete bday
router.delete('/bday/:id', (req, res) => {
    Bday.deleteOne({ _id: req.params.id }).then((doc) => {
        res.json({ doc })
    }).catch((err) => {
        res.json({ err })
    })
})
//edit bday
router.put('/bday/:id', (req, res) => {
    Bday.updateOne({ _id: req.params.id }, req.body).then((doc) => {
        res.json({ doc })
    }).catch((err) => {
        res.json({ err })
    })
})
//view bday
module.exports = router