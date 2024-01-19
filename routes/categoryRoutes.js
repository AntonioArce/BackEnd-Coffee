const categoriesController = require('../controllers/categoriesController')
module.exports = (app) =>{
    app.get('/api/categories/getAll', categoriesController.getAll)
    app.post('/api/categories/create', categoriesController.create)
    app.put('/api/categories/update', categoriesController.update)
    app.delete('/api/categories/delete/:id', categoriesController.delete)
}