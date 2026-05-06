import connectDB from "./db/db";
import User from "./db/models/userModel";

export default async function getUsers() {
    await connectDB();
    const data = await User.find().select('-password');
    return data;
}