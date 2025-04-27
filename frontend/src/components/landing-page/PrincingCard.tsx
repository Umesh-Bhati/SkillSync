const PricingCard = ({ name, price, features, isPopular, ctaText, ctaAction }: any) => {
    return (
      <div className={`backdrop-blur-lg bg-white/5 border ${isPopular ? 'border-purple-500/50' : 'border-white/10'} rounded-2xl p-8 flex flex-col relative transition-all duration-300 hover:border-purple-500/30 hover:scale-105`}>
        {isPopular && (
          <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-sm font-medium">
            Most Popular
          </div>
        )}
        
        <h3 className="text-2xl font-medium mb-2">{name}</h3>
        <div className="mb-6">
          <span className="text-3xl font-bold">${price}</span>
          {price > 0 && <span className="text-gray-400 ml-1">/month</span>}
        </div>
        
        <ul className="space-y-4 mb-8 flex-grow">
          {features.map((feature: any, i: any) => (
            <li key={i} className="flex items-start">
              <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <button 
          onClick={ctaAction}
          className={`w-full py-3 rounded-lg ${isPopular 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-purple-900/30 hover:shadow-xl hover:shadow-purple-900/40' 
            : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'} transition-all duration-300`}
        >
          {ctaText}
        </button>
      </div>
    );
  };

  export default PricingCard;