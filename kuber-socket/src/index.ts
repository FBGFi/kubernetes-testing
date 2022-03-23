import { Server } from 'socket.io';
import http from 'http';

import dotenv from 'dotenv';
import { exit } from 'process';
dotenv.config();

const httpServer = http.createServer();

type TRooms = {
    [roomName: string]: {
        messages: {
            userName: string,
            message: string
        }[],
        users: {
            [socketId: string]: string
        }
    }
}

const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

const rooms: TRooms = {};

io.on('connection', (socket) => {
    const room = socket.handshake.query.roomName as string;
    const userName = socket.handshake.query.userName as string;
    console.log("User connecting");
    if (!userName || !room) {
        socket.emit('unauthorized', { status: 401, message: "Unauthorized" });
        socket.disconnect();
    }
    if (!rooms[room]) {
        rooms[room] = {
            messages: [],
            users: {}
        }
    }
    rooms[room].users[socket.id] = userName;

    socket.join(room);

    socket.emit('messages', {
        // send the user previously sent messages
    });

    io.to(room).emit('newuser', {
        // tell other users new one joined
    });

    socket.on('disconnect', () => {
        if (userName && room) {
            io.to(room).emit('userleft', {
                // tell that the user left
            })
        }
        function closePodAfterPeriod(ms: number) {
            if (Object.keys(rooms).length === 0) {
                setTimeout(() => {
                    if (Object.keys(rooms).length === 0) {
                        // shut down the pod
                    }
                }, ms);
            }
        }

        if (rooms[room].users[socket.id]) {
            delete rooms[room].users[socket.id];
            if (Object.keys(rooms[room].users).length === 0) {
                setTimeout(() => {
                    if (Object.keys(rooms[room].users).length === 0) {
                        delete rooms[room];
                        if (Object.keys(rooms).length === 0) {
                            closePodAfterPeriod(30000);
                        }
                    }
                }, 30000);
            }
        }
        if (Object.keys(rooms).length === 0) {
            closePodAfterPeriod(30000);
        }
    })
});

httpServer.listen(typeof (process.env.PORT) === "number" ? process.env.PORT : 3001, () => {
    console.log("Socket service started");
});

setTimeout(() => {
    httpServer.close();
    exit();
}, 100000)