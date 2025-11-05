import { useState } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import OwnershipSection from './components/OwnershipSection'
import OwnershipTypesSection from './components/OwnershipTypesSection'
import DistributionSection from './components/DistributionSection'
import MarketBalanceSection from './components/MarketBalanceSection'
import TimelineSection from './components/TimelineSection'
import CaseStudySection from './components/CaseStudySection'
import MiniGameSection from './components/MiniGameSection'
import ReferencesSection from './components/ReferencesSection'
import BackgroundMusic from './components/BackgroundMusic'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Tab 1: Trang Chủ */}
      {activeTab === 'home' && (
        <div className="home-content">
          <HeroSection setActiveTab={setActiveTab} />
          <OwnershipSection />
          <OwnershipTypesSection />
          <DistributionSection />
          <MarketBalanceSection />
          <TimelineSection />
        </div>
      )}

      {/* Tab 2: Case Study */}
      {activeTab === 'case-study' && (
        <div className="case-study-content pt-20">
          <CaseStudySection setActiveTab={setActiveTab} />
        </div>
      )}

      {/* Tab 3: Mini Game */}
      {activeTab === 'minigame' && (
        <div className="minigame-content">
          <MiniGameSection setActiveTab={setActiveTab} />
        </div>
      )}

      {/* Tab 4: AI & References */}
      {activeTab === 'references' && (
        <div className="references-content">
          <ReferencesSection />
        </div>
      )}

      {/* Footer - shown on all tabs */}
      <Footer setActiveTab={setActiveTab} />

      {/* Background Music Controller */}
      <BackgroundMusic />
    </div>
  )
}

export default App
