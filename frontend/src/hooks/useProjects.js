import { useState, useEffect } from 'react';
import { projectsApi } from '../api/projectsApi';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getProjects();
        console.log(data)
        setProjects(data);
        console.log(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        // Fallback to static data
        setProjects(getStaticProjects());
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

const getStaticProjects = () => [
  {
    id: 1,
    name: 'StudyConnect Platform',
    tech: 'Spring Boot, AWS, Java',
    description: 'Full-stack platform for students',
    status: 'Active Development',
    sourceUrl: 'https://github.com/sajad42/studyconnect',
    demoUrl: 'https://d3hl37aapqqsoq.cloudfront.net/'
  }
  // ... other projects
];
