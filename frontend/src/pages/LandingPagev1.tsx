import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Modern abstract animated blob component
const AnimatedBlob = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob ${className}`}></div>
  );
};

// Text animation component
const AnimatedText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
};

// Gradient text component
const GradientText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${className}`}>
      {children}
    </span>
  );
};



export default function TrendingAILandingPage() {
  return (
    <div className="min-h-screen bg-[#080510] text-white font-sans">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatedBlob className="bg-indigo-600 top-1/4 -left-1/4 w-[500px] h-[500px]" />
        <AnimatedBlob className="bg-purple-600 bottom-1/3 -right-1/3 w-[600px] h-[600px]" />
        <AnimatedBlob className="bg-blue-600 bottom-1/4 left-1/3 w-[400px] h-[400px]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-5"></div>
      </div>

      {/* Navigation */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-xl font-bold">S</span>
            </div>
            <span className="text-xl font-display font-medium">SkillSync</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link to="/register" className="hidden md:block px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all">
              Sign In
            </Link>
            <Link to="/app" className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-purple-600/20 transition-all">
              Try Free
            </Link>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <AnimatedText>
                  <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                    <span className="text-gray-400">Learn in Public</span>
                    <span className="ml-2 px-2 py-1 bg-indigo-500/20 rounded-full text-indigo-400 text-xs">Building in Public</span>
                  </div>
                </AnimatedText>
                
                <AnimatedText delay={200}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight mb-6">
                    Building <GradientText>SkillSync</GradientText> in <span className="text-indigo-400">Public</span>
                  </h1>
                </AnimatedText>
                
                <AnimatedText delay={400}>
                  <p className="text-xl text-gray-400 mb-8 max-w-xl">
                    Hi! I'm Umesh, a full-stack developer documenting my journey building SkillSync - an AI tool that helps job seekers match their skills to job descriptions and identify growth opportunities.
                  </p>
                </AnimatedText>
                
                <AnimatedText delay={600}>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link to="/app" 
                      className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-purple-600/20 hover:shadow-xl hover:shadow-purple-600/30 transition-all duration-300 hover:scale-105 text-center"
                    >
                      Try It Now
                    </Link>
                    <a 
                      href="#feedback" 
                      className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 text-center group"
                    >
                      Share Feedback
                      <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </AnimatedText>
                
                <AnimatedText delay={800}>
                  <div className="flex flex-col gap-3">
                    <div className="text-sm text-gray-400 mb-2">
                      <span className="text-white font-medium">Built with</span> modern technologies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs">React</span>
                      <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs">TypeScript</span>
                      <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs">TailwindCSS</span>
                      <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs">FastAPI</span>
                      <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs">Python</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Free trial available</span>
                    </div>
                  </div>
                </AnimatedText>
              </div>
              
              <div className="lg:w-1/2 relative">
                <AnimatedText delay={400}>
                  <div className="relative z-10 backdrop-blur-lg bg-black/30 border border-white/10 rounded-2xl p-6 shadow-xl shadow-purple-800/5">
                    <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-sm font-medium">
                      AI Resume Analysis
                    </div>
                    
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="font-medium">resume.pdf</span>
                      </div>
                      <span className="text-xs text-gray-400">Analyzed</span>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Skills Matching</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'React', percentage: 90, color: 'bg-indigo-500' },
                          { name: 'TypeScript', percentage: 85, color: 'bg-blue-500' },
                          { name: 'Node.js', percentage: 75, color: 'bg-green-500' },
                          { name: 'Python', percentage: 60, color: 'bg-yellow-500' },
                          { name: 'AWS', percentage: 40, color: 'bg-red-500' },
                        ].map((skill) => (
                          <div key={skill.name} className="relative pt-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{skill.name}</span>
                              <span className="text-xs text-gray-400">{skill.percentage}%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${skill.color} rounded-full animate-pulse-slow`} 
                                style={{ width: `${skill.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-white/5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Recommended next step</div>
                        <div className="text-xs text-gray-400">Build an AWS serverless project to improve cloud skills</div>
                      </div>
                    </div>
                  </div>
                </AnimatedText>
                
                {/* Decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-purple-600/20 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/30 rounded-full blur-3xl"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Collection Section */}
        <section id="share-ideas" className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedText>
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="text-gray-400">Learn in Public</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
                  Share Your <GradientText>Ideas</GradientText> & Feedback
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  I'm building SkillSync in public and would love your input! What features would make this tool most valuable for your job search?
                </p>
              </div>
            </AnimatedText>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedText delay={100}>
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                  <h3 className="text-xl font-medium mb-6">What I'm Looking For</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2">Feature Ideas</h4>
                        <p className="text-gray-400">What features would make this tool most valuable for your job search or career development?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2">UI/UX Feedback</h4>
                        <p className="text-gray-400">How can I improve the user experience? What would make the interface more intuitive?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2">Use Cases</h4>
                        <p className="text-gray-400">How would you use this tool in your workflow? What problems would it solve for you?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedText>
              
              <AnimatedText delay={200}>
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-indigo-500/30 transition-all duration-300">
                  <h3 className="text-xl font-medium mb-6">How to Share Feedback</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2">Comment on LinkedIn</h4>
                        <p className="text-gray-400">Share your thoughts directly on my LinkedIn post about this project.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2">Email Me</h4>
                        <p className="text-gray-400">Send detailed feedback to <a href="mailto:contact@example.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">contact@example.com</a></p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2">Try the Demo</h4>
                        <p className="text-gray-400">Experience the current version and share your thoughts on what works and what could be improved.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedText>
            </div>
            
            <AnimatedText delay={300}>
              <div className="mt-12 text-center">
                <p className="text-gray-400 text-lg">
                  Your feedback directly shapes the future of SkillSync. Thank you for being part of this journey!
                </p>
              </div>
            </AnimatedText>
          </div>
        </section>



        {/* Learn in Public Roadmap */}
        <section id="feedback" className="py-20 bg-gradient-to-b from-black/40 to-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedText>
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="text-gray-400">Building in Public</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
                  <GradientText>Project Roadmap</GradientText> & Feedback
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  I'm building SkillSync in public and would love your input on what features to prioritize next!
                </p>
              </div>
            </AnimatedText>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-pink-500/50 transform -translate-x-1/2 hidden md:block"></div>

              <div className="space-y-16">
                {[
                  {
                    title: "Current: Resume Skill Analysis",
                    description: "AI-powered skill extraction from resumes and matching against job descriptions.",
                    features: ["Extract skills from resume PDFs", "Match skills to job requirements", "Identify skill gaps"],
                    status: "Available Now",
                    statusColor: "bg-green-500"
                  },
                  {
                    title: "Next: Project Suggestions",
                    description: "AI-generated project ideas to help you build the missing skills identified in your resume analysis.",
                    features: ["Personalized project ideas", "Skill-focused learning paths", "Difficulty levels"],
                    status: "Need Feedback",
                    statusColor: "bg-indigo-500"
                  },
                  {
                    title: "Future: Your Suggestions",
                    description: "I'm building this tool for you! What features would help you most in your job search?",
                    features: ["Share your ideas on LinkedIn", "Vote on upcoming features", "Suggest improvements"],
                    status: "Collecting Ideas",
                    statusColor: "bg-purple-500"
                  }
                ].map((item, index) => (
                  <AnimatedText key={index} delay={200 + index * 150}>
                    <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
                      <div className="md:w-1/2 p-6">
                        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
                          <div className="flex items-center mb-4">
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${item.statusColor}/20 text-white mr-2`}>
                              {item.status}
                            </div>
                          </div>
                          <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                          <p className="text-gray-400 mb-4">{item.description}</p>
                          <ul className="space-y-2">
                            {item.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="md:w-1/2 p-6 flex justify-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold relative z-10">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </AnimatedText>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Early Access CTA */}
        <section id="early-access" className="py-24 relative overflow-hidden">
          <div className="absolute -z-10 inset-0">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            
            {/* Ambient light effects */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedText>
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="text-gray-400">Indie Business</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6">
                  Support This <GradientText>Project</GradientText>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                  As a solo developer, I've built this tool to help job seekers while creating a sustainable micro-business that covers API and hosting costs.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 justify-center mb-12">
                  <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center transition-all duration-300 hover:border-indigo-500/30">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Exclusive First Access</h3>
                    <p className="text-center text-gray-400 text-sm">Start using the platform before anyone else</p>
                  </div>
                  
                  <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center transition-all duration-300 hover:border-purple-500/30">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Premium Features Free</h3>
                    <p className="text-center text-gray-400 text-sm">All premium features unlocked for beta testers</p>
                  </div>
                  
                  <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center transition-all duration-300 hover:border-pink-500/30">
                    <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Direct Support</h3>
                    <p className="text-center text-gray-400 text-sm">1-on-1 product team support and feedback</p>
                  </div>
                </div>
              </div>
            </AnimatedText>
            
            <AnimatedText delay={200}>
              <div className="max-w-xl mx-auto backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                <h3 className="text-xl font-medium mb-4 text-center">Subscribe For Updates</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Your Role</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                      <option value="" className="bg-black">Select your role</option>
                      <option value="student" className="bg-black">Student</option>
                      <option value="job_seeker" className="bg-black">Job Seeker</option>
                      <option value="professional" className="bg-black">Professional</option>
                      <option value="recruiter" className="bg-black">Recruiter</option>
                      <option value="other" className="bg-black">Other</option>
                    </select>
                  </div>
                </div>
                <button className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-purple-900/30 hover:shadow-xl hover:shadow-purple-900/40 transition-all duration-300 hover:scale-[1.02]">
                  Subscribe
                </button>
                <p className="text-center text-gray-500 text-xs mt-4">
                  Get notified about launch discounts and new features. No spam, ever.
                </p>
              </div>
            </AnimatedText>
            
            <AnimatedText delay={400}>
              <div className="mt-16 flex flex-wrap justify-center items-center gap-12">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-white mb-1">$0</div>
                  <div className="text-sm text-gray-400">Starting Price</div>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-white mb-1">3</div>
                  <div className="text-sm text-gray-400">Free Analyses</div>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-gray-400">Availability</div>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-white mb-1">14</div>
                  <div className="text-sm text-gray-400">Day Guarantee</div>
                </div>
              </div>
            </AnimatedText>
          </div>
        </section>
        
        {/* Trust Logos */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedText>
              <div className="text-center mb-10">
                <p className="text-gray-500 uppercase tracking-wider text-sm font-medium">Trusted Technology Partners</p>
              </div>
            </AnimatedText>
            
            <AnimatedText delay={200}>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
                {['AWS', 'Microsoft', 'Google Cloud', 'OpenAI', 'Hugging Face'].map((logo, index) => (
                  <div key={index} className="text-lg font-mono tracking-tight">{logo}</div>
                ))}
              </div>
            </AnimatedText>
          </div>
        </section>
        </main>
         {/* Footer */}
         <footer className="py-16 border-t border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                    <span className="text-sm font-bold">S</span>
                  </div>
                  <span className="text-lg font-display font-medium">SkillSync</span>
                </div>
                <p className="text-gray-400 mb-6">
                  A passion project built by an indie developer to help job seekers match their skills with job requirements and level up their careers.
                </p>
                <div className="flex gap-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="sr-only">GitHub</span>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-4">Project</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#feedback" className="text-gray-400 hover:text-white transition-colors">Roadmap & Feedback</a></li>
                  <li><a href="#share-ideas" className="text-gray-400 hover:text-white transition-colors">Share Ideas</a></li>
                  <li><a href="/app" className="text-gray-400 hover:text-white transition-colors">Try the Demo</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-4">Learn in Public</h3>
                <ul className="space-y-2">
                  <li><a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">LinkedIn Updates</a></li>
                  <li><a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub Repository</a></li>
                  <li><a href="mailto:contact@example.com" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                  <li><a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} SkillSync | Built with ❤️ by Umesh Bhati | Learning in Public</p>
              
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <span className="text-gray-700">•</span>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Use</a>
              </div>
            </div>
          </div>
        </footer>
       </div> 
 
 )
 }