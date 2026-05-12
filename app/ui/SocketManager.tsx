"use client";

import { useEffect } from "react";
import socket from "@/lib/socketClient";

export default function SocketManager({ name }: { name: string }) {
  useEffect(() => {
    if (!name) return;

    const onConnect = () => {
      socket.emit("set user", name);
    };

    socket.on("connect", onConnect);
    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
    };
  }, [name]);

  return null;
}
