const express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')

const Bday = require('../models')

process.env.SECRET_KEY='secret'

router.get('/bdays', (req, res) => {
    var decoded=jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    Bday.find({
        user_id:decoded._id
    }).then((docs)=> {
            res.json({ docs })
        }).catch((error)=>{
            res.json({ error})      
    })
})
//bday{ name,date,note}
//add bday
router.post('/bday/add', (req, res) => {
    var decoded=jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    var newBday = new Bday({
        name: req.body.name,
        date: req.body.date,
        note: req.body.note,
        user_id: decoded._id
    })
    newBday.save().then((doc) => {
        res.json({ doc })
    }).catch((err) => {
        res.json({ "error": "Bad Data" })
    })
})
router.post('/bday/search', (req,res)=>{
    var decoded=jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    const value = req.body.name
    Bday.find({ $or: [
        {
            name: { $regex: value, $options: 'ig', }, user_id: decoded._id,
        },{
            date: { $regex: value, $options: 'ig', }, user_id: decoded._id,
        },
        ]},(err,docs)=>{
        if(err){    
            res.json({err})
        }else {
            res.json({docs})
        }
    })   
})
//delete bday
router.delete('/bday/:id', (req, res) => {
    var decoded=jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    Bday.deleteOne({ _id: req.params.id, user_id:decoded._id }).then((doc) => {
        res.json({ doc })
    }).catch((err) => {
        res.json({ err })
    })
})
//edit bday
router.put('/bday/:id', (req, res) => {
    var decoded=jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    Bday.updateOne({ _id: req.params.id, user_id: decoded._id }, req.body).then((doc) => {
        res.json({ doc })
    }).catch((err) => {
        res.json({ err })
    })
})
//view bday
module.exports = router