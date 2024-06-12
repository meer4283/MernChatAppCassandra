"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '@/context/SocketProvider';
import { useHttp } from '@/hooks/useHttp';

const ChatPage = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<any>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll whenever messages change

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [])
  
  useEffect(() => {
    // Listen for new messages
    if (socket) {
      socket.on('newMessage', (message:any) => {
        console.log("newMessage");
      setMessages((prevMessages:any) => [...prevMessages, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off('newMessage');
      }
    };
  }, [socket]);

  const fetchMessages = async () => {
    const db = new useHttp();
    db.get("/messages").then((res:any)=>{
        setMessages(res?.data)
    })
  };

  const handleSendMessage = async (e:React.SyntheticEvent) => {
    e.preventDefault()
    socket.emit('sendMessage', { content: newMessage });
    setNewMessage("")
  };
  return (
    <div className="flex flex-col h-screen">
      <div ref={chatContainerRef} className="overflow-auto flex-grow">
        {messages.map((message:any) => (
          <div key={message.id} className="m-2">
            <span className="font-bold">{message.username}:</span> {message.content}
          </div>
        ))}
      </div>
        <form  className="flex items-center p-2" action="POST" onSubmit={(e)=>{handleSendMessage(e)}}>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded mr-2 flex-grow"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type='submit'
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
        </form>
    </div>
  );
};

export default ChatPage;
