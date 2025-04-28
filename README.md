# SkillSync: AI Resume Analyzer

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20Umesh-yellow?logo=buy-me-a-coffee&style=flat-square)](https://www.buymeacoffee.com/0xumeshbhati)

SkillSync is a modern, full-stack AI-powered resume analyzer that helps job seekers and professionals match their resumes against job descriptions, identify skill gaps, and receive actionable project suggestions for upskilling. Built for speed, privacy, and a great user experience, SkillSync leverages LLMs (Groq/OpenAI), PDF parsing, and a clean UI to deliver instant insights.

---

## ✨ Features

- **AI-Powered Skill Extraction**: Extracts skills from both resumes and job descriptions using LLMs (Groq API, OpenAI fallback).
- **Skill Matching**: Instantly shows matched and missing skills between your resume and the target job.
- **Project Suggestions**: (Pro) Get project ideas to fill skill gaps and boost your profile.
- **Modern UI/UX**: Clean, minimal Tailwind CSS design with responsive layout and clear feedback.
- **PDF Resume Parsing**: Secure, accurate extraction of text from PDF resumes.
- **Token-Based Rate Limiting**: Prevents abuse with daily usage quotas per user/IP.
- **CI/CD & Cloud Deployment**: Automated deployment to Google Cloud Run via GitHub Actions.

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **AI/LLM**: Groq API (Llama3), OpenAI GPT-3.5 (fallback), mock data for local/dev
- **PDF Parsing**: PyMuPDF or pdfplumber (for Python-based parsing)
- **Auth/Plans**: In-memory or mock token logic (easy to extend)
- **Cloud/CI**: Google Cloud Run, GitHub Actions
- **(Optional)** Redis/Memorystore for persistent rate limiting

---

## 🚀 Quick Start

### 1. Clone the Repo
```sh
git clone https://github.com/Umesh-Bhati/SkillSync.git
cd SkillSync
```

### 2. Setup Environment Variables
- Copy `.env.example` to `.env` in the `backend/` folder.
- Add your Groq/OpenAI API keys and any other required secrets.

### 3. Install Dependencies
```sh
cd backend
yarn install
cd ../frontend
yarn install
```

### 4. Run Locally
- **Backend**: `cd backend && npm run dev`
- **Frontend**: `cd frontend && npm run dev`

### 5. Build & Deploy
- CI/CD is set up via GitHub Actions to deploy both frontend and backend to Google Cloud Run on every push to `main`.
- See `.github/workflows/` for details.

---

## 🧩 Project Structure

```
SkillSync/
├── backend/            # Node.js/Express API
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/           # React + Tailwind UI
│   ├── src/
│   ├── package.json
│   └── ...
├── .github/workflows/  # CI/CD pipelines
├── .gitignore
└── README.md
```

---


## 🛡️ Security & Privacy
- API keys and sensitive data are managed via environment variables.
- Token-based rate limiting to prevent abuse.
---

## 🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

---

## 📄 License
MIT


## 💡 Inspiration
SkillSync was created to help job seekers quickly identify and close skill gaps using the power of AI and a delightful, privacy-first user experience.

---

## ☕ Support
If you find this project helpful, you can support my work:

[![Buy Me a Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/0xumeshbhati)

Your support helps me keep building and maintaining open-source projects like SkillSync. Thank you!

---

## 📬 Contact
For questions, feedback, or support, open an issue or contact [Umesh Bhati](https://github.com/Umesh-Bhati).
