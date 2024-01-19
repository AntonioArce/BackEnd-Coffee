module.exports = (io) =>{
    const namespace = io.of('/orders/carga')
    namespace.on('connection', (socket) =>{
        console.log('UN CLIENTE SE CONECTO A SOCKET IO -> /orders/carga');

        socket.on('consulta', (data) =>{
            console.log('CLIENTE EMITIO: ', data);
            namespace.emit(`/orders/${data.id_order}`, {message: data.id_client})
        })
        socket.on('disconnect', (data) =>{
            console.log('UN CLIENTE SE DESCONECTO DE SOCKET IO -> /orders/carga');
        })
    })
}