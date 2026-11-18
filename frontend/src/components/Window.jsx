import React, { useState, useRef, useEffect } from 'react';
import { X, Minus } from 'lucide-react';

const WindowButton = ({ onClick, title, children }) => (
  <button
    title={title}
    className="w-4 h-4 flex items-center justify-center p-0 shrink-0"
    style={{
      background: '#c0c0c0',
      border: '2px solid',
      borderColor: 'white #404040 #404040 white',
      cursor: 'default',
    }}
    onMouseDown={e => e.stopPropagation()}
    onClick={e => { e.stopPropagation(); onClick && onClick(e); }}
  >
    {children}
  </button>
);

// Restore icon: two overlapping squares (Win98 restore button)
const RestoreIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8">
    <rect x="2" y="0" width="5" height="5" stroke="black" strokeWidth="1" fill="none" />
    <rect x="0" y="2" width="5" height="5" stroke="black" strokeWidth="1" fill="#c0c0c0" />
  </svg>
);

// Maximize icon: single square
const MaximizeIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8">
    <rect x="0" y="0" width="7" height="7" stroke="black" strokeWidth="1" fill="none" />
    <rect x="0" y="0" width="7" height="2" fill="black" />
  </svg>
);

export const Window = ({
  title,
  icon,
  children,
  defaultPosition,
  defaultSize,
  isOpen,
  isMinimized,
  isMaximized,
  isActive,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  zIndex,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e) => {
      if (isMaximized) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setPosition({
        x: Math.max(0, clientX - dragOffset.x),
        y: Math.max(0, clientY - dragOffset.y),
      });
    };
    const handleEnd = () => setIsDragging(false);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragOffset, isMaximized]);

  const handleTitleBarMouseDown = (e) => {
    if (isMaximized) return;
    e.preventDefault();
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setDragOffset({ x: clientX - rect.left, y: clientY - rect.top });
      setIsDragging(true);
      onFocus();
    }
  };

  if (!isOpen || isMinimized) return null;

  // Active title bar: blue gradient. Inactive: gray gradient.
  const titleBarBg = isActive
    ? 'linear-gradient(90deg, #000080 0%, #1084d0 100%)'
    : 'linear-gradient(90deg, #7f7f7f 0%, #aaaaaa 100%)';

  const windowStyle = isMaximized
    ? {
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 36,
        width: '100%',
        height: 'calc(100vh - 36px)',
        zIndex,
        border: '2px solid',
        borderColor: 'white #404040 #404040 white',
        boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 white',
        background: '#c0c0c0',
      }
    : {
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: defaultSize.width,
        zIndex,
        border: '2px solid',
        borderColor: 'white #404040 #404040 white',
        boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 white',
        background: '#c0c0c0',
      };

  return (
    <div
      ref={windowRef}
      style={windowStyle}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-1 py-1 m-1 select-none touch-none"
        style={{ background: titleBarBg }}
        onMouseDown={handleTitleBarMouseDown}
        onTouchStart={handleTitleBarMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-1 text-white font-bold text-xs overflow-hidden">
          <img src={icon} alt="" className="w-4 h-4 shrink-0" />
          <span className="truncate">{title}</span>
        </div>
        <div className="flex gap-0.5 ml-1">
          <WindowButton onClick={onMinimize} title="Minimize">
            <Minus className="w-2 h-2" />
          </WindowButton>
          <WindowButton onClick={onMaximize} title={isMaximized ? 'Restore' : 'Maximize'}>
            {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
          </WindowButton>
          <WindowButton onClick={onClose} title="Close">
            <X className="w-2 h-2" />
          </WindowButton>
        </div>
      </div>

      {/* Content Area */}
      <div
        className="p-2 m-1 mt-0 overflow-auto text-xs"
        style={{
          height: isMaximized
            ? 'calc(100vh - 36px - 48px)'
            : defaultSize.height - 48,
          border: '2px solid',
          borderColor: '#808080 white white #808080',
          boxShadow: 'inset 1px 1px 0 #404040',
        }}
      >
        {children}
      </div>
    </div>
  );
};
