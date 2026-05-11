import { io } from "socket.io-client";

// This is created once and reused everywhere
const socket = io();

export default socket;
