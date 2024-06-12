"use client"
import { getCookieData } from '@/utils';
import React, { createContext, useContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const SocketContext = createContext(undefined);

export const useSocket = () => useContext<any | undefined>(SocketContext);

export const SocketProvider = ({ children }:any) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket:any = socketIOClient('http://localhost:5000'
      ,{
      extraHeaders: {
        'Authorization': getCookieData({ localKey: "accessToken" }),
      },
      transportOptions: {
        polling: {
          extraHeaders: {
            'Authorization': getCookieData({ localKey: "accessToken" }),
          },
        },
      },
    }
  
  ); // Change URL as per your server

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
