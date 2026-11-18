import React, { useState } from 'react';

export const ShutDownDialog = ({ onClose }) => {
  const [selected, setSelected] = useState('shutdown');
  const [off, setOff] = useState(false);

  const handleOk = () => {
    if (selected === 'shutdown') setOff(true);
    else onClose();
  };

  if (off) {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{ background: '#FF8C00', zIndex: 99999 }}
      >
        <p
          className="text-3xl font-bold mb-3"
          style={{ color: '#000080', fontFamily: 'MS Sans Serif, Tahoma, sans-serif' }}
        >
          Windows 98
        </p>
        <p
          className="text-base mb-6 text-center"
          style={{ color: '#000080', fontFamily: 'MS Sans Serif, Tahoma, sans-serif' }}
        >
          It is now safe to turn off your computer.
        </p>
        <button
          className="px-5 py-1.5 text-sm"
          style={{
            background: '#c0c0c0',
            border: '2px solid',
            borderColor: 'white #404040 #404040 white',
            cursor: 'default',
            fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
          }}
          onClick={onClose}
        >
          Restart (Just kidding 😄)
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.3)', zIndex: 99999 }}
    >
      <div
        style={{
          width: 330,
          background: '#c0c0c0',
          border: '2px solid',
          borderColor: 'white #404040 #404040 white',
          boxShadow: '3px 3px 8px rgba(0,0,0,0.5)',
        }}
      >
        {/* Title Bar */}
        <div
          className="flex items-center gap-1 px-2 py-1 m-1"
          style={{ background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)' }}
        >
          <span className="text-white font-bold text-xs">Shut Down Windows</span>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex gap-4 mb-4">
            <div className="text-5xl leading-none">💻</div>
            <div>
              <p className="text-xs font-bold mb-3">What do you want the computer to do?</p>
              {[
                { value: 'shutdown', label: 'Shut down' },
                { value: 'restart', label: 'Restart' },
                { value: 'msdos', label: 'Restart in MS-DOS mode' },
              ].map(opt => (
                <label key={opt.value} className="flex items-center gap-2 text-xs mb-1 cursor-default">
                  <input
                    type="radio"
                    name="shutdown-option"
                    value={opt.value}
                    checked={selected === opt.value}
                    onChange={() => setSelected(opt.value)}
                    style={{ cursor: 'default' }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            className="mb-3"
            style={{ borderTop: '1px solid #808080', borderBottom: '1px solid white' }}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            {['OK', 'Cancel', 'Help'].map(btn => (
              <button
                key={btn}
                className="px-4 py-0.5 text-xs"
                style={{
                  minWidth: 60,
                  background: '#c0c0c0',
                  border: '2px solid',
                  borderColor: 'white #404040 #404040 white',
                  cursor: 'default',
                }}
                onClick={btn === 'OK' ? handleOk : onClose}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
