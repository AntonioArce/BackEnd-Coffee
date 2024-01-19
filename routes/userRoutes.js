const userController = require('../controllers/userController')
module.exports = (app) =>{
    app.post('/api/usuario/clientes/create', userController.register)
    app.post('/api/usuario/login', userController.login)
    app.put('/api/usuario/update', userController.update)
}