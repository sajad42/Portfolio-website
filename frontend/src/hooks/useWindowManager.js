import { useState, useMemo, createElement } from 'react';

export const useWindowManager = (windowConfig) => {
  // Initialize windows state based on config
  const initialWindows = useMemo(() => {
    return Object.keys(windowConfig).reduce((acc, key, index) => {
      const config = windowConfig[key];
      acc[key] = {
        isOpen: config.initiallyOpen || false,
        zIndex: config.initiallyOpen ? index + 1 : 0
      };
      return acc;
    }, {});
  }, [windowConfig]);

  const [windows, setWindows] = useState(initialWindows);
  const [highestZ, setHighestZ] = useState(
    Math.max(...Object.values(initialWindows).map(w => w.zIndex)) + 1
  );

  const openWindow = (id) => {
    if (!windowConfig[id]) return;
    
    setWindows(prev => ({
      ...prev,
      [id]: { isOpen: true, zIndex: highestZ }
    }));
    setHighestZ(prev => prev + 1);
  };

  const closeWindow = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
  };

  const focusWindow = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: highestZ }
    }));
    setHighestZ(prev => prev + 1);
  };

  const getMaxZIndex = () => {
    const openWindows = Object.values(windows).filter(w => w.isOpen);
    return openWindows.length === 0 ? 0 : Math.max(...openWindows.map(w => w.zIndex));
  };

  const taskbarItems = useMemo(() => {
    return Object.entries(windows)
      .filter(([_, state]) => state.isOpen)
      .map(([id, state]) => ({
        id,
        title: windowConfig[id]?.title || id.charAt(0).toUpperCase() + id.slice(1),
        icon: createElement('img', { src: windowConfig[id]?.icon, alt: '', className: 'w-4 h-4' }),
        isActive: state.zIndex === getMaxZIndex(),
        onClick: () => focusWindow(id)
      }));
  }, [windows, windowConfig, getMaxZIndex]);

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    getMaxZIndex,
    taskbarItems
  };
};