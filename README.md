# AI-Powered Portfolio Engine 🚀

A high-performance, event-driven system that synchronizes GitHub data in real-time. This project demonstrates advanced full-stack engineering, secure webhook integration, and automated AI content generation using a modern distributed architecture.

---

## 🏗 System Architecture

I designed this project to be an **Event-Driven System**. To ensure a high-performance user experience, the frontend is decoupled from the GitHub API. Instead of slow, real-time fetching from external services, data is pushed to a backend cache via secure webhooks.

```mermaid
graph TD;
  A[GitHub Event: Push/Delete/Private] -->|Webhook + HMAC| B[FastAPI Backend];
  B -->|Check Cache| C[(PostgreSQL)];
  B -->|Enrich Metadata| D{OpenAI GPT-4o};
  D -->|Generated Text| B;
  B -->|Update| C;
  E[User Browser] -->|GET /api/projects| B;
  B -->|Fast JSON Response| E;
