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


---

### **Step 4: Document the Endpoints**
Explain the routes you built in `main.py` so recruiters know how to interact with your API.

```markdown
The backend provides interactive documentation at `https://portfolio-website-98ei.onrender.com/docs`.

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/projects` | `GET` | Fetches synchronized projects directly from the PostgreSQL database. |
| `/api/sync-github` | `POST` | Manually triggers a full synchronization cycle with the GitHub API. |
| `/api/github-webhook` | `POST` | Secure endpoint for real-time push, delete, and privacy events. |
