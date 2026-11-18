import React from 'react';
import { ProjectsPage } from '../components/ProjectsPage';
import { MyComputerPage } from '../components/MyComputerPage';

export const WINDOW_CONFIG = {
  about: {
    title: 'Sajad — About Me',
    icon: '/images/icons/agent.png',
    defaultPosition: { x: 220, y: 70 },
    defaultSize: { width: 500, height: 280 },
    initiallyOpen: true,
    initialZIndex: 1,
    content: (
      <div className="space-y-3 text-xs leading-relaxed">
        <p>
          I am a Computer Science undergraduate student at Concordia University with a strong
          interest in software engineering and modern web development. I enjoy building practical,
          user-focused applications and turning ideas into clean, functional products.
        </p>
        <p>
          My experience spans frontend and full-stack development. I have worked with React and
          Tailwind CSS on the frontend, and with Spring Boot and JWT-based authentication on the
          backend. I am also familiar with deploying and running applications using Docker and AWS.
        </p>
        <p>
          I am highly motivated to keep learning through hands-on projects, competitive
          programming, and exploring new technologies. I am particularly interested in scalable
          systems, real-world problem solving, and building software that is both reliable and
          enjoyable to use.
        </p>
      </div>
    ),
  },

  contact: {
    title: 'Contact',
    icon: '/images/icons/contact-me.png',
    defaultPosition: { x: 180, y: 60 },
    defaultSize: { width: 350, height: 180 },
    initiallyOpen: false,
    content: (
      <div className="space-y-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold w-14 shrink-0">📧 Email:</span>
          <a
            href="mailto:sajad.alizada2014@gmail.com"
            className="underline text-blue-800"
            style={{ cursor: 'default' }}
          >
            sajad.alizada2014@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold w-14 shrink-0">💼 LinkedIn:</span>
          <a
            href="https://www.linkedin.com/in/sajad-ali-zada-732241a9"
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-800"
            style={{ cursor: 'default' }}
          >
            sajad-ali-zada
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold w-14 shrink-0">🐙 GitHub:</span>
          <a
            href="https://github.com/sajad42"
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-800"
            style={{ cursor: 'default' }}
          >
            github.com/sajad42
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold w-14 shrink-0">📍 City:</span>
          <span>Montreal, QC 🍁</span>
        </div>
      </div>
    ),
  },

  computer: {
    title: 'My Computer',
    icon: '/images/icons/about-me.png',
    defaultPosition: { x: 300, y: 130 },
    defaultSize: { width: 520, height: 360 },
    initiallyOpen: true,
    initialZIndex: 2,
    content: <MyComputerPage />,
  },

  cv: {
    title: 'My CV',
    icon: '/images/icons/my-CV.png',
    defaultPosition: { x: 240, y: 60 },
    defaultSize: { width: 500, height: 600 },
    content: (
      <div className="flex justify-center">
        <img
          src="/images/sajad-resume.png"
          alt="Sajad's Resume"
          className="max-w-full h-auto"
          draggable={false}
        />
      </div>
    ),
  },

  history: {
    title: 'History',
    icon: '/images/icons/help-book.png',
    defaultPosition: { x: 420, y: 220 },
    defaultSize: { width: 420, height: 300 },
    content: (
      <div className="space-y-4 text-xs leading-relaxed">
        <h3 className="font-bold text-sm border-b border-gray-400 pb-1 mb-3">
          📋 Professional Journey
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 font-bold">
              <span>💼</span>
              <span>Software Engineer — Compound</span>
            </div>
            <p className="ml-6 text-gray-600 text-[11px]">Building scalable AI applications</p>
          </div>
          <div>
            <div className="flex items-center gap-2 font-bold">
              <span>🎓</span>
              <span>Computer Science — Concordia University</span>
            </div>
            <p className="ml-6 text-gray-600 text-[11px]">Montreal, QC · In progress</p>
          </div>
          <div>
            <div className="flex items-center gap-2 font-bold">
              <span>🚀</span>
              <span>Open Source & Side Projects</span>
            </div>
            <p className="ml-6 text-gray-600 text-[11px]">
              Portfolio website, StudyConnect, and more on GitHub
            </p>
          </div>
        </div>
      </div>
    ),
  },

  projects: {
    title: 'Projects',
    icon: '/images/icons/joy.png',
    defaultPosition: { x: 140, y: 90 },
    defaultSize: { width: 680, height: 420 },
    content: <ProjectsPage />,
  },
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
    url: 'https://github.com/sajad42',
  },
  {
    id: 'linkedin',
    icon: '/images/icons/linkedin.png',
    label: 'LinkedIn',
    type: 'external',
    url: 'https://www.linkedin.com/in/sajad-ali-zada-732241a9',
  },
];
