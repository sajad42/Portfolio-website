import React from 'react';

const DesktopIcon = ({ icon, label, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div 
      className="flex flex-col items-center justify-center gap-1 p-1 cursor-pointer select-none w-[70px] text-center hover:bg-accent/30 active:bg-accent/50"
      onDoubleClick={handleClick}
      onTouchEnd={handleClick}
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <img src={icon} alt={label} className="w-8 h-8" />
      </div>
      <span className="text-white text-xs leading-tight max-w-[60px] break-words" 
            style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>
        {label}
      </span>
    </div>
  );
};

export const Desktop = ({ icons, onIconClick }) => (
  <div className="absolute left-2 top-2 flex flex-col gap-2 flex-wrap h-[calc(100vh-40px)]">
    {icons.map((icon) => (
      <DesktopIcon
        key={icon.id}
        icon={icon.icon}
        label={icon.label}
        onClick={() => onIconClick(icon.id)}
      />
    ))}
  </div>
);