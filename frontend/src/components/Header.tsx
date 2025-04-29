import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="relative z-10 px-6 py-6">
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


          <nav className="hidden md:flex items-center gap-8">
            {/* <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a> */}
            <a href="#feedback" className="text-gray-300 hover:text-white transition-colors">Roadmap</a>
            <a href="#share-ideas" className="text-gray-300 hover:text-white transition-colors">Feedback</a>
            <a href="#support" className="text-gray-300 hover:text-white transition-colors">Support</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/app" className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-purple-600/20 transition-all">
              Try It Now
            </Link>
          </div>
        </div>
      </header>
  );
}
