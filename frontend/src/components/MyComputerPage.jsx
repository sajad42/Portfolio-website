import React, { useState } from 'react';

const Tab = ({ label, isActive, onClick }) => (
  <div
    className="px-3 py-0.5 text-xs cursor-default select-none"
    style={{
      border: '2px solid',
      borderColor: isActive ? 'white #808080 #c0c0c0 white' : '#c0c0c0 #808080 #808080 #c0c0c0',
      background: isActive ? '#c0c0c0' : '#b0b0b0',
      zIndex: isActive ? 10 : 1,
      position: 'relative',
      marginBottom: isActive ? -2 : 0,
      marginTop: isActive ? 0 : 2,
    }}
    onClick={onClick}
  >
    {label}
  </div>
);

const TreeNode = ({ icon, label, children: childItems, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="text-xs select-none">
      <div
        className="flex items-center gap-1 px-1 py-0.5 cursor-default hover:bg-[#000080] hover:text-white"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-[9px] w-3 text-center">{open ? '▼' : '▶'}</span>
        <span>{icon}</span>
        <span className="font-bold">{label}</span>
      </div>
      {open && (
        <div className="ml-5 border-l border-gray-400 pl-2">
          {childItems.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-1 px-1 py-0.5 cursor-default hover:bg-[#000080] hover:text-white"
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
              <span className="ml-auto text-[10px] text-gray-500">{c.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProgressBar = ({ label, value, color = '#000080' }) => (
  <div className="mb-2">
    <div className="flex justify-between text-[11px] mb-0.5">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div
      style={{
        height: 12,
        border: '2px solid',
        borderColor: '#808080 white white #808080',
        boxShadow: 'inset 1px 1px 0 #404040',
        background: '#dfdfdf',
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color} 0%, #1084d0 100%)`,
        }}
      />
    </div>
  </div>
);

export const MyComputerPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  const TABS = [
    { id: 'general', label: 'General' },
    { id: 'devices', label: 'Device Manager' },
    { id: 'hardware', label: 'Hardware Profiles' },
    { id: 'performance', label: 'Performance' },
  ];

  return (
    <div className="bg-[#c0c0c0] text-[11px]">
      {/* Tabs */}
      <div className="flex">
        {TABS.map(tab => (
          <Tab
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {/* Panel */}
      <div
        className="p-4"
        style={{
          border: '2px solid',
          borderColor: '#808080 white white #808080',
          boxShadow: 'inset 1px 1px 0 #404040',
          minHeight: 200,
        }}
      >
        {/* --- GENERAL --- */}
        {activeTab === 'general' && (
          <div className="flex gap-5 items-start">
            <img src="/images/icons/pc.png" alt="Computer" className="w-14 h-14" style={{ imageRendering: 'pixelated' }} />
            <div className="text-xs space-y-2">
              <div>
                <strong>System:</strong> Human_Interface_v2.0
              </div>
              <div className="ml-3 space-y-0.5">
                <div><strong>User:</strong> Sajad Ali Zada</div>
                <div><strong>Location:</strong> Montreal, QC 🍁</div>
                <div><strong>University:</strong> Concordia University</div>
                <div><strong>Major:</strong> Computer Science</div>
              </div>
              <div>
                <strong>OS:</strong>{' '}
                <span className="font-mono text-[10px]">Human_Interface_v2.0 (Build 1998)</span>
              </div>
              <div><strong>Uptime:</strong> 23 Years, 0 crashes (yet)</div>
            </div>
          </div>
        )}

        {/* --- DEVICE MANAGER --- */}
        {activeTab === 'devices' && (
          <div className="space-y-1">
            <p className="font-bold mb-2 text-[11px]">💻 Sajad's Hardware Devices</p>
            <TreeNode
              icon="⚛️"
              label="Frontend Stack"
              defaultOpen={true}
              children={[
                { icon: '⚛️', label: 'React 19', status: '✅ Loaded' },
                { icon: '🎨', label: 'Tailwind CSS 4', status: '✅ Loaded' },
                { icon: '⚡', label: 'Vite 7', status: '✅ Running' },
                { icon: '🧩', label: 'lucide-react', status: '✅ Active' },
              ]}
            />
            <TreeNode
              icon="🐍"
              label="Backend Stack"
              children={[
                { icon: '🐍', label: 'FastAPI', status: '✅ Loaded' },
                { icon: '🗄️', label: 'PostgreSQL (Neon)', status: '✅ Connected' },
                { icon: '🤖', label: 'OpenAI GPT-4o-mini', status: '✅ Active' },
                { icon: '🔗', label: 'SQLAlchemy 2', status: '✅ Ready' },
              ]}
            />
            <TreeNode
              icon="☁️"
              label="Cloud & DevOps"
              children={[
                { icon: '☁️', label: 'Google Cloud Run', status: '✅ Deployed' },
                { icon: '🐳', label: 'Docker', status: '✅ Running' },
                { icon: '🔄', label: 'GitHub Actions CI/CD', status: '✅ Active' },
                { icon: '📦', label: 'Google Artifact Registry', status: '✅ Ready' },
              ]}
            />
            <TreeNode
              icon="🧠"
              label="Soft Skills (Beta)"
              children={[
                { icon: '☕', label: 'Coffee Integration', status: '⚠️ Low' },
                { icon: '😴', label: 'Sleep Module', status: '⚠️ Needs update' },
                { icon: '🎯', label: 'Focus Driver', status: '✅ Loaded' },
              ]}
            />
          </div>
        )}

        {/* --- HARDWARE PROFILES --- */}
        {activeTab === 'hardware' && (
          <div className="text-xs space-y-3">
            <p className="font-bold mb-2">🧬 Biological Hardware Specifications</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { label: 'Processor', value: 'Human Cortex @ 23y, overclocked' },
                { label: 'Coffee Intake', value: '☕ 2–3 cups/day (minimum)' },
                { label: 'RAM', value: 'Variable (post-coffee: 16GB equiv.)' },
                { label: 'Sleep Mode', value: '~7 hrs (highly variable)' },
                { label: 'Debug Style', value: 'console.log() first, ask later' },
                { label: 'Stack Overflow', value: 'Yes, certified daily user' },
                { label: 'Languages', value: 'Dari, English, Python, JS, Java' },
                { label: 'Keyboard WPM', value: '~90 WPM (rising)' },
                { label: 'Bug Fix Rate', value: '1 bug fixed, 2 introduced' },
                { label: 'IDE', value: 'Antigravity + VS Code + Tabs > Spaces' },
              ].map(item => (
                <div key={item.label}>
                  <div className="font-bold text-[10px] text-gray-600">{item.label}:</div>
                  <div className="text-[11px]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PERFORMANCE --- */}
        {activeTab === 'performance' && (
          <div className="text-xs">
            <p className="font-bold mb-3">📊 System Performance Metrics</p>
            <ProgressBar label="🔥 Motivation Level" value={95} />
            <ProgressBar label="☕ Caffeine Level" value={72} color="#6B3A2A" />
            <ProgressBar label="🎯 Focus Mode" value={80} />
            <ProgressBar label="🐛 Bug Tolerance" value={55} color="#8B0000" />
            <ProgressBar label="📚 Learning Rate" value={99} color="#006400" />
            <ProgressBar label="🚀 Ship It Eagerness" value={91} />
            <div
              className="mt-3 p-2 text-[10px]"
              style={{
                border: '2px solid',
                borderColor: '#808080 white white #808080',
                background: '#dfdfdf',
              }}
            >
              ⚠️ Warning: Caffeine reserves below optimal threshold. Performance may degrade.<br />
              💡 Tip: Adding more side projects is known to increase motivation by 12%.
            </div>
          </div>
        )}
      </div>

      {/* OK Button */}
      <div className="flex justify-end gap-2 mt-3">
        <button
          className="px-5 py-0.5 text-xs"
          style={{
            background: '#c0c0c0',
            border: '2px solid',
            borderColor: 'white #808080 #808080 white',
            cursor: 'default',
          }}
        >
          OK
        </button>
        <button
          className="px-5 py-0.5 text-xs"
          style={{
            background: '#c0c0c0',
            border: '2px solid',
            borderColor: 'white #808080 #808080 white',
            cursor: 'default',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
