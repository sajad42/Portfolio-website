// frontend/src/api/projectsApi.js
// test
// Ensure this matches your Render URL exactly, without a trailing slash
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const projectsApi = {
  async getProjects() {
    // Make sure the path '/api/projects' is appended here
    const response = await fetch(`${API_URL}/api/projects`); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
};