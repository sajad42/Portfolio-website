import React from 'react';
import { Window } from './Window';

export const WindowManager = ({ windows, windowConfig, onClose, onFocus }) => (
  <>
    {Object.entries(windowConfig).map(([id, config]) => (
      <Window
        key={id}
        title={config.title}
        icon={config.icon}
        defaultPosition={config.defaultPosition}
        defaultSize={config.defaultSize}
        isOpen={windows[id]?.isOpen ?? false}
        onClose={() => onClose(id)}
        onFocus={() => onFocus(id)}
        zIndex={windows[id]?.zIndex ?? 1}
      >
        {config.content}
      </Window>
    ))}
  </>
);