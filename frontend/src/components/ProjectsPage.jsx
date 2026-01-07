import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';

export const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState(0);


//   const projects = [
//           {
//             name: 'StudyConnect Platform',
//             tech: 'Spring Boot, AWS, Java',
//             description: 'Full-stack platform for students',
//             status: 'Active Development',
//             sourceUrl: 'https://github.com/sajad42/studyconnect',
//             demoUrl: 'https://d3hl37aapqqsoq.cloudfront.net/'
//           },
//           {
//             name: 'Portfolio Website',
//             tech: 'React, Tailwind CSS',
//             description: 'Windows 98-inspired portfolio',
//             status: 'Completed',
//             sourceUrl: 'https://github.com/sajad42/Portfolio-website',
//             demoUrl: 'https://main.d3a6cq397zfehj.amplifyapp.com/'
//           },
//           {
//             name: 'Data Analysis Suite',
//             tech: 'Python, Pandas, Scikit-learn',
//             description: 'Machine learning projects',
//             status: 'In Progress',
//             sourceUrl: '#',
//             demoUrl: '#'
//           },
//           {
//             name: 'Smart Food App',
//             tech: 'React Native, Node.js',
//             description: 'Mobile app for food tracking',
//             status: 'In Progress',
//             sourceUrl: '#',
//             demoUrl: '#'
//           }
//         ];

  if (loading) {
    console.log("from projectsPage" + projects)
    return <div className="p-4 text-center">Loading projects...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-[#c0c0c0] p-1 text-[11px] font-sans">
        <div className="bg-[#c0c0c0] p-1 text-[11px] font-sans">
            {/* Tabs */}
            <div className="flex mb-1">
              <div 
                className="px-2 py-1 bg-[#c0c0c0] z-10 -mb-[2px]"
                style={{
                  border: '2px solid',
                  borderColor: 'white #808080 #c0c0c0 white'
                }}
              >
                General
              </div>
              <div 
                className="px-2 py-1 bg-[#c0c0c0] z-10 -mb-[2px]"
                style={{
                  border: '2px solid',
                  borderColor: 'white #808080 #c0c0c0 white'
                }}
              >
                Web Apps
              </div>
              <div 
                className="px-2 py-1 bg-[#c0c0c0] z-10 -mb-[2px]"
                style={{
                  border: '2px solid',
                  borderColor: 'white #808080 #c0c0c0 white'
                }}
              >
                Data Science
              </div>
            </div>

            {/* Content */}
            <div 
              className="p-4 bg-[#c0c0c0]"
              style={{
                border: '2px solid',
                borderColor: '#808080 white white #808080',
                boxShadow: 'inset 1px 1px 0 #404040'
              }}
            >
              <div className="flex gap-6">
                {/* Left: Project List */}
                <div className="flex-1">
                  <p className="mb-3 text-xs">Select a project to view details:</p>
                  
                  <div 
                    className="bg-[#c0c0c0] h-32 overflow-y-auto mb-4"
                    style={{
                      border: '2px solid',
                      borderColor: '#808080 white white #808080',
                      boxShadow: 'inset 1px 1px 0 #404040'
                    }}
                  >
                    {projects.map((project, index) => (
                      <div 
                        key={index}
                        className={`px-2 py-1 text-xs cursor-pointer ${
                          selectedProject === index 
                            ? 'bg-[#000080] text-white' 
                            : 'hover:bg-[#000080] hover:text-white'
                        }`}
                        onClick={() => setSelectedProject(index)}
                      >
                        📁 {project.repo_name}
                      </div>
                    ))}
                  </div>

                  {/* Project Details */}
                  <div 
                    className="p-3 bg-[#dfdfdf] text-xs"
                    style={{
                      border: '2px solid',
                      borderColor: '#808080 white white #808080',
                      boxShadow: 'inset 1px 1px 0 #404040'
                    }}
                  >
                    <div><strong>Project:</strong> {projects[selectedProject].repo_name}</div>
                    <div><strong>Tech Stack:</strong> {projects[selectedProject].languages.map(lang => lang).join(', ')}</div>
                    <div><strong>Description:</strong> {projects[selectedProject].ai_description}</div>
                    <div><strong>Status:</strong> {projects[selectedProject].status}</div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button 
                    className="px-3 py-1 text-xs"
                    style={{
                      background: 'linear-gradient(90deg, #c1c1c1 0%, #cccacaff 100%)',
                      border: '2px solid',
                      borderColor: 'white #808080 #808080 white'
                    }}
                    onClick={() => window.open(projects[selectedProject].sourceUrl, '_blank')}
                  >
                    View Source
                  </button>
                  <button 
                    className="px-3 py-1 text-xs"
                    style={{
                      background: 'linear-gradient(90deg, #c1c1c1 0%, #cccacaff 100%)',
                      border: '2px solid',
                      borderColor: 'white #808080 #808080 white'
                    }}
                    onClick={() => window.open(projects[selectedProject].demoUrl, '_blank')}
                  >
                    Live Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};
