import Conversation from "./db/models/conversationModel";
import Message from "./db/models/messageModel";
import connectDB from "./db/db";

export default async function getConversations(userId: string) {
    await connectDB();
    
    try {
        const conversations = await Conversation.find({
            participants: userId
        }).populate('participants');

        return conversations;
    } catch (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
}

export async function getConversationMessages(conversationId: string) {
    await connectDB();
    
    try {
        const conversation = await Conversation.findById(conversationId).populate({
            path: 'messages',
            model: Message
        });
        
        return conversation ? conversation.messages : [];
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
}