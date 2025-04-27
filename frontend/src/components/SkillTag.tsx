import React from 'react';

interface SkillTagProps {
  skill: string;
  type: 'matched' | 'missing';
}

export default function SkillTag({ skill, type }: SkillTagProps) {
  return (
    <span 
      className={`
        inline-flex items-center px-3 py-1.5 m-1 rounded-full text-sm font-medium backdrop-blur-sm 
        transition-all duration-300 hover:scale-105 hover:shadow-md 
        ${type === 'matched' 
          ? 'bg-green-500/10 text-green-300 border border-green-500/20 hover:shadow-green-500/10' 
          : 'bg-red-500/10 text-red-300 border border-red-500/20 hover:shadow-red-500/10'
        }
      `}
    >
      {type === 'matched' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
      {type === 'missing' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )}
      {skill}
    </span>
  );
}
