const db = require('../config/config')
const bcrypt = require('bcryptjs')
const Trabajador = {}

Trabajador.create = async (trabajador, result) => {
    const hash = await bcrypt.hash(trabajador.contrasena, 10)
    const sql = `call registerTrabajador(?,?,?,?,?,?)`

    db.query(sql, [
            trabajador.nombre,
            trabajador.apellido_paterno,
            trabajador.apellido_materno,
            trabajador.num_telefono,
            trabajador.correo,
            hash,
        ],
        (err, res) => {
            if (err) {
                console.log(err)
                result(err, null)
            }
            else{
                console.log('Id employee: ', res.insertId)
                result(null, res.insertId)
            }
        }
    )
}

Trabajador.getAll = (result) => {
    const sql = `select idUsuario,nombre,apellido_paterno,apellido_materno,num_telefono,correo from usuario WHERE Rol_idRol = 3`
    db.query(sql, (err, data) => {
        if (err) {
            console.log('ERROR: '+err)
            result(err, null)
        }
        else{
            console.log('Lista de empleados extraida con exito')
            result(null, data)
        }
    })
}


Trabajador.update = (employee, result) =>{
    const sql = `UPDATE usuario 
        SET nombre = ?,
        apellido_paterno =?,
        apellido_materno =?,
        num_telefono =?,
        correo =? 
        WHERE idUsuario = ? and 
        Rol_idRol = 3`
    db.query(sql, [
            employee.nombre,
            employee.apellido_paterno,
            employee.apellido_materno,
            employee.num_telefono,
            employee.correo,
            employee.idUsuario
        ],
        (err, res) => {
            if (err) {
                console.log("Error: ", err)
                result(err,null)
            }
            else{
                console.log('Usuario trabajador modificado: ', employee.idUsuario)
                result(null, employee.idUsuario)
            }
        }

    )
}

Trabajador.delete = (id, result) =>{
    const sql = `DELETE FROM usuario WHERE idUsuario =? and Rol_idRol = 3`
    db.query(sql, [id], (err, res) => {
        if (err) {
            console.log("Error: ", err)
            result(err,null)
        }
        else{
            console.log('Usuario trabajador eliminado: ', id)
            result(null, id)
        }
    })
}


module.exports = Trabajador 