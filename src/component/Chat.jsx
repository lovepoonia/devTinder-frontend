import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';

const Chat = () => {
    const { targetUserId } = useParams();
    const [newMessage , setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(store => store.user);
    const userId = user?._id;


    useEffect(() => {
        if(!userId) {
            return;
        }
        const socket = createSocketConnection();
        socket.emit("joinChat", {firstName :user?.firstName, userId, targetUserId})

        socket.on("messageReceived", ({firstName, lastName, text}) => {
            setMessages(messages => [...messages, {firstName, lastName, text}])
        })

        return () =>{
            socket.disconnect();
        }
    },[userId, targetUserId]);

    const sendMessage = () =>{
        const socket = createSocketConnection();
        socket.emit("sendMessage" ,{firstName : user?.firstName , lastName : user?.lastName , userId , targetUserId , text: newMessage})
        setNewMessage("")
    }

  return (
   <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
        <h1 className="p-5 border-b border-gray-600">Chat</h1>
        <div className="flex-1 overflow-scroll p-5">
            {messages.map((msg, index)=>{
                return(
                    <div className="chat chat-start" key={index}>
                        <div className="chat-header">
                            {msg.firstName+ " "+ msg.lastName}
                            <time className="text-xs opacity-50">2 hours ago</time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                    </div>
                )
            })}
        </div>
        <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => {setNewMessage(e.target.value)}}
          className="flex-1 border border-gray-500  rounded p-2"
        ></input>
            <button className="btn btn-outline btn-accent" onClick={sendMessage}>✔send</button>
        </div>
   </div>
  )
}

export default Chat