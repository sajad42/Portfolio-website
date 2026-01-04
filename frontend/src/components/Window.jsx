import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

const WindowButton = ({ onClick, children }) => (
  <button 
    className="w-4 h-4 flex items-center justify-center p-0 bg-[linear-gradient(90deg,#c1c1c1_0%,#cccacaff_100%)] cursor-pointer"
    style={{
      border: '2px solid',
      borderColor: 'white #404040 #404040 white',
    }}
    onClick={onClick}
  >
    {children}
  </button>
);

export const Window = ({
  title,
  icon,
  children,
  defaultPosition,
  defaultSize,
  isOpen,
  onClose,
  onFocus,
  zIndex
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (isDragging) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setPosition({
          x: clientX - dragOffset.x,
          y: clientY - dragOffset.y,
        });
      }
    };

    const handleEnd = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragOffset]);

  const handleStart = (e) => {
    e.preventDefault();
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
      setIsDragging(true);
      onFocus();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className="absolute pb-1 bg-[linear-gradient(90deg,#c1c1c1_0%,#cccacaff_100%)]"
      style={{
        left: position.x,
        top: position.y,
        width: defaultSize.width,
        zIndex,
        border: '2px solid',
        borderColor: 'white #404040 #404040 white',
        boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 white',
      }}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-1 py-1 m-1 select-none touch-none"
        style={{ background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)' }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <div className="flex items-center gap-1 text-white font-bold text-xs">
          <img src={icon} alt="" className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <div className="flex gap-0.5">
          <WindowButton><Minus className="w-2 h-2" /></WindowButton>
          <WindowButton><Square className="w-2 h-2" /></WindowButton>
          <WindowButton onClick={onClose}><X className="w-2 h-2" /></WindowButton>
        </div>
      </div>

      {/* Content */}
      <div 
        className="p-2 m-1 mt-0 overflow-auto text-xs"
        style={{ 
          minHeight: defaultSize.height - 60,
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