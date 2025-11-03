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
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Tab 1: Trang Chủ */}
      {activeTab === 'home' && (
        <div className="home-content">
          <HeroSection />
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
          <CaseStudySection />
        </div>
      )}

      {/* Tab 3: Mini Game */}
      {activeTab === 'minigame' && (
        <div className="minigame-content">
          <MiniGameSection setActiveTab={setActiveTab} />
        </div>
      )}
      
      {/* 
        TODO: Thêm các section tiếp theo:
        - Footer với thông tin liên hệ, tài liệu tham khảo
      */}
    </div>
  )
}

export default App
