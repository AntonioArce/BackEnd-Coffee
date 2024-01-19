const mercadoPago = require('mercadopago')
const Order = require('../models/order')
const OrderHasProducts = require('../models/order_has_products')

mercadoPago.configure({
    sandbox: true,
    access_token: 'TEST-1660363096022782-052520-22bed494dcb9369237f7e9997c8e384b-294595697'
})

module.exports = {
    async createPayment(req,res){
        let payment = req.body
        console.log('PAYMENT: '+ payment);
        const payment_data = {
            token: payment.token,
            issuer_id: payment.issuer_id,
            payment_method_id: payment.payment_method_id,
            transaction_amount: payment.transaction_amount,
            installments: parseInt(payment.installments),
            payer: {
                email: payment.payer.email,
            }
        }

        const data = await mercadoPago.payment.create(payment_data).catch((err) => {
            console.log('ERROR: '+ err);
            return res.status(501).json({
                success: false,
                message: 'ERROR AL CREAR PAGO',
                error: err
            })
        })

        if(data !== undefined && data !== null){
            console.log('DATOS DE CLIENTE CORRECTOS', data.response);
            
            const order = payment.order
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

                            OrderHasProducts.removeStock(product.idProductos, product.quantity, (err,result) =>{
                                if(err){
                                    return res.status(501).json({
                                        success: false,
                                        message: 'Error creating order in products',
                                        error: err
                                    })
                                }
                            })
                        })
                    }
                    return res.status(201).json({
                        success: true,
                        message: 'Order created successfully ',
                        data: data.response
                    })
            })
        }
        else{
            return res.status(501).json({
                success: false,
                message: 'Error creating order',
                error: err
            })
        }
    }
}