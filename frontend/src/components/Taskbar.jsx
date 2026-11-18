import React, { useState, useEffect } from 'react';
import { StartMenu } from './StartMenu';
import { ShutDownDialog } from './ShutDownDialog';

const TaskbarButton = ({ item }) => (
  <button
    className="flex items-center gap-1 px-2 py-1 text-xs min-w-[80px] max-w-[150px]"
    style={{
      background: '#c0c0c0',
      border: '2px solid',
      borderColor: item.isActive ? '#404040 white white #404040' : 'white #404040 #404040 white',
      boxShadow: item.isActive ? 'inset 1px 1px 0 #808080' : 'none',
      cursor: 'default',
      flexShrink: 0,
    }}
    onClick={item.onClick}
  >
    <span className="w-4 h-4 flex items-center justify-center shrink-0">{item.icon}</span>
    <span className="truncate" style={{ opacity: item.isMinimized ? 0.6 : 1 }}>
      {item.title}
    </span>
  </button>
);

export const Taskbar = ({ items }) => {
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showShutDown, setShowShutDown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <>
      {/* Start Menu (above taskbar) */}
      {showStartMenu && (
        <StartMenu
          onClose={() => setShowStartMenu(false)}
          onShutDown={() => setShowShutDown(true)}
        />
      )}

      {/* Shut Down Dialog */}
      {showShutDown && (
        <ShutDownDialog onClose={() => setShowShutDown(false)} />
      )}

      {/* Taskbar */}
      <div
        className="fixed bottom-0 left-0 right-0 h-9 flex items-center px-1 gap-1"
        style={{
          zIndex: 9999,
          background: '#c0c0c0',
          borderTop: '2px solid white',
          boxShadow: 'inset 0 1px 0 white',
        }}
      >
        {/* Start Button */}
        <button
          className="flex items-center gap-1 px-2 py-0.5 font-bold text-xs shrink-0"
          style={{
            background: '#c0c0c0',
            border: '2px solid',
            borderColor: showStartMenu
              ? '#404040 white white #404040'
              : 'white #404040 #404040 white',
            boxShadow: showStartMenu ? 'inset 1px 1px 0 #808080' : 'none',
            cursor: 'default',
          }}
          onClick={() => setShowStartMenu(prev => !prev)}
        >
          <img src="/images/icons/windows.png" alt="Start" className="w-4 h-4" />
          <span>Start</span>
        </button>

        {/* Divider */}
        <div
          className="h-6 shrink-0"
          style={{ width: 2, borderLeft: '1px solid #808080', borderRight: '1px solid white' }}
        />

        {/* Open Windows */}
        <div className="flex-1 flex gap-1 overflow-x-auto overflow-y-hidden">
          {items.map(item => (
            <TaskbarButton key={item.id} item={item} />
          ))}
        </div>

        {/* System Tray */}
        <div
          className="flex items-center gap-1.5 px-2 py-0.5 text-xs shrink-0"
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
    </>
  );
};
