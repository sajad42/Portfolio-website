# AI-Powered Portfolio Engine 🚀

A full-stack portfolio system that automatically syncs with GitHub using Webhooks, generates AI descriptions for projects via OpenAI, and persists data in a PostgreSQL database for high performance.

## 🏗 System Architecture

I designed this project to be an **Event-Driven System**. Instead of my website calling the slow GitHub API every time a recruiter visits, the data is pushed to my backend in real-time.

```mermaid
graph LR
    A[GitHub Push/Delete] -->|Webhook + HMAC| B(FastAPI Backend)
    B -->|Check Cache| C[(PostgreSQL)]
    B -->|Enrich Data| D{OpenAI GPT-4o}
    D --> B
    B --> C
    E[Recruiter Browser] -->|Fast Fetch| B
    B -->|JSON| E

## 📖 API Reference
The backend provides an interactive Swagger UI at `https://your-render-url.com/docs`.

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/projects` | `GET` | Returns a cached list of projects from PostgreSQL. |
| `/api/sync-github` | `POST` | Manually triggers a full synchronization cycle. |
| `/api/github-webhook` | `POST` | Secure endpoint for GitHub real-time event updates. |
