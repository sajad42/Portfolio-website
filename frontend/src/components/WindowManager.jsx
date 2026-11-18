import React from 'react';
import { Window } from './Window';

export const WindowManager = ({ windows, windowConfig, onClose, onFocus, onMinimize, onMaximize }) => {
  // Compute the highest zIndex among visible (open + not minimized) windows for active title bar
  const openWins = Object.values(windows).filter(w => w.isOpen && !w.isMinimized);
  const maxZ = openWins.length === 0 ? 0 : Math.max(...openWins.map(w => w.zIndex));

  return (
    <>
      {Object.entries(windowConfig).map(([id, config]) => (
        <Window
          key={id}
          title={config.title}
          icon={config.icon}
          defaultPosition={config.defaultPosition}
          defaultSize={config.defaultSize}
          isOpen={windows[id]?.isOpen ?? false}
          isMinimized={windows[id]?.isMinimized ?? false}
          isMaximized={windows[id]?.isMaximized ?? false}
          isActive={!windows[id]?.isMinimized && windows[id]?.zIndex === maxZ}
          onClose={() => onClose(id)}
          onFocus={() => onFocus(id)}
          onMinimize={() => onMinimize(id)}
          onMaximize={() => onMaximize(id)}
          zIndex={windows[id]?.zIndex ?? 1}
        >
          {config.content}
        </Window>
      ))}
    </>
  );
};
