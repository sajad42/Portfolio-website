import { useState, useMemo, createElement } from 'react';

export const useWindowManager = (windowConfig) => {
  const initialWindows = useMemo(() => {
    return Object.keys(windowConfig).reduce((acc, key, index) => {
      const config = windowConfig[key];
      acc[key] = {
        isOpen: config.initiallyOpen || false,
        isMinimized: false,
        isMaximized: false,
        zIndex: config.initiallyOpen ? index + 1 : 0
      };
      return acc;
    }, {});
  }, [windowConfig]);

  const [windows, setWindows] = useState(initialWindows);
  const [highestZ, setHighestZ] = useState(
    Math.max(...Object.values(initialWindows).map(w => w.zIndex), 0) + 1
  );

  const openWindow = (id) => {
    if (!windowConfig[id]) return;
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: highestZ }
    }));
    setHighestZ(prev => prev + 1);
  };

  const closeWindow = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false, isMaximized: false }
    }));
  };

  const focusWindow = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: highestZ }
    }));
    setHighestZ(prev => prev + 1);
  };

  const minimizeWindow = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
  };

  const maximizeWindow = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized, zIndex: highestZ }
    }));
    setHighestZ(prev => prev + 1);
  };

  // Taskbar click: if minimized -> restore & focus; if active top window -> minimize; else -> focus
  const toggleMinimize = (id) => {
    setWindows(prev => {
      const win = prev[id];
      if (!win) return prev;
      const openWins = Object.values(prev).filter(w => w.isOpen && !w.isMinimized);
      const maxZ = openWins.length === 0 ? 0 : Math.max(...openWins.map(w => w.zIndex));
      if (win.isMinimized) {
        setHighestZ(z => z + 1);
        return { ...prev, [id]: { ...win, isMinimized: false, zIndex: maxZ + 1 } };
      } else if (win.zIndex === maxZ && openWins.length > 0) {
        return { ...prev, [id]: { ...win, isMinimized: true } };
      } else {
        setHighestZ(z => z + 1);
        return { ...prev, [id]: { ...win, zIndex: maxZ + 1 } };
      }
    });
  };

  const taskbarItems = useMemo(() => {
    const openWins = Object.values(windows).filter(w => w.isOpen && !w.isMinimized);
    const maxZ = openWins.length === 0 ? 0 : Math.max(...openWins.map(w => w.zIndex));
    return Object.entries(windows)
      .filter(([_, state]) => state.isOpen)
      .map(([id, state]) => ({
        id,
        title: windowConfig[id]?.title || id.charAt(0).toUpperCase() + id.slice(1),
        icon: createElement('img', { src: windowConfig[id]?.icon, alt: '', className: 'w-4 h-4' }),
        isActive: !state.isMinimized && state.zIndex === maxZ,
        isMinimized: state.isMinimized,
        onClick: () => toggleMinimize(id)
      }));
  }, [windows, windowConfig]);

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    toggleMinimize,
    taskbarItems
  };
};
