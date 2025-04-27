import { useState } from "react";

const FeedbackForm = ({ isOpen, onClose }: any) => {
    const [feedbackType, setFeedbackType] = useState('feature');
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Here you would handle the form submission, like sending to an API
      console.log('Feedback submitted:', { feedbackType, ...formData });
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      // Close modal
      onClose();
      // Show thank you message or notification
      alert('Thank you for your feedback! I appreciate your input as I build SkillSync in public.');
    };
    
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative max-w-lg w-full backdrop-blur-lg bg-black/50 border border-white/10 rounded-2xl p-6 shadow-xl">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h3 className="text-xl font-medium mb-6">Share Your Feedback</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-sm ${feedbackType === 'feature' ? 'bg-indigo-500/30 text-indigo-300' : 'bg-white/5 text-gray-400'}`}
                onClick={() => setFeedbackType('feature')}
              >
                Feature Request
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-sm ${feedbackType === 'bug' ? 'bg-indigo-500/30 text-indigo-300' : 'bg-white/5 text-gray-400'}`}
                onClick={() => setFeedbackType('bug')}
              >
                Bug Report
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-sm ${feedbackType === 'improvement' ? 'bg-indigo-500/30 text-indigo-300' : 'bg-white/5 text-gray-400'}`}
                onClick={() => setFeedbackType('improvement')}
              >
                Improvement Idea
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name" 
                  className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com" 
                  className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Your Feedback</label>
              {/* <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your thoughts, ideas, or issues..."
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                required
              /> */}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-600/20 transition-all"
              >
                Submit Feedback
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };


  export default FeedbackForm;
