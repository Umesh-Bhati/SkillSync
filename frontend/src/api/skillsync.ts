// src/api/skillsync.ts

export async function analyzeResume(resume: File, jobDesc: string) {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("jobDescription", jobDesc);
  const res = await fetch("http://localhost:5000/api/analysis/", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  return res.json();
}

export async function registerUser(email: string, password: string) {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // if using cookies
  });
  return res.json();
}

export function loginWithGoogle() {
  window.location.href = "http://localhost:5000/api/auth/google";
}

export function loginWithGitHub() {
  window.location.href = "http://localhost:5000/api/auth/github";
}