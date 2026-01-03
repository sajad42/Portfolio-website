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
          I am currently studying for a master's degree in Data Science at the University of Helsinki. Previously, I
          worked as a software engineer at{' '}
          <a href="#" className="text-primary underline hover:text-primary/80">
            Compound
          </a>
          . I have over a decade of experience building various kinds of software products, both collaboratively and
          independently.
        </p>
        <p>
          I am deeply passionate about AI but also enthusiastic about exploring other emerging technologies and the
          intricacies of how startups operate.
        </p>
        <div>
          <h3 className="font-bold text-base mb-2">Formal Education</h3>
          <ul className="space-y-1">
            <li>M.Sc. in Data Science, University of Helsinki (Graduating Summer 2026)</li>
            <li>B.Sc. in Computer Science, University of Helsinki (June 2021)</li>
          </ul>
        </div>
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
    defaultSize: { width: 500, height: 280 },
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          I built this portfolio over a weekend in March 2024. The goal was to create a website that better showcases 
          my frontend development skills. Technologies used include React, Tailwind CSS, and modern JavaScript patterns.
        </p>
        <p>
          This Windows 98-inspired interface pays homage to the operating system that first sparked my interest in 
          technology and software development.
        </p>
      </div>
    )
  },

  cv: {
    title: 'My CV',
    icon: '/images/icons/my-CV.png',
    defaultPosition: { x: 350, y: 200 },
    defaultSize: { width: 400, height: 500 },
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
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <h3 className="font-bold text-base mb-2">Notable Projects</h3>
        <div className="space-y-3">
          <div className="border-b pb-2">
            <h4 className="font-semibold">Portfolio Website</h4>
            <p className="text-xs">Windows 98-inspired React portfolio with draggable windows</p>
            <p className="text-xs text-gray-600">React, Tailwind CSS, Custom Hooks</p>
          </div>
          <div className="border-b pb-2">
            <h4 className="font-semibold">Data Science Projects</h4>
            <p className="text-xs">Machine learning and data analysis projects</p>
            <p className="text-xs text-gray-600">Python, Pandas, Scikit-learn</p>
          </div>
          <div>
            <h4 className="font-semibold">Web Applications</h4>
            <p className="text-xs">Full-stack applications with modern frameworks</p>
            <p className="text-xs text-gray-600">React, Node.js, PostgreSQL</p>
          </div>
        </div>
      </div>
    )
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