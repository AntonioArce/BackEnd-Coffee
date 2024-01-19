const mercadoPagoController = require('../controllers/mercadoPagoController')
module.exports = (app) =>{
    app.post('/api/payments/create', mercadoPagoController.createPayment)
}