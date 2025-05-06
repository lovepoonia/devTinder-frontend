import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
   if(location.hostname === "localhost"){
    return io(BASE_URL);
   } else {
    return io("/" , {path:"https://devtinder-backend-zes8.onrender.com/socket.io"})
   }
}