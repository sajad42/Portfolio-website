import React from 'react';

export const WINDOW_CONFIG = {
  about: {
    title: 'Sajad',
    icon: '/images/icons/agent.png',
    defaultPosition: { x: 250, y: 100 },
    defaultSize: { width: 500, height: 280 },
    initiallyOpen: true,
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          I am a Computer Science undergraduate student with a strong interest in software engineering and modern web development. I enjoy building practical, user-focused applications and turning ideas into clean, functional products.

My experience spans frontend and full-stack development. I have worked with React and Tailwind CSS on the frontend, and with Spring Boot and JWT-based authentication on the backend. I am also familiar with deploying and running applications using Docker and AWS.

I am highly motivated to keep learning through hands-on projects, competitive programming, and exploring new technologies. I am particularly interested in scalable systems, real-world problem solving, and building software that is both reliable and enjoyable to use.
        </p>
      </div>
    )
  },
  
  contact: {
    title: 'Contact',
    icon: '/images/icons/contact-me.png',
    defaultPosition: { x: 200, y: 50 },
    defaultSize: { width: 350, height: 200 },
    initiallyOpen: true,
    content: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-bold">Email:</span>
          <a href="mailto:sajad.alizada2014@gmail.com" className="text-primary underline hover:text-primary/80">
            sajad.alizada2014@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">To:</span>
          <span 
            className="bg-input px-2 py-0.5 flex-1"
            style={{
              border: '2px solid',
              borderColor: '#808080 white white #808080',
              boxShadow: 'inset 1px 1px 0 #404040',
            }}
          >
            recipient@email.com
          </span>
        </div>
      </div>
    )
  },

  computer: {
    title: 'My Computer',
    icon: '/images/icons/about-me.png',
    defaultPosition: { x: 300, y: 150 },
    defaultSize: { width: 600, height: 380 },
    content: (
      <div className="bg-[#c0c0c0] p-1 text-[11px] font-sans">
        {/* Tabs */}
        <div className="flex  mb-1">
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
            Device Manager
          </div>
          <div 
            className="px-2 py-1 bg-[#c0c0c0] z-10 -mb-[2px]"
            style={{
              border: '2px solid',
              borderColor: 'white #808080 #c0c0c0 white'
            }}
          >
            Hardware Profiles
          </div>
          <div 
            className="px-2 py-1 bg-[#c0c0c0] z-10 -mb-[2px]"
            style={{
              border: '2px solid',
              borderColor: 'white #808080 #c0c0c0 white'
            }}
          >
            performance
          </div>
        </div>

        {/* Content */}
        <div 
          className="p-4 bg-transparent"
          style={{
            border: '2px solid',
            borderColor: '#808080 white white #808080',
            boxShadow: 'inset 1px 1px 0 #404040'
          }}
        >
          <div className="flex gap-6 items-start">
            {/* Icon */}
            <div 
              className="w-16 h-16 flex items-center justify-center border-none bg-transparent"
            >
              <img 
                className='border-none bg-transparent'
                src="/images/icons/pc.png" 
                alt="" />
            </div>

            {/* Info */}
            <div className="text-black text-xs space-y-4">
              <div><strong>System:</strong></div>
              <div className='ml-8'><strong>User:</strong><br></br>Sajad Ali Zada</div>
              <div><strong>Location:</strong> Montreal, QC</div>
              <div><strong>Education:</strong> Concordia University, Computer Science</div>
              <div><strong>OS:</strong> Human_Interface_v2.0</div>
              <div><strong>Uptime:</strong> 23 Years</div>
            </div>
          </div>

         
        </div>
         {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button 
              className="px-4 py-1 text-black text-xs"
              style={{
                background: 'linear-gradient(90deg, #c1c1c1 0%, #cccacaff 100%)',
                border: '2px solid',
                borderColor: 'white #808080 #808080 white'
              }}
            >
              OK
            </button>
          </div>
      </div>
    )
  },

  cv: {
    title: 'My CV',
    icon: '/images/icons/my-CV.png',
    defaultPosition: { x: 250, y: 50 },
    defaultSize: { width: 500, height: 600 },
    content: (
      <div className="flex justify-center">
        <img src="/images/sajad-resume.png" alt="Sajad's Resume" className="max-w-full h-auto" />
      </div>
    )
  },

  history: {
    title: 'History',
    icon: '/images/icons/help-book.png',
    defaultPosition: { x: 400, y: 250 },
    defaultSize: { width: 450, height: 350 },
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <h3 className="font-bold text-base mb-2">Professional Journey</h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold">Software Engineer at Compound</h4>
            <p className="text-xs text-gray-600">Building scalable financial applications</p>
          </div>
          <div>
            <h4 className="font-semibold">Data Science Studies</h4>
            <p className="text-xs text-gray-600">University of Helsinki - Current</p>
          </div>
          <div>
            <h4 className="font-semibold">Computer Science Degree</h4>
            <p className="text-xs text-gray-600">University of Helsinki - 2021</p>
          </div>
        </div>
      </div>
    )
  },

  projects: {
    title: 'Projects',
    icon: '/images/icons/joy.png',
    defaultPosition: { x: 450, y: 300 },
    defaultSize: { width: 500, height: 400 },
    content: (() => {
      const ProjectsPanel = () => {
        const [selectedProject, setSelectedProject] = React.useState(0);
        
        const projects = [
          {
            name: 'StudyConnect Platform',
            tech: 'Spring Boot, AWS, Java',
            description: 'Full-stack platform for students',
            status: 'Active Development',
            sourceUrl: 'https://github.com/sajad42/studyconnect',
            demoUrl: 'https://d3hl37aapqqsoq.cloudfront.net/'
          },
          {
            name: 'Portfolio Website',
            tech: 'React, Tailwind CSS',
            description: 'Windows 98-inspired portfolio',
            status: 'Completed',
            sourceUrl: 'https://github.com/sajad42/Portfolio-website',
            demoUrl: 'https://main.d3a6cq397zfehj.amplifyapp.com/'
          },
          {
            name: 'Data Analysis Suite',
            tech: 'Python, Pandas, Scikit-learn',
            description: 'Machine learning projects',
            status: 'In Progress',
            sourceUrl: '#',
            demoUrl: '#'
          },
          {
            name: 'Smart Food App',
            tech: 'React Native, Node.js',
            description: 'Mobile app for food tracking',
            status: 'In Progress',
            sourceUrl: '#',
            demoUrl: '#'
          }
        ];
        
        return (
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
                        📁 {project.name}
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
                    <div><strong>Project:</strong> {projects[selectedProject].name}</div>
                    <div><strong>Tech Stack:</strong> {projects[selectedProject].tech}</div>
                    <div><strong>Description:</strong> {projects[selectedProject].description}</div>
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
        );
      };
      
      return <ProjectsPanel />;
    })()
  }
};

export const DESKTOP_ICONS = [
  { id: 'computer', icon: '/images/icons/about-me.png', label: 'My Computer', type: 'window' },
  { id: 'about', icon: '/images/icons/agent.png', label: 'Sajad', type: 'window' },
  { id: 'contact', icon: '/images/icons/contact-me.png', label: 'Contact', type: 'window' },
  { id: 'history', icon: '/images/icons/help-book.png', label: 'History', type: 'window' },
  { id: 'cv', icon: '/images/icons/my-CV.png', label: 'My CV', type: 'window' },
  { id: 'projects', icon: '/images/icons/joy.png', label: 'Projects', type: 'window' },
  { 
    id: 'github', 
    icon: '/images/icons/github.png', 
    label: 'GitHub', 
    type: 'external',
    url: 'https://github.com/sajad42'
  },
  { 
    id: 'linkedin', 
    icon: '/images/icons/linkedin.png', 
    label: 'LinkedIn', 
    type: 'external',
    url: 'https://www.linkedin.com/in/sajad-ali-zada-732241a9'
  }
];