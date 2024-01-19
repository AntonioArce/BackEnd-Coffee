const db = require('../config/config')
const Productos = {}

Productos.create = async (product, result) => {
    const sql = `INSERT INTO productos(nombre, descripcion, stock, precio, Tipo_Producto_idTipo_Producto, is_active, imagen)
    VALUES (?,?,?,?,?,?,?) `

    db.query(
        sql,
        [
            product.nombre,
            product.descripcion,
            product.stock,
            product.precio,
            product.Tipo_Producto_idTipo_Producto,
            1,
            product.imagen,
        ],
        (err, res) => {
            if (err) {
                console.log('Error: ' + err)
                result(err, null)
            } else {
                console.log('Id del nuevo producto: ', res.insertId)
                result(null, res.insertId)
            }
        }
    )
}

Productos.findByCategory = async (idCat, result) => {
    const sql = `SELECT idProductos,nombre, descripcion, stock, precio, imagen, Tipo_Producto_idTipo_Producto FROM productos WHERE Tipo_Producto_idTipo_Producto = ?`
    db.query(
        sql,
        [idCat],
        (err, data) => {
            if (err) {
                console.log('Error:'+ err)
                result(err, null)
            } else {
                result(null, data)
            }
        })
}

Productos.update = (product, result) =>{
    const sql = `UPDATE productos SET nombre = ?, descripcion = ?, stock = ?, precio = ?, Tipo_Producto_idTipo_Producto = ?, imagen = ? WHERE idProductos = ?`
    db.query(
        sql,
        [
            product.nombre,
            product.descripcion,
            product.stock,
            product.precio,
            product.Tipo_Producto_idTipo_Producto,
            product.imagen,
            product.idProductos,
        ],
        (err, res) => {
            if (err) {
                console.log('Error:'+ err)
                result(err, null)
            } else {
                console.log("Id del producto actualizado: " + product.idProductos)
                result(null, product.idProductos)
            }
        }
    )
}

Productos.delete = (id, result) => {
    const sql = `DELETE FROM productos WHERE idProductos = ?`
    db.query(
        sql,
        [id],
        (err, res) => {
            if (err) {
                console.log('Error:'+ err)
                result(err, null)
            } else {
                console.log("Id del producto eliminado: " + id)
                result(null, id)
            }
        }
    )
}
module.exports = Productos