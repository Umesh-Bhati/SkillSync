import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResultsSection from '../components/ResultsSection';
import FileUploadInput from '../components/FileUploadInput';



const AnimatedBlob = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob ${className}`}></div>
  );
};

interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedElement = ({ children, delay = 0, className = '' }: AnimatedElementProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-1000 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      {children}
    </div>
  );
};


interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
}

const TextAreaInput = ({ label, value, onChange, placeholder, icon }: TextAreaInputProps) => {
  return (
    <div className="backdrop-blur-lg bg-black/30 border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/5 transition-all duration-300 h-full">
      <h3 className="text-xl font-medium mb-4 flex items-center">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 mr-3 shadow-lg shadow-indigo-600/20">
          {icon}
        </div>
        {label}
      </h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={10}
        className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 transition-all resize-none"
      />
    </div>
  );
};

export default function AppPage() {
  // Track active step in the process
  const [activeStep, setActiveStep] = useState<'input' | 'results'>('input');

  // State for resume and job description with default examples
  const [resumeText, setResumeText] = useState(``);
  const [jobDescription, setJobDescription] = useState(``);

  // State for results and loading
  const [results, setResults] = useState<{
    matched: string[];
    missing: string[];
    suggestions: string[];
  } | null>(null);
  const [tokenQuota, setTokenQuota] = useState<number | null>(null);
  const [tokensUsed, setTokensUsed] = useState<number | null>(null);
  const [tokensThisRequest, setTokensThisRequest] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState<string>('');

  // State for uploaded resume file
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const extractJobTitle = (description: string): string => {
    const lines = description.split('\n').filter(line => line.trim() !== '');

    if (lines.length > 0) {
      return lines[0].trim();
    }

    const titleRegex = /(?:position|job title|role|title)\s*(?::|is|as)?\s*(.*?)(?:\n|$)/i;
    const match = description.match(titleRegex);

    if (match && match[1]) {
      return match[1].trim();
    }

    return 'Frontend Developer';
  };

  const analyzeResume = async () => {
    if (!resumeFile || !jobDescription) {
      alert('Please upload a resume file and provide a job description.');
      return;
    }
    setIsLoading(true);
    setResults(null);
    const extractedTitle = extractJobTitle(jobDescription);
    setJobTitle(extractedTitle);
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobDescription', jobDescription);
      const response = await fetch('http://localhost:3000/api/v1/analyze-resume', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to analyze resume');
      const data = await response.json();
      setResults({
        matched: data.matchedSkills,
        missing: data.missingSkills,
        suggestions: data.suggestions || [],
      });
      setTokenQuota(data.tokenQuota ?? null);
      setTokensUsed(data.tokensUsed ?? null);
      setTokensThisRequest(data.tokensThisRequest ?? null);
      setActiveStep('results');
    } catch (err) {
      alert('Failed to analyze resume');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080510] text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <AnimatedBlob className="bg-indigo-600 top-1/4 -left-1/4 w-[500px] h-[500px]" />
        <AnimatedBlob className="bg-purple-600 bottom-1/3 -right-1/3 w-[600px] h-[600px]" />
        <AnimatedBlob className="bg-blue-600 bottom-1/4 left-1/3 w-[400px] h-[400px]" />

        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      <header className="border-b border-white/10 backdrop-blur-md bg-black/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              SkillSync
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-grow pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Process Steps Indicator */}
          <div className="mb-10">
            <AnimatedElement>
              <div className="flex justify-center">
                <div className="flex items-center space-x-4 sm:space-x-8">
                  <button
                    onClick={() => setActiveStep('input')}
                    className={`flex items-center ${activeStep === 'input' ? 'text-white' : 'text-gray-400'} transition-colors group`}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activeStep === 'input' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/30' : 'bg-gray-800 group-hover:bg-gray-700'} mr-2`}>
                      <span className="text-white font-medium">1</span>
                    </div>
                    <span className="font-medium hidden sm:inline">Input</span>
                  </button>

                  <div className="w-16 sm:w-24 h-0.5 bg-gray-700"></div>

                  <button
                    onClick={() => results && setActiveStep('results')}
                    className={`flex items-center ${activeStep === 'results' && results ? 'text-white' : 'text-gray-400'} transition-colors group ${!results && 'cursor-not-allowed'}`}
                    disabled={!results}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activeStep === 'results' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/30' : 'bg-gray-800 group-hover:bg-gray-700'} mr-2`}>
                      <span className="text-white font-medium">2</span>
                    </div>
                    <span className="font-medium hidden sm:inline">Results</span>
                  </button>
                </div>
              </div>
            </AnimatedElement>
          </div>


          {activeStep === 'input' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <AnimatedElement delay={100}>
                  <FileUploadInput
                    label="Resume"
                    value={resumeText}
                    onChange={setResumeText}
                    placeholder="Paste your resume here or upload a file..."
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    }
                    file={resumeFile}
                    onChangeFile={setResumeFile}
                  />
                </AnimatedElement>

                <AnimatedElement delay={200}>
                  <TextAreaInput
                    label="Job Description"
                    value={jobDescription}
                    onChange={setJobDescription}
                    placeholder="Paste the job description here..."
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                  />
                </AnimatedElement>
              </div>

              <AnimatedElement delay={300} className="mb-10">
                <button
                  onClick={() => analyzeResume()}
                  disabled={isLoading || !resumeFile || !jobDescription}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/20 hover:translate-y-[-2px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm1 8a1 1 0 100 2h6a1 1 0 100-2H7z" />
                      </svg>
                      Analyze Resume
                    </>
                  )}
                </button>
              </AnimatedElement>
            </>


        
          ) : (
            <div className=" transition-all duration-500 ease-in-out">
              {isLoading ? (
                <div className="backdrop-blur-lg bg-black/20 border border-white/10 rounded-2xl p-8 my-8 text-center transform transition-all duration-500 animate-pulse">
                  <div className="inline-block rounded-full bg-indigo-600/20 p-3 mb-4">
                    <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Analyzing Your Resume</h3>
                  <p className="text-gray-400 max-w-md mx-auto">We're comparing your resume with the job description to identify matching skills and opportunities...</p>
                </div>
              ) : results && (
                <div className="relative">
                {(tokenQuota !== null && tokensUsed !== null && tokensThisRequest !== null) && (
                  <div className="mb-8 rounded-2xl bg-gradient-to-br from-indigo-900/70 to-purple-900/60 border border-indigo-400/20 shadow-xl backdrop-blur-md p-6 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full">
                      {/* Progress Bar Section */}
                      <div className="flex-1 min-w-[220px] max-w-md mx-auto md:mx-0">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="text-xs text-indigo-200 font-semibold tracking-wide">Token Quota</span>
                        </div>
                        <div className="relative w-full h-3 bg-indigo-800/40 rounded-full overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-green-400 rounded-full transition-all"
                            style={{ width: `${Math.min((tokensUsed / tokenQuota) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs mt-1 text-indigo-300">
                          <span>{tokensUsed}</span>
                          <span>{tokenQuota}</span>
                        </div>
                      </div>
                      {/* Stat Chips */}
                      <div className="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-4">
                        <div className="flex items-center gap-2 bg-indigo-800/60 px-3 py-1 rounded-full shadow-inner text-indigo-100 font-medium">
                          <svg className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4l2 2" />
                          </svg>
                          Used this upload: <span className="text-white">{tokensThisRequest}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-purple-800/60 px-3 py-1 rounded-full shadow-inner text-purple-100 font-medium">
                          <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Total used: <span className="text-white">{tokensUsed}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-green-800/60 px-3 py-1 rounded-full shadow-inner text-green-100 font-medium">
                          <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          Remaining: <span className="text-white">{tokenQuota - tokensUsed}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                  <ResultsSection
                    results={results}
                    jobTitle={jobTitle}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      {activeStep === 'input' && !isLoading && (
        <div className="fixed bottom-6 right-6 lg:hidden z-50">
          <button
            onClick={() => analyzeResume()}
            disabled={isLoading || !resumeText || !jobDescription}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-110 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* Mobile navigation */}
      <div className="fixed bottom-0  left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800/50 py-3 px-6 lg:hidden z-20">
        <div className="flex justify-between max-w-md mx-auto">
          <button
            onClick={() => setActiveStep('input')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeStep === 'input' ? 'text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
            <span className="text-xs mt-1">Input</span>
          </button>

          <button
            onClick={() => results && setActiveStep('results')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeStep === 'results' && results ? 'text-indigo-400' : 'text-gray-500 hover:text-gray-300'} ${!results && 'opacity-50 cursor-not-allowed'}`}
            disabled={!results}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
            </svg>
            <span className="text-xs mt-1">Results</span>
          </button>
        </div>
      </div>
    </div>



  );
}
