const Category = require('../models/category')

module.exports = {
    async getAll(req,res){
        Category.getAll((err,data)=>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error listing category',
                    error: err
                })
            }
            else{
                return res.status(200).json(data)
            }
        })
    },
    async create(req,res){
        const category = req.body 
        Category.create(category, (err, id) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error creating category',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: 'Category created',
                data: `${id}`
            })
        })
    },
    async update(req,res){
        const category = req.body
        console.log("categoria: "+ category)
        Category.update(category, (err,id) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error updating category',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: 'Category updated',
                data: `${id}`
            })
        })
    },

    async delete(req,res){
        const id = req.params.id
        Category.delete(id, (err,data) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error deleting category',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: 'Se elimino correctamente la categoria',
                data: `${id}`
            })
        })
    }
}