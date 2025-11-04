import { Home, FileText, Gamepad2 } from 'lucide-react';
import './Navigation.css';

const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="main-navigation fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="logo-container flex items-center gap-3">
            <div className="logo-icon w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
              <img 
                src="/images/logo.png" 
                alt="Marx to Vietnam Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="logo-text hidden md:block">
              <h1 className="text-white font-bold text-lg leading-tight">
                Marx → Việt Nam
              </h1>
              <p className="text-smoke-gray text-xs">
                Sở hữu & Phân phối
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tabs-container flex gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`}
            >
              <Home className="w-5 h-5" />
              <span>Trang Chủ</span>
            </button>
            
            <button
              onClick={() => setActiveTab('case-study')}
              className={`nav-tab ${activeTab === 'case-study' ? 'active' : ''}`}
            >
              <FileText className="w-5 h-5" />
              <span>Case Study</span>
            </button>

            <button
              onClick={() => setActiveTab('minigame')}
              className={`nav-tab ${activeTab === 'minigame' ? 'active' : ''}`}
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Mini Game</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
