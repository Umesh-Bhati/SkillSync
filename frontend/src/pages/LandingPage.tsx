import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Animation component for revealing elements
function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = ref;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setIsVisible(true);
          if (currentRef) observer.unobserve(currentRef);
        }, delay);
      }
    });
    
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, delay]);

  return (
    <div
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      ref={setRef}
    >
      {children}
    </div>
  );
}

// Floating background elements
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-primary-100 opacity-40"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 20}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

// Feature Card component
function FeatureCard({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}) {
  return (
    <RevealOnScroll delay={delay}>
      <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border-t-4 border-primary-500">
        <div className="text-primary-500 mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </RevealOnScroll>
  );
}

// Step Card component for How It Works section
function StepCard({ 
  number, 
  title, 
  description, 
  imageUrl, 
  delay 
}: { 
  number: number; 
  title: string; 
  description: string; 
  imageUrl: string;
  delay: number;
}) {
  return (
    <RevealOnScroll delay={delay}>
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center text-xl font-bold">
          {number}
        </div>
        <h3 className="text-xl font-bold mb-4 mt-4">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="rounded-lg overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-cover transition-transform duration-500 transform hover:scale-110" 
          />
        </div>
      </div>
    </RevealOnScroll>
  );
}

// Testimonial component
function Testimonial({ 
  quote, 
  author, 
  role, 
  delay 
}: { 
  quote: string; 
  author: string; 
  role: string; 
  delay: number;
}) {
  return (
    <RevealOnScroll delay={delay}>
      <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-500 hover:shadow-xl">
        <div className="flex items-start mb-4">
          <div className="text-4xl text-primary-300 mr-3">"</div>
          <p className="italic text-gray-700">{quote}</p>
        </div>
        <div className="flex items-center mt-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl mr-4">
            {author.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold">{author}</h4>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}

// Main landing page component
export default function LandingPage() {
  return (
    <div className="relative">
      {/* Add floating animated elements */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
      
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-r from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <RevealOnScroll>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Ace Your <span className="text-primary-600">Job Applications</span> with AI
                </h1>
              </RevealOnScroll>
              
              <RevealOnScroll delay={200}>
                <p className="text-xl text-gray-600 mb-8">
                  Our AI Resume Analyzer matches your skills with job descriptions, identifies gaps, and suggests projects to make you the perfect candidate.
                </p>
              </RevealOnScroll>
              
              <RevealOnScroll delay={300}>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/app" 
                    className="btn btn-primary px-8 py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Try It Free
                  </Link>
                  
                  <a 
                    href="#how-it-works" 
                    className="btn btn-outline px-8 py-4 rounded-lg flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    How It Works
                  </a>
                </div>
              </RevealOnScroll>
              
              <RevealOnScroll delay={400}>
                <div className="mt-10 flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[
                      "bg-red-400", 
                      "bg-blue-400", 
                      "bg-green-400", 
                      "bg-yellow-400"
                    ].map((bg, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-gray-600 text-sm">
                    <span className="font-bold">500+</span> people used our analyzer today
                  </div>
                </div>
              </RevealOnScroll>
            </div>
            
            <div className="md:w-1/2">
              <RevealOnScroll delay={200}>
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  {/* Screenshot with nice animation effect */}
                  <div className="relative bg-white p-3 rounded-2xl shadow-2xl transform transition-all duration-500 hover:rotate-0 rotate-1">
                    <div className="absolute top-3 left-3 flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                        alt="AI Resume Analyzer" 
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                        <div className="p-6 text-white">
                          <p className="text-lg font-bold mb-2">Find your perfect match</p>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span>8 skills matched • 3 skills missing</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#features" className="block p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="flex flex-col items-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-center mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-600 text-center max-w-3xl">
                Our AI-powered platform provides everything you need to optimize your resume and stand out to employers.
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              } 
              title="Skill Matching" 
              description="Our AI analyzes your resume and job descriptions to identify matching skills and highlight what employers are looking for."
              delay={200}
            />
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              } 
              title="Gap Analysis" 
              description="Identify missing skills that employers want, so you can focus your learning on what matters most for your career growth."
              delay={400}
            />
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              } 
              title="Project Recommendations" 
              description="Get personalized project ideas to help you build the exact skills employers are looking for in your field."
              delay={600}
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="flex flex-col items-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 text-center max-w-3xl">
                Our process is simple yet powerful, leveraging AI to give you actionable insights in minutes.
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <StepCard 
              number={1} 
              title="Upload Your Resume" 
              description="Simply paste your resume text or upload a PDF. Our AI will extract and analyze all relevant skills."
              imageUrl="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              delay={200}
            />
            
            <StepCard 
              number={2} 
              title="Add Job Description" 
              description="Paste in the job listing you're interested in. Our system will identify the required skills and qualifications."
              imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              delay={400}
            />
            
            <StepCard 
              number={3} 
              title="Get Insights & Projects" 
              description="Receive a personalized analysis showing matched skills, missing qualifications, and suggested projects to improve."
              imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              delay={600}
            />
          </div>
          
          <RevealOnScroll delay={800}>
            <div className="text-center mt-16">
              <Link 
                to="/app" 
                className="btn btn-primary text-lg px-8 py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center"
              >
                Try It Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="flex flex-col items-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-center mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 text-center max-w-3xl">
                Don't just take our word for it. Here's what professionals like you have to say about our tool.
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              quote="The AI Resume Analyzer helped me understand exactly what skills I was missing for my dream job. I built those skills and landed the position!"
              author="Sarah Johnson"
              role="Software Engineer"
              delay={200}
            />
            
            <Testimonial 
              quote="As a career coach, I recommend this tool to all my clients. It cuts hours off the job preparation process and gives actionable insights."
              author="Michael Chen"
              role="Career Coach"
              delay={400}
            />
            
            <Testimonial 
              quote="I was surprised by how accurately it matched my skills to the job description. The project recommendations were incredibly helpful!"
              author="Jessica Miller"
              role="UX Designer"
              delay={600}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <RevealOnScroll>
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-4xl font-bold mb-4">Ready to Boost Your Career?</h2>
                <p className="text-xl text-primary-100 mb-0">
                  Join thousands of job seekers who are landing their dream jobs with AI Resume Analyzer.
                </p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div>
                <Link 
                  to="/app" 
                  className="px-8 py-4 bg-white text-primary-600 rounded-lg font-bold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center"
                >
                  Get Started Free
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
