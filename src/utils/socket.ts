import { io as ClientIO, type Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

export const socket: Socket = ClientIO(SOCKET_URL, {
  withCredentials: true,
});
