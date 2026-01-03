import React, { useState, useEffect } from 'react';

const TaskbarButton = ({ item }) => (
  <button
    className="flex items-center gap-1 px-2 py-1.5 text-xs min-w-[100px] max-w-[150px] bg-secondary"
    style={{
      border: '2px solid',
      borderColor: item.isActive ? '#404040 white white #404040' : 'white #404040 #404040 white',
    }}
    onClick={item.onClick}
  >
    <span className="w-4 h-4 flex items-center justify-center shrink-0">
      {item.icon}
    </span>
    <span className="truncate">{item.title}</span>
  </button>
);

export const Taskbar = ({ items, onStartClick }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-9 bg-[linear-gradient(90deg,#c1c1c1_0%,#cccacaff_100%)] flex items-center px-1"
      style={{
        zIndex: 9999,
        boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 white',
      }}
    >
      {/* Start Button */}
      <button 
        className="flex items-center gap-1 px-2 py-0.5 font-bold text-xs bg-secondary"
        onClick={onStartClick}
      >
        <img src="/images/icons/windows.png" alt="Start" className="w-4 h-4" />
        <span>Start</span>
      </button>

      {/* Divider */}
      <div className="w-px h-5 bg-gray-400 mx-1" />

      {/* Open Windows */}
      <div className="flex-1 flex gap-1 overflow-hidden">
        {items.map((item) => (
          <TaskbarButton key={item.id} item={item} />
        ))}
      </div>

      {/* System Tray */}
      <div 
        className="flex items-center gap-2 px-2 py-0.5 text-xs"
        style={{
          border: '2px solid',
          borderColor: '#808080 white white #808080',
          boxShadow: 'inset 1px 1px 0 #404040',
        }}
      >
        <img src="/images/icons/network.png" alt="Network" className="h-4 w-4" />
        <span>{formatTime(time)}</span>
      </div>
    </div>
  );
};