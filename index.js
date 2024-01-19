const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const logger = require('morgan')
const cors = require('cors')
const multer = require('multer')
const mercadopago = require('mercadopago')

mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-1660363096022782-052520-22bed494dcb9369237f7e9997c8e384b-294595697'
})

const io = require('socket.io')(server)

/*IMPORTAR SOCKETS*/
const ordersSocket = require('./sockets/ordersSockets')

const port = process.env.PORT || 3000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors())
app.disable('x-powered-by')
app.set('port', port)

//Sockets to connect
ordersSocket(io)

const upload = multer({
    storage: multer.memoryStorage()
})


server.listen(3000, '192.168.1.21' || 'localhost', function(){
    console.log('Server running at http://192.168.1.73:' + port)
})

// Importar Rutas
const usersRoutes = require('./routes/userRoutes')
const categoriesRoutes = require('./routes/categoryRoutes')
const trabajadoresRoutes = require('./routes/trabajadorRoutes')
const productsRoutes = require('./routes/productosRoutes')
const orderRoutes = require('./routes/orderRoutes')
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes')

// Llamado a las rutas
usersRoutes(app)
categoriesRoutes(app)
trabajadoresRoutes(app)
productsRoutes(app, upload)
orderRoutes(app)
mercadoPagoRoutes(app)

app.get('/', (req,res) =>{
    res.send('Ruta raiz de la Aplicacion')
})

app.get('/test', (req,res) =>{
    res.send('Ruta test')
})

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.stack ||  500).send(err.stack)
})