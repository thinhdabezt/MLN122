import { useState, useEffect, useRef } from 'react';
import './SurplusHunterGame.css';

const SurplusHunterGame = ({ onClose }) => {
  // Core game state
  const [selectedIndustry, setSelectedIndustry] = useState('textile');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [cycleCount, setCycleCount] = useState(0);
  
  // Economic metrics
  const [workers, setWorkers] = useState(20);
  const [wage, setWage] = useState(50);
  const [machineRatio, setMachineRatio] = useState(30);
  const [workSpeed, setWorkSpeed] = useState(100);
  const [accumulatedCapital, setAccumulatedCapital] = useState(1000);
  const [totalSurplus, setTotalSurplus] = useState(0);
  
  // Calculated values (per cycle)
  const [productionValue, setProductionValue] = useState(0);
  const [laborCost, setLaborCost] = useState(0);
  const [surplusValue, setSurplusValue] = useState(0);
  const [inequality, setInequality] = useState(0);
  
  // Dynamic metrics
  const [employmentRate, setEmploymentRate] = useState(100);
  const [environmentalCost, setEnvironmentalCost] = useState(0);
  const [workerSatisfaction, setWorkerSatisfaction] = useState(70);
  
  // Reinvestment system
  const [showReinvestModal, setShowReinvestModal] = useState(false);
  const [pendingSurplus, setPendingSurplus] = useState(0);
  const [technologyLevel, setTechnologyLevel] = useState(1);
  const [trainingLevel, setTrainingLevel] = useState(1);
  const [welfareLevel, setWelfareLevel] = useState(1);
  
  // State policy
  const [taxRate, setTaxRate] = useState(15);
  const [minWage, setMinWage] = useState(30);
  const [socialInsurance, setSocialInsurance] = useState(5);
  const [statePenalty, setStatePenalty] = useState(0);
  const [showPolicyWarning, setShowPolicyWarning] = useState(false);
  const [policyWarningMessage, setPolicyWarningMessage] = useState('');
  
  // UI states
  const [showIntro, setShowIntro] = useState(true);
  const [showIndustrySelect, setShowIndustrySelect] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiComment, setAiComment] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [gameLog, setGameLog] = useState([]);
  const [score, setScore] = useState(0);
  const [ranking, setRanking] = useState('');

  // Refs
  const timerRef = useRef(null);
  const cycleRef = useRef(null);
  
  // Industry definitions
  const INDUSTRIES = {
    textile: {
      name: '🧵 Dệt may',
      baseProductivity: 8,
      laborIntensity: 1.2,
      capitalIntensity: 0.8,
      environmentalImpact: 0.3,
      riskFactor: 0.1
    },
    tech: {
      name: '💻 Công nghệ AI',
      baseProductivity: 15,
      laborIntensity: 0.6,
      capitalIntensity: 1.5,
      environmentalImpact: 0.1,
      riskFactor: 0.3
    },
    agriculture: {
      name: '🌾 Nông nghiệp',
      baseProductivity: 6,
      laborIntensity: 1.5,
      capitalIntensity: 0.5,
      environmentalImpact: 0.4,
      riskFactor: 0.2
    },
    energy: {
      name: '⚡ Năng lượng',
      baseProductivity: 12,
      laborIntensity: 0.7,
      capitalIntensity: 1.8,
      environmentalImpact: 0.8,
      riskFactor: 0.15
    }
  };

  const industry = INDUSTRIES[selectedIndustry];

  // Add log entry
  const addLog = (message, type = 'info') => {
    setGameLog(prev => [...prev, { 
      message, 
      type, 
      time: cycleCount,
      timestamp: Date.now() 
    }].slice(-10)); // Keep last 10 logs
  };

  // Timer countdown
  useEffect(() => {
    if (gameStarted && !gameEnded && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStarted, gameEnded, timeRemaining]);

  // Production cycle (every 5 seconds)
  useEffect(() => {
    if (gameStarted && !gameEnded) {
      cycleRef.current = setInterval(() => {
        runProductionCycle();
      }, 5000);
    }
    
    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [gameStarted, gameEnded, workers, wage, machineRatio, workSpeed, 
      technologyLevel, trainingLevel, welfareLevel, taxRate, socialInsurance]);

  // Core production calculation
  const runProductionCycle = () => {
    // Check wage violations
    if (wage < minWage) {
      const penalty = (minWage - wage) * workers * 0.5;
      setStatePenalty(prev => prev + penalty);
      setShowPolicyWarning(true);
      setPolicyWarningMessage(`⚠️ Vi phạm lương tối thiểu! Phạt $${Math.round(penalty)}`);
      addLog(`Vi phạm lương tối thiểu - Phạt $${Math.round(penalty)}`, 'error');
      
      setTimeout(() => setShowPolicyWarning(false), 3000);
    }

    // Calculate employment rate
    const maxWorkers = 50;
    const automationUnemployment = (machineRatio / 100) * 30;
    const employmentValue = Math.max(50, 100 - automationUnemployment);
    setEmploymentRate(employmentValue);

    // Worker satisfaction
    let satisfaction = 50;
    satisfaction += (wage / 100) * 30; // Wage impact
    satisfaction += welfareLevel * 5; // Welfare impact
    satisfaction -= (workSpeed > 120 ? (workSpeed - 120) * 0.3 : 0); // Overwork penalty
    satisfaction -= (machineRatio > 60 ? (machineRatio - 60) * 0.2 : 0); // Job insecurity
    setWorkerSatisfaction(Math.min(100, Math.max(0, satisfaction)));

    // Worker turnover (if satisfaction too low)
    let effectiveWorkers = workers;
    if (satisfaction < 30) {
      effectiveWorkers = Math.max(1, workers - Math.floor((30 - satisfaction) / 10));
      addLog(`Công nhân bỏ việc! Chỉ còn ${effectiveWorkers}/${workers}`, 'warning');
    }

    // Production value with industry multipliers
    const efficiencyFactor = (workSpeed / 100) * (1 + technologyLevel * 0.1) * (1 + trainingLevel * 0.05);
    const baseProduction = (effectiveWorkers * industry.baseProductivity * industry.laborIntensity + 
                           (machineRatio / 100) * 500 * industry.capitalIntensity) * efficiencyFactor;
    
    // Risk factor (random events)
    const riskMultiplier = Math.random() < industry.riskFactor ? 0.7 : 1;
    const production = baseProduction * riskMultiplier;

    if (riskMultiplier < 1) {
      addLog(`Rủi ro ngành ${industry.name}: Giảm 30% sản lượng`, 'warning');
    }

    // Labor cost
    const laborCostValue = effectiveWorkers * wage;

    // Machine depreciation
    const machineDepreciation = (machineRatio / 100) * 200 * 0.1;

    // Environmental cost
    const envCost = production * industry.environmentalImpact * (1 - welfareLevel * 0.1);
    setEnvironmentalCost(prev => prev + envCost);

    // Social insurance cost
    const insuranceCost = effectiveWorkers * (socialInsurance / 100) * wage;

    // Total costs
    const totalCost = laborCostValue + machineDepreciation + envCost + insuranceCost;

    // Surplus before tax
    const surplusBeforeTax = production - totalCost;
    
    // Tax
    const tax = surplusBeforeTax > 0 ? surplusBeforeTax * (taxRate / 100) : 0;
    
    // Final surplus
    const surplus = surplusBeforeTax - tax - statePenalty;

    // Inequality calculation
    let inequalityValue = 0;
    if (laborCostValue > 0) {
      inequalityValue = Math.min(100, (surplus / (laborCostValue + 1)) * 10);
    }
    if (machineRatio > 50) inequalityValue += (machineRatio - 50) * 0.5;
    if (wage < 40) inequalityValue += (40 - wage) * 0.8;
    inequalityValue = Math.min(100, Math.max(0, inequalityValue));

    // State intervention on high inequality
    if (inequalityValue > 80) {
      const interventionPenalty = (inequalityValue - 80) * 10;
      setStatePenalty(prev => prev + interventionPenalty);
      setShowPolicyWarning(true);
      setPolicyWarningMessage(`🚨 Nhà nước can thiệp: Bất bình đẳng quá cao! Phạt $${Math.round(interventionPenalty)}`);
      addLog(`Nhà nước can thiệp - Phạt $${Math.round(interventionPenalty)}`, 'error');
      
      setTimeout(() => setShowPolicyWarning(false), 3000);
    }

    // Update state
    setProductionValue(Math.round(production));
    setLaborCost(Math.round(laborCostValue));
    setSurplusValue(Math.round(surplus));
    setInequality(Math.round(inequalityValue));
    setTotalSurplus(prev => prev + surplus);
    setAccumulatedCapital(prev => prev + surplus);
    setCycleCount(prev => prev + 1);

    // Reset penalty for next cycle
    setStatePenalty(0);

    // Log cycle
    addLog(`Chu kỳ ${cycleCount + 1}: Thặng dư $${Math.round(surplus)}`, 
           surplus > 0 ? 'success' : 'error');

    // Show reinvestment option every 3 cycles if profitable
    if ((cycleCount + 1) % 3 === 0 && surplus > 100) {
      setPendingSurplus(surplus);
      setShowReinvestModal(true);
    }
  };

  // Reinvestment handler
  const handleReinvestment = (choice) => {
    const investAmount = pendingSurplus * 0.5; // Invest 50% of surplus
    
    switch(choice) {
      case 'technology':
        setTechnologyLevel(prev => prev + 0.2);
        addLog(`Đầu tư công nghệ: +$${Math.round(investAmount)}`, 'success');
        break;
      case 'training':
        setTrainingLevel(prev => prev + 0.2);
        addLog(`Đào tạo lao động: +$${Math.round(investAmount)}`, 'success');
        break;
      case 'welfare':
        setWelfareLevel(prev => prev + 0.2);
        addLog(`Phúc lợi xã hội: +$${Math.round(investAmount)}`, 'success');
        break;
      default:
        break;
    }
    
    setAccumulatedCapital(prev => prev - investAmount);
    setShowReinvestModal(false);
  };

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setTimeRemaining(45);
    setCycleCount(0);
    setTotalSurplus(0);
    setAccumulatedCapital(1000);
    setGameLog([]);
    setStatePenalty(0);
    setTechnologyLevel(1);
    setTrainingLevel(1);
    setWelfareLevel(1);
    setEnvironmentalCost(0);
    addLog(`Bắt đầu: ${industry.name}`, 'info');
  };

  // End game
  const endGame = () => {
    setGameEnded(true);
    setGameStarted(false);
    
    if (timerRef.current) clearInterval(timerRef.current);
    if (cycleRef.current) clearInterval(cycleRef.current);

    // Calculate final score
    let finalScore = 50;
    
    if (totalSurplus > 2000) finalScore += 20;
    if (inequality < 50) finalScore += 15;
    if (employmentRate > 80) finalScore += 10;
    if (workerSatisfaction > 70) finalScore += 10;
    if (environmentalCost < 500) finalScore += 10;
    if (totalSurplus < 0) finalScore -= 20;
    if (inequality > 80) finalScore -= 15;
    
    finalScore = Math.min(100, Math.max(0, finalScore));
    
    let rank = '';
    if (finalScore >= 80) rank = 'Nhà sản xuất lý tưởng – hướng XHCN';
    else if (finalScore >= 50) rank = 'Nhà tư bản cải cách';
    else rank = 'Kẻ bóc lột vô sản điển hình';
    
    setScore(finalScore);
    setRanking(rank);
    
    addLog(`Kết thúc game! Điểm: ${finalScore}/100`, 'info');
  };

  // AI Analysis
  const getAIAnalysis = async () => {
    setIsLoadingAI(true);
    setShowAIModal(true);
    
    const prompt = `Bạn là chuyên gia kinh tế Marxist. Phân tích kết quả mô phỏng nhà máy ${industry.name}:

📊 TỔNG KẾT 45 GIÂY:
- Ngành sản xuất: ${industry.name}
- Số chu kỳ: ${cycleCount}
- Tổng giá trị thặng dư: $${Math.round(totalSurplus)}
- Vốn tích lũy: $${Math.round(accumulatedCapital)}

💼 THÔNG SỐ CUỐI CÙNG:
- Công nhân: ${workers} người
- Lương: $${wage}
- Tự động hóa: ${machineRatio}%
- Tỷ lệ việc làm: ${Math.round(employmentRate)}%
- Hài lòng công nhân: ${Math.round(workerSatisfaction)}%

🌍 TÁC ĐỘNG:
- Bất bình đẳng: ${inequality}%
- Chi phí môi trường: $${Math.round(environmentalCost)}
- Đầu tư công nghệ: x${technologyLevel.toFixed(1)}
- Đào tạo: x${trainingLevel.toFixed(1)}
- Phúc lợi: x${welfareLevel.toFixed(1)}

🎯 Kết quả: ${ranking} (${score}/100 điểm)

Hãy phân tích (4-5 câu):
1. Đánh giá chiến lược tích lũy tư bản và tái đầu tư
2. Tác động của tự động hóa lên thị trường lao động
3. Cân bằng giữa lợi nhuận, môi trường và xã hội
4. Vai trò của chính sách nhà nước (thuế ${taxRate}%, lương tối thiểu $${minWage})

Phong cách: Phê phán Marxist nhưng khuyến khích cải thiện.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_API_KEY_G2}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      if (!response.ok) throw new Error('API call failed');

      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;
      setAiComment(aiText);
    } catch (error) {
      console.error('AI Error:', error);
      
      // Fallback
      let fallback = `🎮 **Kết quả mô phỏng ${industry.name}**\n\n`;
      
      if (totalSurplus > 2000 && inequality < 50) {
        fallback += `✅ **Xuất sắc!** Bạn đã đạt được sự cân bằng tuyệt vời trong ${cycleCount} chu kỳ. Tổng thặng dư $${Math.round(totalSurplus)} cho thấy hiệu quả kinh tế cao, trong khi mức bất bình đẳng ${inequality}% và hài lòng công nhân ${Math.round(workerSatisfaction)}% thể hiện công bằng xã hội. Đầu tư vào công nghệ (x${technologyLevel.toFixed(1)}) và phúc lợi (x${welfareLevel.toFixed(1)}) là chiến lược đúng đắn của XHCN.`;
      } else if (totalSurplus > 3000 && inequality > 80) {
        fallback += `⚠️ **Bóc lột cao!** Lợi nhuận $${Math.round(totalSurplus)} ấn tượng nhưng đạt được bằng cách: lương $${wage} thấp, tự động hóa ${machineRatio}% cao gây thất nghiệp (việc làm chỉ ${Math.round(employmentRate)}%), và bất bình đẳng ${inequality}%. Theo Marx, đây là "tích lũy nguyên thủy" điển hình - chiếm đoạt giá trị thặng dư từ lao động. Chi phí môi trường $${Math.round(environmentalCost)} càng cho thấy sự bất bền vững.`;
      } else if (totalSurplus < 500) {
        fallback += `📉 **Hiệu quả thấp!** Chỉ $${Math.round(totalSurplus)} sau ${cycleCount} chu kỳ. Mặc dù lương $${wage} và phúc lợi x${welfareLevel.toFixed(1)} tốt, nhưng năng suất không đủ. Trong XHCN, cần cân bằng: đầu tư công nghệ để tăng năng suất ĐỒNG THỜI đảm bảo việc làm. Tự động hóa ${machineRatio}% hiện tại ${machineRatio > 50 ? 'quá cao' : 'chưa đủ'}.`;
      } else {
        fallback += `🤔 **Cần cải thiện!** Trong ${cycleCount} chu kỳ, bạn tạo ra $${Math.round(totalSurplus)} với ${industry.name}. Tỷ lệ việc làm ${Math.round(employmentRate)}% và hài lòng ${Math.round(workerSatisfaction)}% cho thấy thị trường lao động ${employmentRate < 80 ? 'đang gặp khó khăn' : 'ổn định'}. Bất bình đẳng ${inequality}% ${inequality > 60 ? 'cao' : 'chấp nhận được'}. Hãy thử tăng đầu tư đào tạo (hiện x${trainingLevel.toFixed(1)}) để nâng cao năng suất bền vững.`;
      }
      
      setAiComment(fallback);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const resetGame = () => {
    setShowIntro(true);
    setShowIndustrySelect(false);
    setGameStarted(false);
    setGameEnded(false);
    setWorkers(20);
    setWage(50);
    setMachineRatio(30);
    setWorkSpeed(100);
    setShowAIModal(false);
  };

  // INTRO SCREEN
  if (showIntro) {
    return (
      <div className="game-overlay">
        <div className="game-container surplus-intro">
          <button className="game-close-btn" onClick={onClose}>✕</button>
          
          <h2 className="game-title">💰 Lao Động & Giá Trị Thặng Dư v2.0</h2>
          <h3 className="game-subtitle">Surplus Hunter - 45 Second Simulation</h3>
          
          <div className="intro-content">
            <div className="intro-section">
              <h4>🆕 Phiên bản 2.0 - Mô phỏng thời gian thực!</h4>
              <p>Game kéo dài <strong>45 giây</strong>, mỗi chu kỳ sản xuất <strong>5 giây</strong>.</p>
            </div>

            <div className="intro-section">
              <h4>🏭 Tính năng mới:</h4>
              <ul>
                <li>🧵 <strong>4 ngành sản xuất:</strong> Dệt may, AI, Nông nghiệp, Năng lượng</li>
                <li>💰 <strong>Tái đầu tư:</strong> Công nghệ, Đào tạo, Phúc lợi (mỗi 3 chu kỳ)</li>
                <li>🌍 <strong>Chi phí ngoại lai:</strong> Ô nhiễm môi trường</li>
                <li>👷 <strong>Thị trường lao động động:</strong> Công nhân bỏ việc nếu lương thấp</li>
                <li>🏛️ <strong>Chính sách nhà nước:</strong> Thuế, lương tối thiểu, bảo hiểm xã hội</li>
              </ul>
            </div>

            <div className="intro-section">
              <h4>🎯 Mục tiêu:</h4>
              <p>Tối đa hóa giá trị thặng dư trong 45s ĐỒNG THỜI duy trì:</p>
              <ul>
                <li>✅ Tỷ lệ việc làm &gt; 80%</li>
                <li>✅ Hài lòng công nhân &gt; 70%</li>
                <li>✅ Bất bình đẳng &lt; 50%</li>
                <li>✅ Chi phí môi trường thấp</li>
              </ul>
            </div>

            <div className="intro-section warning">
              <h4>⚠️ Nhà nước sẽ can thiệp nếu:</h4>
              <ul>
                <li>💵 Lương &lt; Lương tối thiểu ($30) → Phạt!</li>
                <li>📊 Bất bình đẳng &gt; 80% → Phạt nặng!</li>
              </ul>
            </div>
          </div>

          <button 
            className="game-start-btn" 
            onClick={() => {
              setShowIntro(false);
              setShowIndustrySelect(true);
            }}
          >
            ▶ Chọn ngành sản xuất
          </button>
        </div>
      </div>
    );
  }

  // INDUSTRY SELECTION
  if (showIndustrySelect) {
    return (
      <div className="game-overlay">
        <div className="game-container industry-select">
          <button className="game-close-btn" onClick={onClose}>✕</button>
          
          <h2 className="game-title">🏭 Chọn Ngành Sản Xuất</h2>
          <p className="industry-subtitle">Mỗi ngành có đặc tính riêng về năng suất, chi phí và rủi ro</p>

          <div className="industry-grid">
            {Object.entries(INDUSTRIES).map(([key, ind]) => (
              <div 
                key={key}
                className={`industry-card ${selectedIndustry === key ? 'selected' : ''}`}
                onClick={() => setSelectedIndustry(key)}
              >
                <div className="industry-icon">{ind.name.split(' ')[0]}</div>
                <h3>{ind.name}</h3>
                <div className="industry-stats">
                  <div className="stat">
                    <span className="stat-label">Năng suất:</span>
                    <div className="stat-bar">
                      <div style={{width: `${(ind.baseProductivity / 15) * 100}%`}}></div>
                    </div>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Cần lao động:</span>
                    <div className="stat-bar">
                      <div style={{width: `${(ind.laborIntensity / 1.5) * 100}%`}}></div>
                    </div>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Cần vốn:</span>
                    <div className="stat-bar">
                      <div style={{width: `${(ind.capitalIntensity / 1.8) * 100}%`}}></div>
                    </div>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Ô nhiễm:</span>
                    <div className="stat-bar danger">
                      <div style={{width: `${(ind.environmentalImpact / 0.8) * 100}%`}}></div>
                    </div>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Rủi ro:</span>
                    <div className="stat-bar warning">
                      <div style={{width: `${(ind.riskFactor / 0.3) * 100}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="game-start-btn" 
            onClick={() => {
              setShowIndustrySelect(false);
              startGame();
            }}
          >
            ▶ Bắt đầu sản xuất: {INDUSTRIES[selectedIndustry].name}
          </button>
        </div>
      </div>
    );
  }

  // MAIN GAME SCREEN (tiếp tục trong phần 2...)
  return (
    <div className="game-overlay">
      <div className="game-container surplus-game-v2">
        <button className="game-close-btn" onClick={onClose}>✕</button>
        
        {/* Game header với timer */}
        <div className="game-header-v2">
          <div className="header-left">
            <h2 className="game-title">{industry.name}</h2>
            <p className="game-cycle">Chu kỳ: {cycleCount} | Vốn: ${Math.round(accumulatedCapital)}</p>
          </div>
          <div className="header-right">
            <div className={`timer ${timeRemaining < 10 ? 'critical' : ''}`}>
              ⏱️ {timeRemaining}s
            </div>
          </div>
        </div>

        {/* Policy warning banner */}
        {showPolicyWarning && (
          <div className="policy-warning-banner">
            {policyWarningMessage}
          </div>
        )}

        {/* Main dashboard */}
        <div className="dashboard-v2">
          {/* Left: Controls */}
          <div className="controls-section">
            <h3>🎛️ Điều khiển</h3>
            
            <div className="control-group-v2">
              <label>👷 Công nhân: {workers}</label>
              <input type="range" min="1" max="50" value={workers} 
                     onChange={(e) => setWorkers(parseInt(e.target.value))}
                     disabled={gameEnded} />
            </div>

            <div className="control-group-v2">
              <label>💵 Lương: ${wage}</label>
              <input type="range" min="10" max="100" value={wage}
                     onChange={(e) => setWage(parseInt(e.target.value))}
                     disabled={gameEnded}
                     className={wage < minWage ? 'violation' : ''} />
              {wage < minWage && <span className="warning-text">⚠️ Dưới mức tối thiểu!</span>}
            </div>

            <div className="control-group-v2">
              <label>🤖 Tự động hóa: {machineRatio}%</label>
              <input type="range" min="0" max="100" value={machineRatio}
                     onChange={(e) => setMachineRatio(parseInt(e.target.value))}
                     disabled={gameEnded} />
            </div>

            <div className="control-group-v2">
              <label>⚡ Tốc độ: {workSpeed}%</label>
              <input type="range" min="50" max="200" value={workSpeed}
                     onChange={(e) => setWorkSpeed(parseInt(e.target.value))}
                     disabled={gameEnded} />
            </div>

            <div className="investment-levels">
              <div className="level-item">
                <span>🔬 Công nghệ:</span>
                <strong>x{technologyLevel.toFixed(1)}</strong>
              </div>
              <div className="level-item">
                <span>📚 Đào tạo:</span>
                <strong>x{trainingLevel.toFixed(1)}</strong>
              </div>
              <div className="level-item">
                <span>❤️ Phúc lợi:</span>
                <strong>x{welfareLevel.toFixed(1)}</strong>
              </div>
            </div>
          </div>

          {/* Right: Metrics */}
          <div className="metrics-section">
            <h3>📊 Chỉ số</h3>
            
            <div className="metric-card">
              <span className="metric-label">Giá trị SX:</span>
              <span className="metric-value">${productionValue.toLocaleString()}</span>
            </div>

            <div className="metric-card">
              <span className="metric-label">Chi phí LD:</span>
              <span className="metric-value">${laborCost.toLocaleString()}</span>
            </div>

            <div className="metric-card highlight">
              <span className="metric-label">Thặng dư:</span>
              <span className={`metric-value ${surplusValue < 0 ? 'negative' : 'positive'}`}>
                ${surplusValue.toLocaleString()}
              </span>
            </div>

            <div className="metric-card">
              <span className="metric-label">Tổng thặng dư:</span>
              <span className="metric-value">${Math.round(totalSurplus).toLocaleString()}</span>
            </div>

            <div className="metric-card">
              <span className="metric-label">Bất bình đẳng:</span>
              <span className={`metric-value ${inequality > 80 ? 'danger' : inequality > 50 ? 'warning' : 'good'}`}>
                {inequality}%
              </span>
            </div>

            <div className="metric-card">
              <span className="metric-label">Việc làm:</span>
              <span className={`metric-value ${employmentRate < 70 ? 'danger' : employmentRate < 85 ? 'warning' : 'good'}`}>
                {Math.round(employmentRate)}%
              </span>
            </div>

            <div className="metric-card">
              <span className="metric-label">Hài lòng:</span>
              <span className={`metric-value ${workerSatisfaction < 50 ? 'danger' : workerSatisfaction < 70 ? 'warning' : 'good'}`}>
                {Math.round(workerSatisfaction)}%
              </span>
            </div>

            <div className="metric-card">
              <span className="metric-label">Ô nhiễm:</span>
              <span className="metric-value">${Math.round(environmentalCost).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* State policy panel */}
        <div className="policy-panel">
          <h4>🏛️ Chính sách Nhà nước</h4>
          <div className="policy-info">
            <span>Thuế: {taxRate}%</span>
            <span>Lương tối thiểu: ${minWage}</span>
            <span>BHXH: {socialInsurance}%</span>
          </div>
        </div>

        {/* Game log */}
        <div className="game-log">
          <h4>📜 Nhật ký sản xuất</h4>
          <div className="log-entries">
            {gameLog.slice().reverse().map((log, idx) => (
              <div key={idx} className={`log-entry ${log.type}`}>
                <span className="log-time">T{log.time}:</span>
                <span className="log-message">{log.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reinvestment modal */}
        {showReinvestModal && (
          <div className="reinvest-modal-overlay">
            <div className="reinvest-modal">
              <h3>💰 Tái đầu tư 50% thặng dư (${Math.round(pendingSurplus * 0.5)})</h3>
              <p>Chọn hướng đầu tư:</p>
              
              <div className="reinvest-options">
                <button onClick={() => handleReinvestment('technology')}>
                  <span className="option-icon">🔬</span>
                  <strong>Công nghệ</strong>
                  <small>+10% năng suất</small>
                </button>
                
                <button onClick={() => handleReinvestment('training')}>
                  <span className="option-icon">📚</span>
                  <strong>Đào tạo</strong>
                  <small>+5% hiệu quả LD</small>
                </button>
                
                <button onClick={() => handleReinvestment('welfare')}>
                  <span className="option-icon">❤️</span>
                  <strong>Phúc lợi</strong>
                  <small>+Hài lòng, -Ô nhiễm</small>
                </button>
                
                <button onClick={() => setShowReinvestModal(false)} className="skip-btn">
                  Bỏ qua
                </button>
              </div>
            </div>
          </div>
        )}

        {/* End game screen */}
        {gameEnded && (
          <div className="endgame-overlay">
            <div className="endgame-modal">
              <h2>🎮 Kết thúc mô phỏng!</h2>
              
              <div className="final-stats">
                <div className="stat-row">
                  <span>Ngành:</span>
                  <strong>{industry.name}</strong>
                </div>
                <div className="stat-row">
                  <span>Chu kỳ:</span>
                  <strong>{cycleCount}</strong>
                </div>
                <div className="stat-row">
                  <span>Tổng thặng dư:</span>
                  <strong>${Math.round(totalSurplus).toLocaleString()}</strong>
                </div>
                <div className="stat-row">
                  <span>Vốn tích lũy:</span>
                  <strong>${Math.round(accumulatedCapital).toLocaleString()}</strong>
                </div>
                <div className="stat-row">
                  <span>Bất bình đẳng:</span>
                  <strong className={inequality > 80 ? 'danger' : inequality > 50 ? 'warning' : 'good'}>
                    {inequality}%
                  </strong>
                </div>
                <div className="stat-row">
                  <span>Việc làm:</span>
                  <strong>{Math.round(employmentRate)}%</strong>
                </div>
                <div className="stat-row">
                  <span>Hài lòng:</span>
                  <strong>{Math.round(workerSatisfaction)}%</strong>
                </div>
              </div>

              <div className="final-score">
                <h3>🏆 Đánh giá</h3>
                <div className="score-bar">
                  <div className="score-fill" style={{width: `${score}%`}}></div>
                  <span className="score-text">{score}/100</span>
                </div>
                <p className={`ranking ${score >= 80 ? 'excellent' : score >= 50 ? 'good' : 'poor'}`}>
                  {ranking}
                </p>
              </div>

              <div className="endgame-actions">
                <button className="ai-btn" onClick={getAIAnalysis}>
                  🤖 Phân tích AI
                </button>
                <button className="reset-btn" onClick={resetGame}>
                  🔄 Chơi lại
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Modal */}
        {showAIModal && (
          <div className="ai-modal-overlay" onClick={() => setShowAIModal(false)}>
            <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setShowAIModal(false)}>✕</button>
              
              <h3 className="ai-modal-title">🤖 Phân Tích Marxist của AI</h3>
              
              {isLoadingAI ? (
                <div className="ai-loading">
                  <div className="loading-spinner"></div>
                  <p>AI đang phân tích chiến lược của bạn...</p>
                </div>
              ) : (
                <div className="ai-comment">
                  <div className="ai-analysis">
                    {aiComment.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
              
              <button className="ai-close-btn" onClick={() => setShowAIModal(false)}>
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurplusHunterGame;
