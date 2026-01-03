import React from 'react';
import { WindowManager } from '../components/WindowManager';
import { Desktop } from '../components/Desktop';
import { Taskbar } from '../components/Taskbar';
import { useWindowManager } from '../hooks/useWindowManager';
import { WINDOW_CONFIG, DESKTOP_ICONS } from '../config/windowConfig';

const Home = () => {
  const {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    getMaxZIndex,
    taskbarItems
  } = useWindowManager(WINDOW_CONFIG);

  const handleIconClick = (id) => {
    const icon = DESKTOP_ICONS.find(icon => icon.id === id);
    if (icon?.type === 'external') {
      window.open(icon.url, '_blank');
    } else {
      openWindow(id);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[hsl(180,100%,25%)] relative select-none">
      <Desktop icons={DESKTOP_ICONS} onIconClick={handleIconClick} />
      
      <WindowManager 
        windows={windows}
        windowConfig={WINDOW_CONFIG}
        onClose={closeWindow}
        onFocus={focusWindow}
      />
      
      <Taskbar 
        items={taskbarItems}
        onStartClick={() => console.log('Start menu clicked')}
      />
    </div>
  );
};

export default Home;