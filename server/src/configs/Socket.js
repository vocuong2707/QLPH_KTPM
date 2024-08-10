const { Server } = require('socket.io');

let io;

const initializeSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: '*', // Cần thay đổi này tùy theo policy của bạn
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        // console.log(socket);

        socket.on('disconnect', () => {
            // console.log('A user disconnected');
        });

        // Các sự kiện Socket.IO khác ở đây
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error('Socket.IO is not initialized');
    }
    return io;
};

module.exports = {
    initializeSocket,
    getIO,
};
