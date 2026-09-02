const API_URL = import.meta.env.VITE_API_URL || "https://portfolio-website-600650119783.us-east1.run.app";

export const projectsApi = {
  async getProjects() {
    // Make sure the path '/api/projects' is appended here
    const response = await fetch(`${API_URL}/api/projects`); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
};//test