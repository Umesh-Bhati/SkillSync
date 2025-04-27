import React from 'react';

interface RoadmapRecommendationProps {
  jobTitle: string;
  missingSkills: string[];
  plan?: 'free' | 'pro';
}

// Map job titles to relevant roadmap.sh paths
const getRoadmapPath = (jobTitle: string): { url: string; title: string } => {
  const title = jobTitle.toLowerCase();
  
  if (title.includes('front') || title.includes('ui') || title.includes('ux')) {
    return {
      url: 'https://roadmap.sh/frontend',
      title: 'Frontend Developer'
    };
  } else if (title.includes('react')) {
    return {
      url: 'https://roadmap.sh/react',
      title: 'React Developer'
    };
  } else if (title.includes('back') || title.includes('node') || title.includes('api')) {
    return {
      url: 'https://roadmap.sh/backend',
      title: 'Backend Developer'
    };
  } else if (title.includes('full') || title.includes('stack')) {
    return {
      url: 'https://roadmap.sh/full-stack',
      title: 'Full Stack Developer'
    };
  } else if (title.includes('devops') || title.includes('cloud') || title.includes('aws')) {
    return {
      url: 'https://roadmap.sh/devops',
      title: 'DevOps Engineer'
    };
  } else {
    return {
      url: 'https://roadmap.sh',
      title: 'Technology Roadmaps'
    };
  }
};

// Get roadmap recommendations based on missing skills
const getSkillRoadmaps = (missingSkills: string[]) => {
  const recommendations: { url: string; title: string; relevantSkills: string[] }[] = [];
  
  // Check for different skill categories
  const normalizedSkills = missingSkills.map(skill => skill.toLowerCase());
  
  if (normalizedSkills.some(skill => 
      skill.includes('javascript') || 
      skill.includes('html') || 
      skill.includes('css') ||
      skill.includes('frontend') ||
      skill.includes('front-end'))) {
    recommendations.push({
      url: 'https://roadmap.sh/javascript',
      title: 'JavaScript Roadmap',
      relevantSkills: missingSkills.filter(skill => 
        skill.toLowerCase().includes('javascript') ||
        skill.toLowerCase().includes('js')
      )
    });
  }
  
  if (normalizedSkills.some(skill => 
      skill.includes('react') || 
      skill.includes('redux') ||
      skill.includes('hooks'))) {
    recommendations.push({
      url: 'https://roadmap.sh/react',
      title: 'React Roadmap',
      relevantSkills: missingSkills.filter(skill => 
        skill.toLowerCase().includes('react') ||
        skill.toLowerCase().includes('redux') ||
        skill.toLowerCase().includes('component')
      )
    });
  }
  
  if (normalizedSkills.some(skill => 
      skill.includes('node') || 
      skill.includes('express') ||
      skill.includes('backend') ||
      skill.includes('back-end') ||
      skill.includes('api'))) {
    recommendations.push({
      url: 'https://roadmap.sh/nodejs',
      title: 'Node.js Roadmap',
      relevantSkills: missingSkills.filter(skill => 
        skill.toLowerCase().includes('node') ||
        skill.toLowerCase().includes('express') ||
        skill.toLowerCase().includes('api') ||
        skill.toLowerCase().includes('backend')
      )
    });
  }
  
  if (normalizedSkills.some(skill => 
      skill.includes('devops') || 
      skill.includes('aws') ||
      skill.includes('docker') ||
      skill.includes('kubernetes') ||
      skill.includes('ci/cd'))) {
    recommendations.push({
      url: 'https://roadmap.sh/devops',
      title: 'DevOps Roadmap',
      relevantSkills: missingSkills.filter(skill => 
        skill.toLowerCase().includes('devops') ||
        skill.toLowerCase().includes('aws') ||
        skill.toLowerCase().includes('docker') ||
        skill.toLowerCase().includes('ci/cd') ||
        skill.toLowerCase().includes('pipeline')
      )
    });
  }
  
  return recommendations;
};

const RoadmapRecommendation: React.FC<RoadmapRecommendationProps> = ({ 
  jobTitle, 
  missingSkills,
  plan
}) => {
  const roadmapPath = getRoadmapPath(jobTitle);
  const skillRoadmaps = getSkillRoadmaps(missingSkills);
  
  if (plan === 'free') {
    return (
      <div className="backdrop-blur-lg bg-black/20 border border-white/10 rounded-2xl p-6 transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-600/40 to-purple-600/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white/70">Learning Roadmaps</h3>
        </div>
        <p className="text-gray-400 mb-4">Unlock personalized learning paths based on the roadmap.sh technology guides.</p>
        <div className="flex justify-center">
          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Upgrade to Pro
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="backdrop-blur-lg bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
      
      <div className="h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 absolute top-0 left-0 right-0"></div>
      
      <div className="flex items-center justify-between mb-5 relative z-10 mt-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-600/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-medium text-white">Developer Roadmaps</h3>
            <p className="text-indigo-300 text-sm">Structured learning paths from roadmap.sh</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20">Pro Feature</span>
      </div>
      
      <div className="relative z-10">
        <div className="mb-8">
          <p className="text-gray-300 mb-4">Based on your job target, we recommend this primary learning path:</p>
          <a 
            href={roadmapPath.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 backdrop-blur-sm bg-gradient-to-br from-white/5 to-indigo-500/5 border border-white/10 rounded-xl p-5 transition-all duration-300 hover:bg-white/10 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 hover:translate-y-[-4px] group"
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-indigo-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" />
              </svg>
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold text-lg group-hover:text-indigo-300 transition-colors">{roadmapPath.title} Roadmap</p>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">Primary Path</span>
              </div>
              <p className="text-gray-300 text-sm mt-1">Complete learning path for {roadmapPath.title.toLowerCase()} roles with step-by-step guides</p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500/10 group-hover:bg-indigo-500/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </a>
        </div>
        
        {skillRoadmaps.length > 0 && (
          <div>
          <p className="text-gray-300 mb-4">Focus on these key skills based on your missing requirements:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillRoadmaps.map((skill, index) => {
              // Extract related skills (would be more dynamic in a real app)
              const relatedSkills = [
                'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Redux', 'NextJS', 'GraphQL', 'REST API',
                'Node.js', 'MongoDB', 'SQL', 'Docker', 'AWS', 'Firebase'
              ].filter((_, i) => i % (index + 3) === 0).slice(0, 2);
              
              return (
                <a
                  key={index}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="backdrop-blur-sm bg-gradient-to-br from-white/5 to-indigo-500/5 border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 hover:translate-y-[-3px] group flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md shadow-indigo-600/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <p className="text-white font-medium text-lg group-hover:text-indigo-300 transition-colors">{skill.title}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-500/10 group-hover:bg-indigo-500/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-3">Enhance your knowledge in {skill.title.toLowerCase()} to improve job matching.</p>
                  
                  {relatedSkills.length > 0 && (
                    <div className="mt-auto pt-2 border-t border-white/10 flex flex-wrap gap-2">
                      {relatedSkills.map((relSkill, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-indigo-300 border border-indigo-500/20">
                          {relSkill}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-2">Powered by roadmap.sh</p>
          <a 
            href="https://roadmap.sh" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors inline-flex items-center gap-1"
          >
            Visit roadmap.sh
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RoadmapRecommendation;
