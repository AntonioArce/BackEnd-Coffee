const productosController = require('../controllers/productosController')
module.exports = (app, upload) =>{
    app.get('/api/products/findByCategory/:idTipo_Producto', productosController.findByCategory )
    app.post('/api/products/createWithImage', upload.array('image', 1), productosController.create)
    app.put('/api/products/update', productosController.update)
    app.put('/api/products/updateWithImage', upload.array('image', 1), productosController.updateWhitImage)
    app.delete('/api/products/delete/:id', productosController.delete)
}