import React, { useState } from 'react';

const DesktopIcon = ({ icon, label, isSelected, onSingleClick, onDoubleClick }) => (
  <div
    className="flex flex-col items-center gap-0.5 p-1 w-[70px] text-center"
    style={{ cursor: 'default' }}
    onClick={e => { e.stopPropagation(); onSingleClick(); }}
    onDoubleClick={e => { e.stopPropagation(); onDoubleClick(); }}
    onTouchEnd={e => { e.preventDefault(); onDoubleClick(); }}
  >
    {/* Icon image with selection highlight */}
    <div
      className="w-9 h-9 flex items-center justify-center"
      style={{
        outline: isSelected ? '1px dotted white' : 'none',
        outlineOffset: 1,
      }}
    >
      <img
        src={icon}
        alt={label}
        className="w-8 h-8"
        draggable={false}
        style={{
          imageRendering: 'pixelated',
          filter: isSelected
            ? 'brightness(0.4) sepia(1) hue-rotate(190deg) saturate(8)'
            : 'none',
        }}
      />
    </div>

    {/* Label with Win98 selection highlight */}
    <span
      className="text-[11px] leading-tight break-words max-w-[64px] px-0.5"
      style={{
        textShadow: isSelected ? 'none' : '1px 1px 2px rgba(0,0,0,0.9)',
        background: isSelected ? '#000080' : 'transparent',
        color: 'white',
        outline: isSelected ? '1px dotted rgba(255,255,255,0.5)' : 'none',
      }}
    >
      {label}
    </span>
  </div>
);

export const Desktop = ({ icons, onIconClick }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div
      className="absolute left-2 top-2 flex flex-col flex-wrap gap-1 select-none"
      style={{ height: 'calc(100vh - 44px)' }}
      onClick={() => setSelectedId(null)}
    >
      {icons.map(icon => (
        <DesktopIcon
          key={icon.id}
          icon={icon.icon}
          label={icon.label}
          isSelected={selectedId === icon.id}
          onSingleClick={() => setSelectedId(icon.id)}
          onDoubleClick={() => {
            setSelectedId(icon.id);
            onIconClick(icon.id);
          }}
        />
      ))}
    </div>
  );
};
