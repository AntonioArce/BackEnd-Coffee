const trabajadorController = require('../controllers/trabajadorController')

module.exports = (app) =>{
    app.get('/api/employee/getAll', trabajadorController.getAll)
    app.post('/api/employee/create', trabajadorController.create)
    app.put('/api/employee/update', trabajadorController.update)
    app.delete('/api/employee/delete/:id', trabajadorController.delete)
}