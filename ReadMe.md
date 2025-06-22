# Neuro Hire

AI-powered resume screening and ranking system for recruiters and job seekers.

![MIT License](https://img.shields.io/badge/license-MIT-green)

---

## Table of Contents

- [Neuro Hire](#neuro-hire)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)

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
