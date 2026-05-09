'use server'
import connectDB from "../lib/db/db";
import User from "../lib/db/models/userModel";

export default async function fetchUsers() {
    await connectDB();
    const data = await User.find().select('-password');
    return data;
}