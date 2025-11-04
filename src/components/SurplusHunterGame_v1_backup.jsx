import { useState, useEffect, useRef } from 'react';
import './SurplusHunterGame.css';

const SurplusHunterGame = ({ onClose }) => {
  // Game state variables
  const [workers, setWorkers] = useState(20);
  const [wage, setWage] = useState(50);
  const [machineRatio, setMachineRatio] = useState(30);
  const [workSpeed, setWorkSpeed] = useState(100);
  
  // NEW: Industry selection
  const [selectedIndustry, setSelectedIndustry] = useState('textile');
  
  // NEW: Game progression
  const [gameStarted, setGameStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalSurplus, setTotalSurplus] = useState(0);
  const [accumulatedCapital, setAccumulatedCapital] = useState(1000); // Starting capital
  
  // Calculated values
  const [productionValue, setProductionValue] = useState(0);
  const [laborCost, setLaborCost] = useState(0);
  const [surplusValue, setSurplusValue] = useState(0);
  const [inequality, setInequality] = useState(0);
  const [score, setScore] = useState(0);
  const [ranking, setRanking] = useState('');
  
  // NEW: Dynamic metrics
  const [employmentRate, setEmploymentRate] = useState(100);
  const [environmentalCost, setEnvironmentalCost] = useState(0);
  const [workerSatisfaction, setWorkerSatisfaction] = useState(70);
  
  // NEW: Reinvestment system
  const [showReinvestModal, setShowReinvestModal] = useState(false);
  const [reinvestmentChoice, setReinvestmentChoice] = useState(null);
  
  // NEW: State policy
  const [taxRate, setTaxRate] = useState(15);
  const [minWage, setMinWage] = useState(30);
  const [statePenalty, setStatePenalty] = useState(0);
  const [showPolicyWarning, setShowPolicyWarning] = useState(false);
  
  // UI states
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiComment, setAiComment] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [gameLog, setGameLog] = useState([]);

  // Game constants
  const MACHINE_DEPRECIATION = 0.1;
  const CYCLE_INTERVAL = 5000; // 5 seconds per cycle
  const timerRef = useRef(null);
  const cycleRef = useRef(null);
  
  // NEW: Industry definitions
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

  // Core calculation function
  const calculateEconomics = () => {
    // Efficiency factor based on work speed
    const efficiencyFactor = workSpeed / 100;
    
    // Production value calculation
    const baseProduction = (workers * 10 + (machineRatio / 100) * 500) * efficiencyFactor;
    const production = baseProduction;
    
    // Labor cost
    const laborCostValue = workers * wage;
    
    // Machine depreciation cost
    const machineDepreciation = (machineRatio / 100) * 200 * MACHINE_DEPRECIATION;
    
    // Surplus value (production - labor cost - depreciation)
    const surplus = production - laborCostValue - machineDepreciation;
    
    // Inequality calculation (higher surplus vs labor cost = higher inequality)
    let inequalityValue = 0;
    if (laborCostValue > 0) {
      inequalityValue = Math.min(100, (surplus / (laborCostValue + 1)) * 10);
    }
    
    // If too much automation, increase inequality due to unemployment
    if (machineRatio > 50) {
      inequalityValue += (machineRatio - 50) * 0.5;
    }
    
    // If wage too low, increase inequality
    if (wage < 40) {
      inequalityValue += (40 - wage) * 0.8;
    }
    
    inequalityValue = Math.min(100, Math.max(0, inequalityValue));
    
    // Calculate score
    let gameScore = 50; // Base score
    
    if (surplus > 1000) gameScore += 20;
    if (inequalityValue < 50) gameScore += 20;
    if (surplus > 1000 && inequalityValue < 50) gameScore += 10; // Bonus for both
    if (surplus < 0) gameScore -= 20;
    if (inequalityValue > 80) gameScore -= 20;
    
    gameScore = Math.min(100, Math.max(0, gameScore));
    
    // Determine ranking
    let rank = '';
    if (gameScore >= 80) rank = 'Nhà sản xuất lý tưởng – hướng XHCN';
    else if (gameScore >= 50) rank = 'Nhà tư bản cải cách';
    else rank = 'Kẻ bóc lột vô sản điển hình';
    
    // Update state
    setProductionValue(Math.round(production));
    setLaborCost(Math.round(laborCostValue));
    setSurplusValue(Math.round(surplus));
    setInequality(Math.round(inequalityValue));
    setScore(Math.round(gameScore));
    setRanking(rank);
    setHasCalculated(true);
  };

  // AI Analysis function
  const getAIAnalysis = async () => {
    setIsLoadingAI(true);
    setShowAIModal(true);
    
    const prompt = `Bạn là chuyên gia kinh tế Marxist. Phân tích tình huống sau của một nhà máy:

📊 THÔNG SỐ HIỆN TẠI:
- Số công nhân: ${workers} người
- Mức lương trung bình: $${wage}/người
- Tỷ lệ tự động hóa: ${machineRatio}%
- Tốc độ làm việc: ${workSpeed}%

💰 KẾT QUẢ KINH TẾ:
- Giá trị sản xuất: $${productionValue}
- Chi phí lao động: $${laborCost}
- Giá trị thặng dư: $${surplusValue}
- Mức độ bất bình đẳng: ${inequality}%

🎯 Đánh giá: ${ranking} (${score}/100 điểm)

Hãy phân tích ngắn gọn (3-4 câu) về:
1. Đánh giá mức độ bóc lột lao động theo lý thuyết Marx về giá trị thặng dư
2. Tác động xã hội của mô hình này (bất bình đẳng, thất nghiệp do tự động hóa)
3. Gợi ý điều chỉnh để cân bằng hơn theo hướng kinh tế thị trường định hướng XHCN

Trả lời bằng tiếng Việt, phong cách phê phán nhưng mang tính giáo dục.`;

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
      // Fallback comments based on game state
      let fallback = '';
      
      if (surplusValue > 1000 && inequality < 50) {
        fallback = `✅ **Xuất sắc!** Bạn đã đạt được sự cân bằng đáng ngưỡng mộ giữa năng suất và công bằng xã hội. Mức thặng dư $${surplusValue} ổn định, công nhân với mức lương $${wage} được đảm bảo, và mức bất bình đẳng chỉ ${inequality}%. Đây chính là mô hình kinh tế thị trường định hướng XHCN mà Marx và các nhà lý luận sau này hướng đến.`;
      } else if (surplusValue > 1500 && inequality > 80) {
        fallback = `⚠️ **Bóc lột cao!** Lợi nhuận của bạn tăng mạnh ($${surplusValue}), nhưng mức bất bình đẳng lên đến ${inequality}%. Theo Marx, đây chính là biểu hiện của việc chiếm đoạt giá trị thặng dư từ lao động. Lương $${wage} quá thấp so với giá trị mà công nhân tạo ra. Tự động hóa ${machineRatio}% đang thay thế con người, gia tăng "đội quân dự bị công nghiệp" - thất nghiệp cấu trúc.`;
      } else if (surplusValue < 0) {
        fallback = `📉 **Thua lỗ!** Bạn đã trả lương công bằng ($${wage}/người), nhưng sản xuất không hiệu quả. Giá trị thặng dư âm ($${surplusValue}) có nghĩa nhà máy không bền vững. Trong nền kinh tế XHCN, cần cân bằng giữa phúc lợi lao động và hiệu quả sản xuất. Hãy cải thiện công nghệ (tăng tự động hóa hợp lý) hoặc tối ưu quy trình.`;
      } else {
        fallback = `🤔 **Cần cải thiện!** Với ${workers} công nhân, mức lương $${wage}, và tự động hóa ${machineRatio}%, bạn tạo ra giá trị thặng dư $${surplusValue} nhưng mức bất bình đẳng ${inequality}% vẫn chưa lý tưởng. Marx nhấn mạnh: giá trị thặng dư có thể được tối ưu bằng máy móc, nhưng liệu điều đó có khiến con người đánh mất ý nghĩa lao động? Trong XHCN, mục tiêu là phát triển lực lượng sản xuất ĐỒNG THỜI cải thiện quan hệ sản xuất.`;
      }
      
      setAiComment(fallback);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const resetGame = () => {
    setWorkers(20);
    setWage(50);
    setMachineRatio(30);
    setWorkSpeed(100);
    setHasCalculated(false);
    setShowAIModal(false);
  };

  if (showIntro) {
    return (
      <div className="game-overlay">
        <div className="game-container surplus-intro">
          <button className="game-close-btn" onClick={onClose}>✕</button>
          
          <h2 className="game-title">💰 Lao Động & Giá Trị Thặng Dư</h2>
          <h3 className="game-subtitle">Surplus Hunter</h3>
          
          <div className="intro-content">
            <div className="intro-section">
              <h4>🎯 Vai trò của bạn:</h4>
              <p>Bạn là <strong>chủ nhà máy / nhà đầu tư</strong> trong nền kinh tế thị trường định hướng XHCN.</p>
            </div>

            <div className="intro-section">
              <h4>🎮 Mục tiêu:</h4>
              <p>Điều phối lao động, công nghệ và chi phí để <strong>tối đa hóa giá trị thặng dư</strong> (Surplus Value) mà <strong>không làm mất cân bằng xã hội</strong>.</p>
              <p className="highlight">⚖️ Thử thách: Tìm điểm cân bằng giữa <span className="text-profit">Lợi nhuận</span> – <span className="text-labor">Lao động</span> – <span className="text-equity">Công bằng</span>.</p>
            </div>

            <div className="intro-section">
              <h4>📊 Bạn sẽ quản lý:</h4>
              <ul>
                <li>👷 <strong>Số lượng công nhân</strong> (0-50 người)</li>
                <li>💵 <strong>Mức lương trung bình</strong> ($0-100/người)</li>
                <li>🤖 <strong>Tỷ lệ tự động hóa</strong> (0-100% thay thế bằng máy móc)</li>
                <li>⚡ <strong>Tốc độ làm việc</strong> (0-200% năng suất)</li>
              </ul>
            </div>

            <div className="intro-section">
              <h4>💡 Công thức Marx:</h4>
              <div className="marx-formula">
                <p><strong>Giá trị thặng dư (m)</strong> = Giá trị sản xuất - Chi phí lao động - Khấu hao máy móc</p>
                <p><strong>Tỷ suất giá trị thặng dư (m')</strong> = m / v (v = chi phí lao động)</p>
              </div>
            </div>

            <div className="intro-section">
              <h4>🏆 Điều kiện chiến thắng:</h4>
              <ul>
                <li>✅ Giá trị thặng dư &gt; $1000</li>
                <li>✅ Mức bất bình đẳng &lt; 50%</li>
                <li>⭐ Điểm số ≥ 80/100 = <strong>"Nhà sản xuất lý tưởng – hướng XHCN"</strong></li>
              </ul>
            </div>

            <div className="intro-section warning">
              <h4>⚠️ Cảnh báo:</h4>
              <ul>
                <li>💀 Bất bình đẳng &gt; 80% → Bất ổn xã hội</li>
                <li>💸 Giá trị thặng dư &lt; $0 → Nhà máy thua lỗ</li>
                <li>🤖 Tự động hóa quá cao → Thất nghiệp gia tăng</li>
                <li>💵 Lương quá thấp → Bóc lột lao động</li>
              </ul>
            </div>
          </div>

          <button className="game-start-btn" onClick={() => setShowIntro(false)}>
            ▶ Bắt đầu điều hành nhà máy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-overlay">
      <div className="game-container surplus-game">
        <button className="game-close-btn" onClick={onClose}>✕</button>
        
        {/* Title Bar */}
        <div className="game-header">
          <h2 className="game-title">💰 Lao Động & Giá Trị Thặng Dư</h2>
          <p className="game-year">Mô phỏng nhà máy XHCN</p>
        </div>

        {/* Resources Display */}
        <div className="resources-bar">
          <div className="resource-item">
            <span className="resource-icon">👷</span>
            <span className="resource-label">Công nhân:</span>
            <span className="resource-value">{workers} người</span>
          </div>
          <div className="resource-item">
            <span className="resource-icon">⚙️</span>
            <span className="resource-label">Máy móc:</span>
            <span className="resource-value">{machineRatio}%</span>
          </div>
          <div className="resource-item">
            <span className="resource-icon">💵</span>
            <span className="resource-label">Lương TB:</span>
            <span className="resource-value">${wage}</span>
          </div>
        </div>

        {/* Control Panel */}
        <div className="control-panel">
          <h3 className="panel-title">🎛️ Bảng Điều Khiển</h3>
          
          {/* Slider 1: Workers */}
          <div className="control-group">
            <label className="control-label">
              <span className="label-icon">👷</span>
              Số lượng công nhân: <strong>{workers}</strong> người
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={workers}
              onChange={(e) => setWorkers(parseInt(e.target.value))}
              className="slider workers-slider"
            />
            <div className="slider-markers">
              <span>0</span>
              <span>25</span>
              <span>50</span>
            </div>
          </div>

          {/* Slider 2: Wage */}
          <div className="control-group">
            <label className="control-label">
              <span className="label-icon">💵</span>
              Lương trung bình: <strong>${wage}</strong>/người
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={wage}
              onChange={(e) => setWage(parseInt(e.target.value))}
              className="slider wage-slider"
            />
            <div className="slider-markers">
              <span>$0</span>
              <span>$50</span>
              <span>$100</span>
            </div>
          </div>

          {/* Slider 3: Machine Ratio */}
          <div className="control-group">
            <label className="control-label">
              <span className="label-icon">🤖</span>
              Tỷ lệ tự động hóa: <strong>{machineRatio}%</strong>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={machineRatio}
              onChange={(e) => setMachineRatio(parseInt(e.target.value))}
              className="slider machine-slider"
            />
            <div className="slider-markers">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Slider 4: Work Speed */}
          <div className="control-group">
            <label className="control-label">
              <span className="label-icon">⚡</span>
              Tốc độ làm việc: <strong>{workSpeed}%</strong>
            </label>
            <input
              type="range"
              min="0"
              max="200"
              value={workSpeed}
              onChange={(e) => setWorkSpeed(parseInt(e.target.value))}
              className="slider speed-slider"
            />
            <div className="slider-markers">
              <span>0%</span>
              <span>100%</span>
              <span>200%</span>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        {hasCalculated && (
          <div className="output-panel">
            <h3 className="panel-title">📊 Kết Quả Kinh Tế</h3>
            
            <div className="output-grid">
              <div className="output-item production">
                <span className="output-label">Giá trị sản xuất:</span>
                <span className="output-value">${productionValue.toLocaleString()}</span>
              </div>
              
              <div className="output-item labor-cost">
                <span className="output-label">Chi phí lao động:</span>
                <span className="output-value">${laborCost.toLocaleString()}</span>
              </div>
              
              <div className={`output-item surplus ${surplusValue < 0 ? 'negative' : 'positive'}`}>
                <span className="output-label">Giá trị thặng dư:</span>
                <span className="output-value">${surplusValue.toLocaleString()}</span>
              </div>
              
              <div className={`output-item inequality ${inequality > 80 ? 'critical' : inequality > 50 ? 'warning' : 'good'}`}>
                <span className="output-label">Bất bình đẳng:</span>
                <span className="output-value">{inequality}%</span>
                <div className="inequality-bar">
                  <div className="inequality-fill" style={{ width: `${inequality}%` }}></div>
                </div>
              </div>
            </div>

            {/* Score Display */}
            <div className="score-display">
              <h4 className="score-title">🏆 Đánh Giá</h4>
              <div className="score-bar">
                <div className="score-fill" style={{ width: `${score}%` }}></div>
                <span className="score-text">{score}/100</span>
              </div>
              <p className={`ranking ${score >= 80 ? 'excellent' : score >= 50 ? 'good' : 'poor'}`}>
                {ranking}
              </p>
              
              {/* Status Messages */}
              <div className="status-messages">
                {surplusValue > 1000 && <div className="status success">✅ Hiệu quả cao - Thặng dư vượt mục tiêu</div>}
                {inequality < 50 && <div className="status success">✅ Cân bằng xã hội tốt</div>}
                {surplusValue < 0 && <div className="status error">💀 Cảnh báo: Nhà máy thua lỗ!</div>}
                {inequality > 80 && <div className="status error">⚠️ Cảnh báo: Bất ổn xã hội cao!</div>}
                {machineRatio > 70 && <div className="status warning">🤖 Tự động hóa cao - Nguy cơ thất nghiệp</div>}
                {wage < 30 && <div className="status warning">💵 Lương thấp - Bóc lột lao động</div>}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="game-actions">
          <button className="action-btn calculate-btn" onClick={calculateEconomics}>
            <span className="btn-icon">⚙️</span>
            {hasCalculated ? 'Tính toán lại' : 'Chạy mô phỏng'}
          </button>
          
          {hasCalculated && (
            <>
              <button className="action-btn ai-btn" onClick={getAIAnalysis}>
                <span className="btn-icon">🤖</span>
                Phân tích của AI
              </button>
              
              <button className="action-btn reset-btn" onClick={resetGame}>
                <span className="btn-icon">🔄</span>
                Thử cấu hình mới
              </button>
            </>
          )}
        </div>

        {/* AI Modal */}
        {showAIModal && (
          <div className="ai-modal-overlay" onClick={() => setShowAIModal(false)}>
            <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setShowAIModal(false)}>✕</button>
              
              <h3 className="ai-modal-title">🤖 Phân Tích Marxist của AI</h3>
              
              {isLoadingAI ? (
                <div className="ai-loading">
                  <div className="loading-spinner"></div>
                  <p>AI đang phân tích mô hình kinh tế của bạn...</p>
                </div>
              ) : (
                <div className="ai-comment">
                  <div className="ai-stats">
                    <p><strong>Giá trị thặng dư:</strong> ${surplusValue.toLocaleString()}</p>
                    <p><strong>Tỷ lệ bóc lột (m/v):</strong> {laborCost > 0 ? ((surplusValue / laborCost) * 100).toFixed(1) : 0}%</p>
                    <p><strong>Bất bình đẳng:</strong> {inequality}%</p>
                    <p><strong>Điểm số:</strong> {score}/100</p>
                  </div>
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
