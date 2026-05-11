'use server'
import connectDB from "../lib/db/db";
import User from "../lib/db/models/userModel";

export async function fetchUsers() {
    await connectDB();
    const data = await User.find().select('-password');
    return data;
}

export async function getUserById(id:string){
    await connectDB();
    const data = await User.findById(id).select('-password');
    return data;
}

