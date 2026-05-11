"use client";

import { useEffect } from "react";
import socket from "@/lib/socketClient";

export default function SocketManager({ name }: { name: string }) {
  useEffect(() => {
    if (!name) return;

    socket.on("connect", () => {
      console.log("Connected to socket server");
      socket.emit("set user", name);
    });

    return () => {
      socket.disconnect();
    };
  }, [name]);

  return null;
}
