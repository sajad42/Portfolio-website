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
🚀 Key Engineering AchievementsReal-Time Data Pipeline: Implemented GitHub Webhooks to automate the full repository lifecycle (synchronizing stars, languages, and visibility status instantly).Security-First Architecture: Developed a custom HMAC SHA-256 signature verification layer to ensure backend integrity and protect against unauthorized payloads.AI-Automated Documentation: Integrated the OpenAI API to dynamically generate professional project descriptions, reducing manual overhead.Performance Optimization: Migrated from direct API polling to a PostgreSQL (Neon) caching layer, reducing project load times by approximately 90%.🛠 Tech StackComponentTechnologyRationaleFrontendReact + ViteOptimized for fast HMR and lightweight production builds.BackendFastAPI (Python)High-performance asynchronous framework for handling webhooks.DatabasePostgreSQL (Neon.tech)Scalable, serverless relational storage for persistent project data.AI LayerOpenAI GPT-4o-miniUsed for cost-effective, high-quality metadata enrichment.InfrastructureAWS Amplify & RenderDistributed hosting for frontend and backend CI/CD pipelines.📖 API ReferenceThe backend provides interactive Swagger documentation at https://portfolio-website-98ei.onrender.com/docs.EndpointMethodDescription/api/projectsGETFetches synchronized project data from the PostgreSQL database./api/sync-githubPOSTManually triggers a full synchronization cycle with GitHub./api/github-webhookPOSTSecure endpoint for real-time repository events (Push, Delete, Privacy)./api/generate-descriptionGETTriggers the OpenAI engine to describe a specific repository.🛠️ Local Development1. Backend SetupBashcd backend
pip install -r requirements.txt
uvicorn main:app --reload
2. Frontend SetupBashcd frontend
npm install
npm run dev
🔗 Live LinksPortfolio UI: https://main.d3a6cq397zfehj.amplifyapp.com/API Documentation: https://portfolio-website-98ei.onrender.com/docs
