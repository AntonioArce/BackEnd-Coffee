const Order = require('../models/order')
const OrderHasProducts = require('../models/order_has_products')

module.exports = {
    
    create(req,res){
        const order = req.body 

        Order.create(order, async (err, id) =>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error creating order',
                    error: err
                })
            }
            for(const product of order.products){
                await OrderHasProducts.create(id,product.idProductos, product.quantity, (err, aidi) =>{
                    if(err){
                        return res.status(501).json({
                            success: false,
                            message: 'Error creating order in products',
                            error: err
                        })
                    }
                })
            }
            return res.status(201).json({
                success: true,
                message: 'Order created successfully ',
                data: `${id}`
            })
        })
    },

    async findByStatus(req,res){
        const estado = req.params.status
        Order.findByStatus(estado, (err,data)=>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error finding orders',
                    error: err
                })
            }
            
            for(const d of data){
                d.client = JSON.parse(d.client)
                d.products = JSON.parse(d.products)
            }
            return res.status(201).json(data)
        })
    },
    async findByClientAndStatus(req, res){
        const estado = req.params.status
        const client = req.params.id_client

        Order.findByClientAndStatus(client, estado, (err,data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error updating orders',
                    error: err
                })
            }
            for(const d of data){
                d.client = JSON.parse(d.client)
                d.products = JSON.parse(d.products)
            }
            return res.status(201).json(data)
        })


    },
    async updateToPrepare(req,res){
        const order = req.body
        Order.updateToPrepare(order.id, (err, id_order) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error updating orders',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: 'Order updated successfully ',
                data: `${id_order}`
            })
        })
    },
    async updateToFine(req,res){
        const order = req.body
        Order.updateToFine(order.id, (err, id_order) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error updating orders',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: 'Order updated successfully ',
                data: `${id_order}`
            })
        })
    },
    async updateToDelivery(req,res){
        const order = req.body
        Order.updateToDelivery(order.id, (err, id_order) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error updating orders',
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: 'Order updated successfully ',
                data: `${id_order}`
            })
        })
    }
}