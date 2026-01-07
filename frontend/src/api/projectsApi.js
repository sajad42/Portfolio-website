const API_BASE_URL = "http://127.0.0.1:8000/api/projects";

export const projectsApi = {
  async getProjects() {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return await response.json();
    } catch (error) {
      console.error('Projects API error:', error);
      throw error;
    }
  }
};
