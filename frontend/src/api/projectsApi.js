// frontend/src/api/projectsApi.js
// test
// Ensure this matches your Render URL exactly, without a trailing slash
const API_URL = import.meta.env.VITE_API_URL || "https://spzm0j53b9.execute-api.us-east-2.amazonaws.com/default/portfolio-backend-api";

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