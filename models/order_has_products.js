const db = require('../config/config')
const OrderHasProducts = {}

OrderHasProducts.create = (id_order, id_product, quantity, result) => {
    const sql = `INSERT INTO 
        order_has_products(
            id_order, id_product, quantity, created_at, updated_at)
        VALUES(?,?,?,?,?)`

    db.query(
        sql,
        [
            id_order, 
            id_product,
            quantity,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log("Error: ", err)
                result(err,null)
            }
            else{
                console.log('ID DE LA NUEVA ORDENHASPRODUCTS', res.insertId)
                result(null, res.insertId)
            }
        }
    )
}
OrderHasProducts.removeStock = (id_product,quantity, result) =>{
    const sql = `
        update productos SET stock = stock - ? where idProductos = ?
    `
    db.query(
        sql,
        [quantity, id_product],
        (err, res) => {
                if (err) {
                    console.log("Error: ", err)
                    result(err,null)
                }
                else{
                    console.log('Stock modificado con exito')
                    result(null, res.insertId)
                }
            }
        )
}

module.exports = OrderHasProducts