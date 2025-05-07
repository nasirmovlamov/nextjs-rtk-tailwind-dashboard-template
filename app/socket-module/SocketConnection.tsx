'use client';

import { useEffect, useState } from 'react';

import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const socket = io('http://localhost:4000'); // Connect to your WebSocket server

interface NotificationData {
  message: string;
  timestamp: string;
}

export const SocketConnection = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    socket.on('newNotification', (data) => {
      console.log('Received notification:', data);
      setNotifications((prevNotifications) => [...prevNotifications, data]);
      toast.success(data.message, { position: 'top-right' });
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('newNotification');
    };
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div>
      <h1 className='text-white' >Real-time Notifications</h1>
      {notifications.map((notification, index) => (
        <div className='text-white' key={index}>
          {notification.message} ({new Date(notification.timestamp).toLocaleTimeString()})
        </div>
      ))}
    </div>
  );
};
