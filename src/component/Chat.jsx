import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { formatDistanceToNow, isValid, parseISO } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
    const [relativeTime, setRelativeTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const date = typeof timestamp === 'string' ? parseISO(timestamp) : new Date(timestamp);
            if (isValid(date)) {
                setRelativeTime(formatDistanceToNow(date, { addSuffix: true }));
            } else {
                setRelativeTime("Invalid date");
            }
        };

        updateTime(); // Initial run
        const interval = setInterval(updateTime, 60000); // Update every 60s

        return () => clearInterval(interval);
    }, [timestamp]);

    return <span className="text-xs opacity-50">{relativeTime}</span>;
};


const Chat = () => {
    const { targetUserId } = useParams();
    const [newMessage , setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(store => store.user);
    const userId = user?._id;
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(scrollToBottom, [messages]);
    const fetchChatMessage = async () =>{
        try {
            const chat = await axios.get(BASE_URL +"/chat/" + targetUserId, {withCredentials:true});
            const chatMessage = chat?.data?.message.map((msg) => {
                const {senderId, text, createdAt } = msg;
                // const time=new Date(createdAt).toLocaleTimeString();
                
                return {
                    firstName: senderId?.firstName,
                    lastName: senderId?.lastName || " ",
                    text,
                    createdAt 
                }
            });
            setMessages(chatMessage);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchChatMessage();
    }, [])

    useEffect(() => {
        if(!userId) {
            return;
        }
        const socket = createSocketConnection();
        socket.emit("joinChat", {firstName :user?.firstName, userId, targetUserId})

        socket.on("messageReceived", ({firstName, lastName, text, createdAt}) => {
            setMessages(messages => [...messages, {firstName, lastName, text ,createdAt}])
        })

        return () =>{
            socket.disconnect();
        }
    },[userId, targetUserId]);

    const sendMessage = () =>{
        const socket = createSocketConnection();
        socket.emit("sendMessage" ,{firstName : user?.firstName , lastName : user?.lastName , userId , targetUserId , text: newMessage, createdAt:new Date().toISOString() })
        setNewMessage("")
    }

  return (
   <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
        <h1 className="p-5 border-b border-gray-600">Chat</h1>
        <div className="flex-1 overflow-scroll p-5">
            {messages.map((msg, index)=>{
                return(
                    <div className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")} key={index}>
                        <div className="chat-header">
                            {msg.firstName+ " "+ msg.lastName}
                            {/* <time className="text-xs opacity-50">{msg.createdAt}</time> */}
                            <TimeAgo timestamp={msg.createdAt} />
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                    </div>
                )
            })}
            <div ref={messagesEndRef} /> 
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