const serve = require('http').createServer((request, response) => {
    response.writeHead(204, {
        'Access-Controll-Allow-Origin': '*',
        'Access-Controll-Allow-Methods': 'OPTIONS, POST, GET'
    })

    response.end('Hey there')
})

const socketIo = require('socket.io')

const io = socketIo(serve, {
    cors: {
        origin: '*',
        credentials: false
    }
})

io.on('connection', socket => {
    console.log('connection', socket.id)

    socket.on('join-room', (roomId, userId) => {
        //Adicionar os usuários na mesma sala
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
        socket.on('disconnect', () => {
            console.log('Disconected !', roomId, userId)
            socket.to(roomId).broadcast.emit('user-disconnect', userId)
        })  
    })
})

const startServer = () => {
    const { address, port } = serve.address()
    console.log(`App running at ${address}:${port}`)
}

serve.listen(process.env.PORT || 3000, startServer)