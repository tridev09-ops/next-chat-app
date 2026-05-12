import { Server } from "socket.io";
import connectDb from "./db/db.ts";
import Conversation from "./db/models/conversationModel.ts";
import Message from "./db/models/messageModel.ts";
//import { sendMessage } from "../routes/messageFunction";

const sendMessage = async (messageObj: {
    conversationId: string;
    sender: string;
    message: string;
}) => {
    if (!messageObj.conversationId || !messageObj.sender || !messageObj.message) {
        return;
    }

    await connectDb();

    const conversation = await Conversation.findById(messageObj.conversationId);
    if (!conversation) {
        return;
    }

    const receiverId = conversation.participants.find((p: string) => p.toString() !== messageObj.sender);
    if (!receiverId) {
        return;
    }

    const newMessage = await Message.create({
        sender: messageObj.sender,
        receiver: receiverId.toString(),
        message: messageObj.message,
    });

    await Conversation.findByIdAndUpdate(messageObj.conversationId, {
        $push: { messages: newMessage._id }
    });
};

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
                for (let i = userMap.length - 1; i >= 0; i--) {
                    if (userMap[i].id === socket.id || userMap[i].name === username) {
                        userMap.splice(i, 1);
                    }
                }
                userMap.push({
                    name: username,
                    id: socket.id
                });

                console.log("User added and his name is: ", username)
                console.log("User Map: ", userMap)
            })

        // Listen for events
        socket.on("chat message",
            (messageObj) => {
                console.log("Message:", messageObj.message);

                // Extracting socket id of receiver
                let receiverId
                userMap.forEach((user) => {
                    if (user.name == messageObj.receiverName) {
                        receiverId = user.id
                    }
                })

                if (receiverId) {
                    io.to(receiverId).emit("chat message",
                        messageObj);
                }

                // Save message to database without Next server action APIs.
                sendMessage({
                    conversationId: messageObj.conversationId,
                    sender: messageObj.sender,
                    message: messageObj.message
                }).catch((error) => {
                    console.error("Error saving message:", error);
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