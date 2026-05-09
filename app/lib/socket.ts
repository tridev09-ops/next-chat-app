import { Server } from "socket.io";
import { sendMessage } from '@/routes/messageFunction'

const initSocket = (server: any) => {
    // Attach socket.io to the server
    const io = new Server(server, {
        cors: {
            origin: "*", // allow any origin (use your frontend URL in production)
            methods: ["GET", "POST"]
        }
    });
    const userMap: { name: string; id: string; }[] = []

    // Handle socket.io connections
    io.on("connection", (socket) => {
        socket.on("set user",
            (username) => {
                userMap.push({
                    name: username,
                    id: socket.id
                })
            })

        // Listen for events
        socket.on("chat message",
            (messageObj) => {
                console.log("Message:", messageObj.message);

                // Extracting socket id of receiver
                let receiverId
                userMap.forEach((user, i) => {
                    if (user.name == messageObj.receiver) {
                        receiverId = user.id
                    }
                })

                // Send to receiver
                io.to(receiverId!).emit("chat message",
                    messageObj);

                // Save message to database
                sendMessage({
                    conversationId: messageObj.conversationId,
                    sender: messageObj.sender,
                    message: messageObj.message
                });
            });

        // Handle disconnect
        socket.on("disconnect",
            () => {
                userMap.forEach((user, i) => {
                    if (user.id == socket.id) {
                        userMap.splice(i, 1)
                    }
                })
            });
    });
}

export default initSocket