const db = require('../config/config')
const Order = {}

Order.create = (order, result) => {
    const sql = `INSERT INTO 
        orders(id_client, estado, timestamp, created_at, updated_at)
        VALUES(?,?,?,?,?)`

    db.query(
        sql,
        [
            order.id_client, 
            1,
            Date.now(),
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log("Error: ", err)
                result(err,null)
            }
            else{
                console.log('ID DE LA NUEVA ORDEN', res.insertId)
                result(null, res.insertId)
            }
        }
    )
}

Order.findByStatus = (estado, result) => {
    const sql = `Select O.id, O.id_client, 
        JSON_OBJECT(
            'id', CONVERT(u.idUsuario, char),
            'nombre', CONCAT(u.nombre,' ',u.apellido_paterno,' ',u.apellido_materno)
        ) as client, 
        O.estado, O.timestamp, 
        json_arrayagg(
            JSON_OBJECT(
                'id', CONVERT(p.idProductos, char),
                'nombre', p.nombre,
                'descripcion', p.descripcion,
                'imagen', p.imagen,
                'precio', p.precio,
                'quantity', op.quantity
            )
        ) as products 
        from orders as O 
        INNER JOIN cliente as c
        on c.idCliente = O.id_client
        INNER JOIN usuario as u
        on u.idUsuario = c.Usuario_idUsuario
        INNER JOIN order_has_products as op
        on op.id_order = O.id
        INNER JOIN productos as p
        on p.idProductos = op.id_product
        where estado = ?
        group by O.id `

        db.query(
            sql, estado, 
            (err, data) => {
                if (err) {
                    console.log("Error: ", err)
                    result(err,null)
                }
                else{

                    result(null, data)
                }
            }
        )

}
Order.findByClientAndStatus = (id_client,estado, result) => {
    const sql = `Select O.id, O.id_client, 
        JSON_OBJECT(
            'id', CONVERT(u.idUsuario, char),
            'nombre', CONCAT(u.nombre,' ',u.apellido_paterno,' ',u.apellido_materno)
        ) as client, 
        O.estado, O.timestamp, 
        json_arrayagg(
            JSON_OBJECT(
                'id', CONVERT(p.idProductos, char),
                'nombre', p.nombre,
                'descripcion', p.descripcion,
                'imagen', p.imagen,
                'precio', p.precio,
                'quantity', op.quantity
            )
        ) as products 
        from orders as O 
        INNER JOIN cliente as c
        on c.idCliente = O.id_client
        INNER JOIN usuario as u
        on u.idUsuario = c.Usuario_idUsuario
        INNER JOIN order_has_products as op
        on op.id_order = O.id
        INNER JOIN productos as p
        on p.idProductos = op.id_product
        where estado = ? and O.id_client = ?
        group by O.id `

        db.query(
            sql, [estado,id_client], 
            (err, data) => {
                if (err) {
                    console.log("Error: ", err)
                    result(err,null)
                }
                else{

                    result(null, data)
                }
            }
        )

}

Order.updateToPrepare = (id_order, result) =>{
    const sql = `
        UPDATE orders
        SET estado = ?, updated_at = ?
        WHERE id = ?
    `
    db.query(
        sql,
        [
            2,
            new Date(),
            id_order 
        ],
        (err, data) => {
            if (err) {
                console.log("Error: ", err)
                result(err,null)
            }
            else{
                result(null, id_order)
            }
        }
    )

}
Order.updateToFine = (id_order, result) =>{
    const sql = `
        UPDATE orders
        SET estado = ?, updated_at = ?
        WHERE id = ?
    `
    db.query(
        sql,
        [
            3,
            new Date(),
            id_order 
        ],
        (err, data) => {
            if (err) {
                console.log("Error: ", err)
                result(err,null)
            }
            else{
                result(null, id_order)
            }
        }
    )

}
Order.updateToDelivery = (id_order, result) =>{
    const sql = `
        UPDATE orders
        SET estado = ?, updated_at = ?
        WHERE id = ?
    `
    db.query(
        sql,
        [
            4,
            new Date(),
            id_order 
        ],
        (err, data) => {
            if (err) {
                console.log("Error: ", err)
                result(err,null)
            }
            else{
                result(null, id_order)
            }
        }
    )
}

module.exports = Order