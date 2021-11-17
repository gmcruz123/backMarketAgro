const express = require('express')
const morgan = require('morgan')
const mongoose= require('mongoose')
const cors = require('cors')
const app = express()
const authRoutes = require('./routes/auth.routes')
//CONFIGURACIONES
mongoose.connect('mongodb+srv://root:VEhg404clKb3VBVj@cluster0.ia3rh.mongodb.net/cluster0?retryWrites=true&w=majority')
.then(db => console.log('Connected to Mongo'))
.catch(err => console.log(err)) 
app.set('port', process.env.PORT || 3005)


//MIDDLEWARES
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({
    extended: false
}))

//RUTAS
app.use('/auth', authRoutes)

//INICIO DEL SERVIDOR
app.listen(app.get('port'), ()=>{
    console.log('Server Running')
})