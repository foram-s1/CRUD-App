require('./models')
const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const cors = require('cors')
const index=require('./routes/index')
const Users=require('./routes/Users')
const mongoose = require('mongoose')

const app=express()
const port=process.env.PORT || 3000
const url = 'mongodb+srv://admin:admin@cluster0-h3vu0.mongodb.net/Birthdays?retryWrites=true&w=majority'

mongoose.connect(url, {useUnifiedTopology: true}, (err)=>{
    if(!err){
        console.log("Database Connected Successfully")
    }else{
        console.log("Error in connecting to database")
    }
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/users', Users)
app.use('/api',index)

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(port,()=>{
    console.log('Server started: '+port)
})
