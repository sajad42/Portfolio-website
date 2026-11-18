import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';

const WEB_LANGS = ['javascript', 'typescript', 'html', 'css', 'php', 'ruby', 'vue', 'svelte'];
const DATA_LANGS = ['python', 'jupyter notebook', 'r', 'scala', 'matlab'];

const Tab = ({ label, isActive, onClick }) => (
  <div
    className="px-2 py-0.5 text-xs cursor-default select-none"
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

export const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('general');

  const filteredProjects = projects.filter(p => {
    if (activeTab === 'general') return true;
    const langs = (p.languages || []).map(l => l.toLowerCase());
    if (activeTab === 'web')
      return langs.some(l => WEB_LANGS.some(w => l.includes(w)));
    if (activeTab === 'data')
      return langs.some(l => DATA_LANGS.some(d => l.includes(d)));
    return true;
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedIndex(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-xs">
        ⏳ Loading projects from GitHub...
      </div>
    );
  }

  const current = filteredProjects[selectedIndex];

  return (
    <div className="bg-[#c0c0c0] text-[11px]">
      {/* Tabs */}
      <div className="flex">
        {[
          { id: 'general', label: 'All Projects' },
          { id: 'web', label: 'Web Apps' },
          { id: 'data', label: 'Data Science' },
        ].map(tab => (
          <Tab
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
          />
        ))}
      </div>

      {/* Panel */}
      <div
        className="p-3"
        style={{
          border: '2px solid',
          borderColor: '#808080 white white #808080',
          boxShadow: 'inset 1px 1px 0 #404040',
        }}
      >
        {filteredProjects.length === 0 ? (
          <div className="text-center py-6 text-xs text-gray-600">
            📂 No projects found in this category.
          </div>
        ) : (
          <div className="flex gap-4">
            {/* Left: list + detail */}
            <div className="flex-1 min-w-0">
              <p className="mb-1.5 text-xs">Select a project:</p>

              {/* Project list box */}
              <div
                className="mb-2 overflow-y-auto"
                style={{
                  height: 110,
                  background: 'white',
                  border: '2px solid',
                  borderColor: '#808080 white white #808080',
                  boxShadow: 'inset 1px 1px 0 #404040',
                }}
              >
                {filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    className="px-2 py-0.5 text-xs cursor-default"
                    style={{
                      background: selectedIndex === index ? '#000080' : 'transparent',
                      color: selectedIndex === index ? 'white' : 'black',
                    }}
                    onClick={() => setSelectedIndex(index)}
                  >
                    📁 {project.repo_name}
                  </div>
                ))}
              </div>

              {/* Detail box */}
              {current && (
                <div
                  className="p-2 text-xs space-y-1"
                  style={{
                    background: '#dfdfdf',
                    border: '2px solid',
                    borderColor: '#808080 white white #808080',
                    boxShadow: 'inset 1px 1px 0 #404040',
                  }}
                >
                  <div><strong>Repo:</strong> {current.repo_name}</div>
                  <div>
                    <strong>Stack:</strong>{' '}
                    {(current.languages || []).length > 0
                      ? current.languages.join(', ')
                      : 'N/A'}
                  </div>
                  <div>
                    <strong>Status:</strong>{' '}
                    <span
                      style={{
                        color:
                          current.project_status === 'Done'
                            ? '#006400'
                            : current.project_status === 'Under Debugging'
                            ? '#8B0000'
                            : '#000080',
                      }}
                    >
                      {current.project_status || 'Planning'}
                    </span>
                  </div>
                  {current.stars > 0 && (
                    <div><strong>Stars:</strong> ⭐ {current.stars}</div>
                  )}
                  <div className="pt-0.5">
                    <strong>About:</strong>{' '}
                    <span className="text-gray-700">
                      {current.ai_description || 'No description available.'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: buttons */}
            <div className="flex flex-col gap-2 shrink-0">
              <button
                className="px-3 py-1 text-xs text-left"
                style={{
                  minWidth: 85,
                  background: '#c0c0c0',
                  border: '2px solid',
                  borderColor: current?.project_source_url
                    ? 'white #808080 #808080 white'
                    : '#a0a0a0 #808080 #808080 #a0a0a0',
                  cursor: 'default',
                  opacity: current?.project_source_url ? 1 : 0.5,
                }}
                onClick={() => current?.project_source_url && window.open(current.project_source_url, '_blank')}
              >
                📂 Source
              </button>
              <button
                className="px-3 py-1 text-xs text-left"
                style={{
                  minWidth: 85,
                  background: '#c0c0c0',
                  border: '2px solid',
                  borderColor: current?.homepage_url
                    ? 'white #808080 #808080 white'
                    : '#a0a0a0 #808080 #808080 #a0a0a0',
                  cursor: 'default',
                  opacity: current?.homepage_url ? 1 : 0.5,
                }}
                onClick={() => current?.homepage_url && window.open(current.homepage_url, '_blank')}
              >
                🌐 Live Demo
              </button>
              {error && (
                <div
                  className="text-[9px] text-orange-700 mt-auto p-1"
                  style={{
                    border: '1px solid #808080',
                    background: '#fffff0',
                    maxWidth: 85,
                  }}
                >
                  ⚠️ Offline mode
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
