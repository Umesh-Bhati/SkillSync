import React, { useState } from 'react';
import SkillTag from './SkillTag';
import RoadmapRecommendation from './RoadmapRecommendation';
import AnimatedCircularBar from './AnimatedCircularBar';

interface ResultsSectionProps {
  results: {
    matched: string[];
    missing: string[];
    suggestions: string[];
  } | null;
  plan?: 'free' | 'pro';
  jobTitle?: string;
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: {
    matched: string[];
    missing: string[];
  };
}

export default function ResultsSection({
  results,
  plan,
  jobTitle = 'Frontend Developer'
}: ResultsSectionProps) {
  const [activeTab, setActiveTab] = useState<'matching' | 'projects' | 'roadmaps'>('matching');
  const calculateMatchPercentage = () => {
    if (!results) return 0;
    const total = results.matched.length + results.missing.length;
    return total > 0 ? Math.round((results.matched.length / total) * 100) : 0;
  };

  // Group skills into categories
  const categorizeSkills = () => {
    if (!results) return [];

    // Define categories with icons
    const categories: SkillCategory[] = [
      {
        name: 'Programming & Languages',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ),
        skills: {
          matched: filterSkillsByCategory(results.matched, ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'GraphQL']),
          missing: filterSkillsByCategory(results.missing, ['GraphQL', 'SASS', 'LESS'])
        }
      },
      {
        name: 'Frameworks & Libraries',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
        ),
        skills: {
          matched: filterSkillsByCategory(results.matched, ['React', 'Redux', 'Framework']),
          missing: filterSkillsByCategory(results.missing, ['NextJS', 'Server-side Rendering'])
        }
      },
      {
        name: 'Tools & Infrastructure',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        ),
        skills: {
          matched: filterSkillsByCategory(results.matched, ['Git', 'Version Control', 'Testing', 'Jest']),
          missing: filterSkillsByCategory(results.missing, ['CI/CD', 'AWS', 'Docker'])
        }
      },
      {
        name: 'Experience & Expertise',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        ),
        skills: {
          matched: filterSkillsByCategory(results.matched, ['UI/UX', 'Performance', 'Responsive', 'Development']),
          missing: filterSkillsByCategory(results.missing, ['years experience', 'Mentoring'])
        }
      }
    ];

    return categories;
  };

  // Helper function to filter skills by category keywords
  function filterSkillsByCategory(skills: string[], keywords: string[]): string[] {
    return skills.filter(skill =>
      keywords.some(keyword =>
        skill.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }

  // const matchPercentage = calculateMatchPercentage();
  // const skillCategories = categorizeSkills();


  if (!results) return null;

  const matchPercentage = calculateMatchPercentage();
  const skillCategories = categorizeSkills();

  return (

    <div className="my-12 space-y-8 transition-opacity duration-1000 opacity-100">
      {/* Tab Navigation */}
      <div className="flex items-center justify-center gap-3 backdrop-blur-sm bg-black/20 border border-white/10 rounded-full p-1.5 shadow-lg shadow-black/10">
        <button
          onClick={() => setActiveTab('matching')}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'matching'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
            : 'text-gray-300 hover:bg-white/5'}`}
        >
          Skill Matching
        </button>
        <button
          disabled
          title="Coming soon in next version!"
          style={{ cursor: 'not-allowed' }}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 opacity-60 grayscale cursor-not-allowed ${activeTab === 'projects'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
            : 'text-gray-300 hover:bg-white/5'}`}
        >
          Project Ideas
          {plan === 'pro' && <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">Pro</span>}
        </button>
        <button
          disabled
          title="Coming soon in next version!"
          style={{ cursor: 'not-allowed' }}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 opacity-60 grayscale cursor-not-allowed ${activeTab === 'roadmaps'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
            : 'text-gray-300 hover:bg-white/5'}`}
        >
          Learning Paths
          {plan === 'pro' && <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">Pro</span>}
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px] relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-40 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-5 pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-5 pointer-events-none"></div>
        {activeTab === 'matching' && (
          <div className="space-y-8 animate-fadeIn transition-all duration-500 ease-in-out">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <h2 className="text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Skills Analysis Complete
              </h2>

              <div className="backdrop-blur-lg bg-black/30 border border-white/10 rounded-2xl flex items-center gap-4 min-w-[220px]">
                <AnimatedCircularBar
                  percentage={matchPercentage}
                  size={80}
                  strokeWidth={13}
                  duration={1600}
                />
                <div>
                  <p className="text-gray-300 text-sm">Job Match Score</p>
                  <p className={`text-sm font-medium ${matchPercentage >= 70 ? 'text-green-400' : matchPercentage >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
                    {matchPercentage >= 70 ? 'Strong Match' : matchPercentage >= 40 ? 'Moderate Match' : 'Low Match'}
                  </p>
                </div>
              </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Matched Skills Card */}
              <div className="backdrop-blur-lg bg-black/20 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:translate-y-[-4px]">
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white">Matched Skills</h3>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 mb-4">
                    Your resume contains these skills that match the job requirements:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {results.matched.map((skill, index) => (
                      <SkillTag key={index} skill={skill} type="matched" />
                    ))}
                  </div>
                </div>

                <div className="text-gray-400 text-sm flex items-center mt-6 border-t border-white/10 pt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>
                    You matched <span className="font-bold text-green-400">{results.matched.length}</span> out of <span className="font-bold text-white">{results.matched.length + results.missing.length}</span> required skills
                  </span>
                </div>
              </div>

              {/* Missing Skills Card */}
              <div className="backdrop-blur-lg bg-black/20 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 hover:translate-y-[-4px]">
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white">Missing Skills</h3>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 mb-4">
                    Developing these skills would improve your job match significantly:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {results.missing.map((skill, index) => (
                      <SkillTag key={index} skill={skill} type="missing" />
                    ))}
                  </div>
                </div>

                <div className="text-gray-400 text-sm flex items-center mt-6 border-t border-white/10 pt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>
                    Focus on these <span className="font-bold text-amber-400">{results.missing.length}</span> missing skills to increase your chances
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="animate-fadeIn transition-all duration-500 ease-in-out">
            {plan === 'pro' ? (
              <div className="backdrop-blur-lg bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-10"></div>

                <div className="flex items-center mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-white">Recommended Projects</h3>
                </div>

                <p className="text-gray-300 mb-8 relative z-10">
                  Build these projects to develop the missing skills and make your resume stand out to employers:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {results.suggestions.map((suggestion, index) => {
                    const titleMatch = suggestion.match(/([^.!?]+[.!?])/);
                    const title = titleMatch ? titleMatch[0].trim() : `Project ${index + 1}`;
                    const description = suggestion.replace(title, '').trim();

                    const keywords = ['NextJS', 'GraphQL', 'React', 'AWS', 'CI/CD', 'Docker', 'TypeScript', 'Context API', 'API', 'Performance']
                      .filter(keyword => suggestion.includes(keyword));

                    return (
                      <div key={index} className="backdrop-blur-lg bg-gradient-to-br from-black/40 to-indigo-900/10 border border-indigo-500/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:translate-y-[-4px] flex flex-col h-full group">
                        <div className="h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                        <div className="p-5 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                {index + 1}
                              </div>
                              <h4 className="font-semibold text-white text-lg group-hover:text-indigo-300 transition-colors">
                                {title.length > 40 ? title.substring(0, 40) + '...' : title}
                              </h4>
                            </div>
                            <div className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                              Project
                            </div>
                          </div>

                          <p className="text-gray-300 mb-4 flex-grow">{description}</p>

                          {keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-white/10">
                              {keywords.slice(0, 3).map((keyword, i) => (
                                <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-indigo-300 border border-indigo-500/20">
                                  {keyword}
                                </span>
                              ))}
                              {keywords.length > 3 && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-indigo-300">
                                  +{keywords.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-8 relative z-10">
                  <p className="text-gray-400 text-sm">Building these projects will help you fill skill gaps and make your resume stand out.</p>
                  <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                    </svg>
                    Export as PDF
                  </button>
                </div>
              </div>
            ) : (
              <div className="backdrop-blur-lg bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-10"></div>

                <div className="flex items-center mb-5 relative z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white">Project Recommendations <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">Pro Feature</span></h3>
                </div>

                <p className="text-gray-300 mb-5 relative z-10">
                  Unlock personalized project recommendations based on your skill gaps. Build real-world projects that showcase your abilities and help you develop your missing skills.
                </p>

                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5 mb-6 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-300">Targeted projects to develop missing skills</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-300">Real-world portfolio pieces for employers</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-300">Projects matched to job market needs</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center relative z-10">
                  <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'roadmaps' && (
          <div className="animate-fadeIn transition-all duration-500 ease-in-out">
            <RoadmapRecommendation
              jobTitle={jobTitle}
              missingSkills={results.missing}
              plan={plan}
            />
          </div>
        )}
      </div>
    </div>
  );
}
