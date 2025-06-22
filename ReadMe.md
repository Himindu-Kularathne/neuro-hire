# Neuro Hire

NeuroHire is an AI-powered resume screening and ranking platform designed to streamline the hiring process. Built with a modular microservices architecture, it leverages natural language processing and semantic search to evaluate candidate resumes against job descriptions with precision and efficiency.

This open-source edition enables organizations and developers to customize, extend, and integrate the core capabilities into their own recruitment pipelines.

![MIT License](https://img.shields.io/badge/license-MIT-green)

---

## Table of Contents

- [Neuro Hire](#neuro-hire)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Tech Stack](#tech-stack)
  - [Architecture Diagram](#architecture-diagram)
  - [🤝 Contributing](#-contributing)

---

## Features

- Resume parsing and embedding using Gemini Model
- Semantic resume ranking using LLMs (Gemini & Hugging Face Models)
- Modular microservices architecture (FastAPI + Node.js)
- Admin dashboard with role-based access (HR Admin, Recruiter, etc.)
- Invite and manage users via email
- Supports both open-source and paid editions

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.10+

### Installation

```bash
# Clone the repository
git clone git@github.com:Himindu-Kularathne/resume-screening-system.git
cd resume-screening-system

# Install frontend dependencies
cd web/neurohire
npm install 

## Update .env files as in the .env-local
# Install Dependancies for main service
cd services/main-service
npm install

# Install Dependancies for auth service 
cd services/auth-service
npm install

# To run in the development server navigate to each service and run
npm run dev # for web fronted and above services

# To run the python service (model)
uvicorn main:app --reload
```

## Tech Stack

- **Backend:** FastAPI, LangChain, Python
- **LLM:** Gemini, HuggingFace Transformers
- **Vector DB:** ChromaDB / FAISS
- **Frontend:** React, MUI
- **Email Service:** Node.js + Nodemailer

## Architecture Diagram

![Untitled Diagram drawio](https://github.com/user-attachments/assets/e8adb8b7-c230-494f-b671-94e2b12fca8e)


## 🤝 Contributing

We welcome contributions from the community! Whether it's a bug fix, new feature, or improvement to documentation — your help is appreciated.

To contribute:

1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add feature: your feature name'`)
5. Push to your fork (`git push origin feature/your-feature-name`)
6. Submit a Pull Request

Please make sure to follow our coding conventions and test your code.

---
