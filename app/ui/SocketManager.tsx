"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

export default function SocketManager({ name }: { name: string }) {
  useEffect(() => {
    if (!name) return;

    // Initialize socket connection
    const socket = io();

    socket.on("connect", () => {
      console.log("Connected to socket server");
      // Identify the user to the server
      socket.emit("set user", name);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [name]);

  return null; // This component doesn't render anything
}
