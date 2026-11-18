import React, { useEffect, useRef } from 'react';

const MENU_ITEMS = [
  { icon: '📁', label: 'Programs', arrow: true },
  { icon: '📄', label: 'Documents', arrow: true },
  { icon: '⚙️', label: 'Settings', arrow: true },
  { icon: '🔍', label: 'Find', arrow: true },
  { icon: '❓', label: 'Help' },
  { icon: '▶️', label: 'Run...' },
  { divider: true },
  { icon: '🔌', label: 'Shut Down...' },
];

export const StartMenu = ({ onClose, onShutDown }) => {
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    // Slight delay so the Start button click doesn't immediately close
    const timer = setTimeout(() => document.addEventListener('mousedown', handler), 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handler);
    };
  }, [onClose]);

  const handleItem = (item) => {
    if (item.label === 'Shut Down...') {
      onShutDown();
    }
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute bottom-9 left-0"
      style={{
        zIndex: 10000,
        width: 210,
        border: '2px solid',
        borderColor: 'white #404040 #404040 white',
        boxShadow: '2px 2px 6px rgba(0,0,0,0.5)',
        background: '#c0c0c0',
      }}
    >
      <div className="flex">
        {/* Classic Win98 vertical blue banner */}
        <div
          style={{
            width: 26,
            background: 'linear-gradient(to top, #000080 0%, #1084d0 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 8,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              writingMode: 'vertical-lr',
              transform: 'rotate(180deg)',
              color: 'white',
              fontSize: 11,
              letterSpacing: 2,
              userSelect: 'none',
            }}
          >
            <span style={{ color: '#c0c0c0', fontWeight: 'normal' }}>Windows </span>
            <span style={{ fontWeight: 'bold' }}>98</span>
          </span>
        </div>

        {/* Menu items */}
        <div className="flex-1 py-1">
          {MENU_ITEMS.map((item, i) => {
            if (item.divider) {
              return (
                <div
                  key={i}
                  className="my-1 mx-1"
                  style={{
                    borderTop: '1px solid #808080',
                    borderBottom: '1px solid white',
                  }}
                />
              );
            }
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-2 py-1.5 cursor-default hover:bg-[#000080] hover:text-white"
                onClick={() => handleItem(item)}
              >
                <span className="text-base w-5 text-center leading-none">{item.icon}</span>
                <span className="flex-1 text-xs font-bold">{item.label}</span>
                {item.arrow && <span className="text-xs">▶</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
