import { useState } from "react";

const FeedbackBoard = () => {
    // Mock feedback data - in a real app, this would come from your backend
    const [feedbackItems] = useState([
      {
        id: 1,
        type: 'feature',
        author: 'Alex Morgan',
        date: '3 days ago',
        content: 'It would be great to have a feature that compares my skills against industry benchmarks for different roles!',
        upvotes: 24,
        status: 'under-review'
      },
      {
        id: 2,
        type: 'bug',
        author: 'Jamie Lewis',
        date: '5 days ago',
        content: 'I noticed that some skills aren\'t being recognized when I upload my PDF resume, especially for technical skills with special characters.',
        upvotes: 17,
        status: 'planned'
      },
      {
        id: 3,
        type: 'improvement',
        author: 'Sam Chen',
        date: '1 week ago',
        content: 'The skills analysis is great, but I\'d love to see more detailed recommendations on courses or resources to improve specific skills.',
        upvotes: 42,
        status: 'in-progress'
      },
    ]);
    
    // Status badge component
    const StatusBadge = ({ status }:any) => {
      const statusConfig: any = {
        'under-review': { color: 'bg-yellow-500/20 text-yellow-300', label: 'Under Review' },
        'planned': { color: 'bg-blue-500/20 text-blue-300', label: 'Planned' },
        'in-progress': { color: 'bg-green-500/20 text-green-300', label: 'In Progress' },
        'implemented': { color: 'bg-purple-500/20 text-purple-300', label: 'Implemented' },
      };
      
      const config = statusConfig[status] || statusConfig['under-review'];
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${config.color}`}>
          {config.label}
        </span>
      );
    };
    
    return (
      <div className="space-y-4">
        {feedbackItems.map(item => (
          <div 
            key={item.id} 
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <button className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <span className="text-sm font-medium mt-1">{item.upvotes}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.type === 'feature' && (
                    <span className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
                      Feature Request
                    </span>
                  )}
                  {item.type === 'bug' && (
                    <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-300 text-xs">
                      Bug Report
                    </span>
                  )}
                  {item.type === 'improvement' && (
                    <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">
                      Improvement
                    </span>
                  )}
                  
                  <StatusBadge status={item.status} />
                </div>
                
                <p className="mb-2">{item.content}</p>
                
                <div className="flex items-center text-sm text-gray-400">
                  <span>{item.author}</span>
                  <span className="mx-2">•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };


  export default FeedbackBoard;