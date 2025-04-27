// src/components/ResumeAnalyzer.tsx
import React, { useState } from "react";
import { analyzeResume } from "../api/skillsync";

export const ResumeAnalyzer: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setResume(e.target.files[0]);
  };

  const handleAnalyze = async () => {
   try {
    if (!resume || !jobDesc) return;
    setLoading(true);
    setResult(null);
    const res = await analyzeResume(resume, jobDesc);
    setResult(res);
    setLoading(false);
   } catch (error) {
    setLoading(false)
   }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary-950 via-secondary-950 to-black overflow-hidden">
      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute w-72 h-72 bg-secondary-700 opacity-30 rounded-full filter blur-3xl animate-blob1"></div>
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-primary-800 opacity-20 rounded-full filter blur-3xl animate-blob2"></div>
        <div className="absolute left-1/2 bottom-0 w-80 h-80 bg-accent-400 opacity-10 rounded-full filter blur-3xl animate-blob3"></div>
      </div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-xl mx-auto bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/20 ring-1 ring-primary-900/10">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <span className="text-5xl animate-bounce drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]">🤖</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2 text-center drop-shadow">AI Resume Match Analyzer</h2>
          <p className="text-neutral-300 mb-6 text-center">
            Instantly see how your resume matches your dream job using AI.
          </p>
        </div>

        <div className="space-y-4">
          {/* File Input */}
          <label className="block">
            <span className="font-semibold text-neutral-200">Upload Resume</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="mt-2 block w-full text-sm text-neutral-200
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-gradient-to-r file:from-primary-500 file:to-secondary-500
                file:text-white hover:file:from-primary-600 hover:file:to-secondary-600
                transition"
            />
          </label>
          {/* Textarea Input */}
          <label className="block">
            <span className="font-semibold text-neutral-200">Paste Job Description</span>
            <textarea
              className="mt-2 block w-full rounded-xl border border-primary-900/40 bg-black/40 text-neutral-200 focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 p-3 transition"
              placeholder="Paste job description here..."
              value={jobDesc}
              onChange={e => setJobDesc(e.target.value)}
              rows={6}
            />
          </label>
          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || !resume || !jobDesc}
            className={`w-full py-3 rounded-xl font-bold text-white transition
              ${loading || !resume || !jobDesc
                ? "bg-gradient-to-r from-neutral-600 to-neutral-700 cursor-not-allowed"
                : "bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg ring-2 ring-accent-400/30"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin inline-block w-5 h-5 border-2 border-t-transparent border-accent-400 rounded-full"></span>
                Analyzing with AI...
              </span>
            ) : (
              "Analyze"
            )}
          </button>
        </div>
        {/* Results */}
        {result && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary-900/70 to-secondary-900/60 shadow-md border border-white/10">
            <div className="text-center text-2xl font-bold mb-4 text-white drop-shadow">
              Match Score: <span className="text-accent-400">{result.matchScore}%</span>
            </div>
            {/* Skill Progress Bars */}
            <div className="space-y-3 mb-4">
              {result.matchingSkills.map((skill: string, i: number) => (
                <div key={skill} className="flex items-center gap-2">
                  <span className="text-sm text-neutral-200 w-24">{skill}</span>
                  <div className="flex-1 h-3 rounded-full bg-neutral-800/60 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-accent-400 to-primary-400 transition-all duration-700" style={{ width: `${90 - i * 10}%` }} />
                  </div>
                  <span className="text-xs text-accent-300">{90 - i * 10}%</span>
                </div>
              ))}
              {result.missingSkills.map((skill: string, i: number) => (
                <div key={skill} className="flex items-center gap-2 opacity-70">
                  <span className="text-sm text-neutral-400 w-24">{skill}</span>
                  <div className="flex-1 h-3 rounded-full bg-neutral-800/40 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-700" style={{ width: `${60 - i * 15}%` }} />
                  </div>
                  <span className="text-xs text-red-300">{60 - i * 15}%</span>
                </div>
              ))}
            </div>
            {/* Suggestions */}
            <div className="mt-4 bg-black/30 rounded-xl p-4 border border-primary-900/20">
              <div className="flex items-center gap-2 mb-2 text-accent-400 font-semibold">
                <span className="text-lg">⚡</span>
                Recommended next step
              </div>
              <ul className="list-disc pl-5 text-neutral-200">
                {result.suggestions.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* Tailwind custom animations */}
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translateY(0) scale(1); }
          33% { transform: translateY(-30px) scale(1.1); }
          66% { transform: translateY(20px) scale(0.9); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translateY(0) scale(1); }
          33% { transform: translateY(40px) scale(1.05); }
          66% { transform: translateY(-25px) scale(0.95); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translateY(0) scale(1); }
          33% { transform: translateY(-20px) scale(1.08); }
          66% { transform: translateY(30px) scale(0.92); }
        }
        .animate-blob1 { animation: blob1 8s infinite ease-in-out; }
        .animate-blob2 { animation: blob2 10s infinite ease-in-out; }
        .animate-blob3 { animation: blob3 12s infinite ease-in-out; }
      `}</style>
    </div>
  );
};