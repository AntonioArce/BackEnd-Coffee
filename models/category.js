const db = require('../config/config')
const Category = {}

Category.getAll = (result) =>{
    const sql = `SELECT idTipo_Producto, nombre_tipo, descripcion from tipo_producto ORDER BY nombre_tipo`
    db.query(sql, 
        (err, data) => {
            if (err) {
                console.log("Error: ", err)
                result(err,null)
            }
            else{
                console.log('Categoria extraidas con exito')
                result(null, data)
            }
        }
    )
}

Category.create = (category, result) => {
    const sql = `INSERT INTO tipo_producto(nombre_tipo, descripcion) VALUES(?,?)`

    db.query(
        sql,[category.nombre_tipo, category.descripcion],
        (err, res) => {
            if (err) {
                console.log("Error: ", err)
                result(err,null)
            }
            else{
                console.log('Categoria agregada')
                result(null, res)
            }
        }
    )
}

Category.update = (category, result) =>{
    const sql = `UPDATE tipo_producto 
        SET nombre_tipo = ?,
        descripcion = ? 
        WHERE idTipo_Producto = ?`
    db.query(sql, [
            category.nombre_tipo,
            category.descripcion,
            category.idTipo_Producto
        ],
        (err, res) => {
            if (err) {
                console.log("Error: ", err)
                result(err,null)
            }
            else{
                console.log('Categoria modificada: ', category.id)
                result(null, category.id)
            }
        }

    )
}

Category.delete = (id, result) =>{
    const sql = `DELETE FROM tipo_producto WHERE idTipo_producto = ? `
    db.query(
        sql,id,
        (err, res) => {
            if (err) {
                console.log("Error: ", err)
                result(err,null)
            }
            else{
                console.log('Categoria eliminada: ', id)
                result(null, id)
            }
        }
    )
}

module.exports = Category