const Trabajador = require('../models/trabajador')

module.exports = {
    async create(req,res){
        const trabajador = req.body
        Trabajador.create(trabajador, (err,id) => {
            if(err){
                return res.status(500).json({
                    success: false,
                    message: 'Error creating employee',
                    error: err
                })
            }
            return res.status(200).json({
                success: true,
                message: 'Employee created successfully',
                id: `${id}`
            })
        })
    },
    async getAll(req,res){
        Trabajador.getAll((err,data) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error getting employee',
                    error: err
                })
            }
            else{
                return res.status(200).json(data)
            }
        })
    },
    async update(req,res){
        const employee = req.body
        Trabajador.update(employee, (err,idUsuario) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error updating employee',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: 'Employee updated successfully',
                data: `${idUsuario}`
            })
        })
    },
    async delete(req,res){
        const id = req.params.id
        Trabajador.delete(id, (err,data) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error deleting employee',
                    error: err
                })
            }
            return res.status(200).json({
                success: true,
                message: 'Employee deleted successfully',
                data: `${id}`
            })
        })
    }
}