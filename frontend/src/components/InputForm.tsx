import React, { useState } from 'react';

interface InputFormProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  jobDescription: string;
  setJobDescription: (text: string) => void;
  plan: 'free' | 'pro';
  setPlan: (plan: 'free' | 'pro') => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export default function InputForm({
  resumeText,
  setResumeText,
  jobDescription,
  setJobDescription,
  plan,
  setPlan,
  onAnalyze,
  isLoading
}: InputFormProps) {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  // Function to handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      setUploadError('Please upload a PDF file');
      return;
    }
    
    setUploadLoading(true);
    setUploadError('');
    
    try {
      // If we had a backend endpoint for PDF extraction, we'd call it here
      // For now, we'll simulate the process with a timeout
      const formData = new FormData();
      formData.append('pdf', file);
      
      // In a real implementation, we would call the backend API
      // const response = await fetch('/api/extract-pdf', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      // setResumeText(data.text);
      
      // Simulate loading delay
      setTimeout(() => {
        // Mock extraction for demo purposes
        setResumeText(`Extracted from ${file.name}:\n\nJohn Doe\nSoftware Engineer\n\nSkills:\n- JavaScript\n- React\n- TypeScript\n- Node.js\n- Express\n\nExperience:\n- Software Developer at Tech Company (2020-Present)\n- Junior Developer at Startup (2018-2020)\n\nEducation:\n- BS in Computer Science`);
        setUploadLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('Error extracting text from PDF');
      setUploadLoading(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
        Match Your Skills to Job Requirements
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resume Input */}
        <div className="backdrop-blur-lg bg-black/20 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <label className="text-lg font-medium text-white">Your Resume</label>
          </div>
          <textarea 
            className="w-full h-64 p-4 bg-black/30 text-white border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors duration-300 placeholder-gray-500" 
            placeholder="Paste your resume text or upload a PDF"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
          <div className="mt-4 flex items-center justify-between">
            <div>
              <label htmlFor="resume-upload" className="cursor-pointer inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium text-indigo-300 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Upload PDF
              </label>
              <input 
                id="resume-upload" 
                type="file" 
                accept="application/pdf" 
                className="hidden" 
                onChange={handleFileUpload}
                disabled={uploadLoading}
              />
            </div>
            {uploadLoading && (
              <div className="animate-pulse text-indigo-300 text-sm flex items-center">
                <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Extracting...
              </div>
            )}
          </div>
          {uploadError && (
            <p className="text-red-400 text-sm mt-2">{uploadError}</p>
          )}
        </div>

        {/* Job Description Input */}
        <div className="backdrop-blur-lg bg-black/20 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
            <label className="text-lg font-medium text-white">Job Description</label>
          </div>
          <textarea 
            className="w-full h-64 p-4 bg-black/30 text-white border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors duration-300 placeholder-gray-500" 
            placeholder="Paste the job description text"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Include the full job posting for better analysis</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 justify-between mt-6">
        {/* Plan Toggle */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-lg bg-black/20 border border-white/10 transition-all duration-300">
          <span className={`text-sm font-medium ${plan === 'free' ? 'text-white' : 'text-gray-400'}`}>Free</span>
          <div className="relative">
            <input 
              type="checkbox" 
              name="toggle" 
              id="plan-toggle" 
              className="sr-only"
              checked={plan === 'pro'}
              onChange={() => setPlan(plan === 'free' ? 'pro' : 'free')}
            />
            <div className="w-10 h-5 bg-gray-700 rounded-full shadow-inner">
            </div>
            <div className={`dot absolute w-5 h-5 bg-white rounded-full transition ${plan === 'pro' ? 'transform translate-x-full bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gray-200'} -top-0 left-0`}>
            </div>
          </div>
          <span className={`text-sm font-medium ${plan === 'pro' ? 'text-white' : 'text-gray-400'}`}>Pro</span>
        </div>

        {/* Analyze Button */}
        <button 
          className={`px-6 py-3 rounded-full text-white font-medium transition-all duration-300 ${isLoading ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/25'}`}
          onClick={onAnalyze}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Analyze Resume
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
