import React from 'react';

interface PlanBannerProps {
  plan: 'free' | 'pro';
  onUpgrade?: () => void;
}

export default function PlanBanner({ plan, onUpgrade }: PlanBannerProps) {
  return (
    <div className={`relative rounded-2xl backdrop-blur-lg border overflow-hidden ${plan === 'free' 
      ? 'bg-black/20 border-white/10' 
      : 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30'}`}
    >
      {/* Glow effect for pro plan */}
      {plan === 'pro' && (
        <div className="absolute -top-24 -right-24 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
      )}
      
      <div className="p-6 relative z-10">
        {plan === 'free' ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white">
                  Free Plan
                </div>
                <span className="text-gray-400 text-sm">1 analysis per day</span>
              </div>
              <p className="text-gray-300">Upgrade to get unlimited analyses and project suggestions</p>
            </div>
            <button 
              className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20" 
              onClick={onUpgrade}
            >
              Upgrade to Pro
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  Pro Plan
                </div>
                <span className="text-indigo-300 text-sm">Unlimited Access</span>
              </div>
              <p className="text-gray-300">You have access to all premium features including project suggestions</p>
            </div>
            <div className="mt-4 sm:mt-0 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-indigo-300">
              Active
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
