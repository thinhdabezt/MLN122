import { useState, useEffect, useRef } from 'react';
import './SurplusHunterGame.css';

const SurplusHunterGame = ({ onClose }) => {
  // Game state variables
  const [workers, setWorkers] = useState(20);
  const [wage, setWage] = useState(50);
  const [machineRatio, setMachineRatio] = useState(30);
  const [workSpeed, setWorkSpeed] = useState(100);
  
  // Game progression
  const [gameStarted, setGameStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [canFinishEarly, setCanFinishEarly] = useState(false);
  
  // Calculated values
  const [productionValue, setProductionValue] = useState(0);
  const [laborCost, setLaborCost] = useState(0);
  const [surplusValue, setSurplusValue] = useState(0);
  const [inequality, setInequality] = useState(0);
  const [score, setScore] = useState(0);
  const [ranking, setRanking] = useState('');
  
  // UI states
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiComment, setAiComment] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Game constants
  const MACHINE_DEPRECIATION = 0.1;
  const GAME_DURATION = 30; // 30 seconds
  const EARLY_FINISH_TIME = 20; // Can finish after 20s
  const timerRef = useRef(null);
  
  // Timer countdown
  useEffect(() => {
    if (gameStarted && !hasCalculated && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          
          // Enable early finish after 20s (when 10s left)
          if (newTime <= GAME_DURATION - EARLY_FINISH_TIME) {
            setCanFinishEarly(true);
          }
          
          // Auto calculate when time's up
          if (newTime <= 0) {
            calculateEconomics();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStarted, hasCalculated, timeRemaining]);

  // Start game
  const startGame = () => {
    setShowIntro(false);
    setGameStarted(true);
    setTimeRemaining(GAME_DURATION);
    setCanFinishEarly(false);
    setHasCalculated(false);
  };
  
  // Core calculation function
  const calculateEconomics = () => {
    // Efficiency factor based on work speed
    const efficiencyFactor = workSpeed / 100;
    
    // Production value calculation (OPTIMIZED for fair gameplay)
    const laborProductivity = workers * 65; // Each worker produces $65 base value
    const machineProductivity = (machineRatio / 100) * 1000; // Machines add up to $1000
    const baseProduction = (laborProductivity + machineProductivity) * efficiencyFactor;
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
    
    // Calculate score (CHALLENGING scoring system)
    let gameScore = 0;
    
    // Base production score (max 30 points) - Higher thresholds
    if (surplus > 2000) gameScore += 30;
    else if (surplus > 1500) gameScore += 26;
    else if (surplus > 1200) gameScore += 22;
    else if (surplus > 900) gameScore += 18;
    else if (surplus > 600) gameScore += 14;
    else if (surplus > 300) gameScore += 10;
    else if (surplus > 0) gameScore += 6;
    else gameScore += 0; // No points for losses
    
    // Inequality management (max 35 points) - Stricter standards
    if (inequalityValue < 15) gameScore += 35;
    else if (inequalityValue < 25) gameScore += 31;
    else if (inequalityValue < 35) gameScore += 27;
    else if (inequalityValue < 45) gameScore += 22;
    else if (inequalityValue < 55) gameScore += 16;
    else if (inequalityValue < 65) gameScore += 10;
    else if (inequalityValue < 75) gameScore += 5;
    else gameScore += 0;
    
    // Balanced approach bonus (max 20 points) - Challenging to achieve
    if (surplus > 1200 && inequalityValue < 30) gameScore += 20;
    else if (surplus > 900 && inequalityValue < 40) gameScore += 15;
    else if (surplus > 600 && inequalityValue < 50) gameScore += 10;
    else if (surplus > 300 && inequalityValue < 60) gameScore += 5;
    
    // Worker welfare consideration (max 15 points) - Higher standards
    if (wage >= 70) gameScore += 15;
    else if (wage >= 60) gameScore += 12;
    else if (wage >= 50) gameScore += 9;
    else if (wage >= 40) gameScore += 5;
    
    // Penalties - More severe
    if (surplus < 0) gameScore -= 20;
    if (inequalityValue > 80) gameScore -= 15;
    if (machineRatio > 80 && wage < 45) gameScore -= 10;
    
    gameScore = Math.min(100, Math.max(0, gameScore));
    
    // Determine ranking
    let rank = '';
    if (gameScore >= 85) rank = '⭐⭐⭐⭐⭐ Nhà sản xuất lý tưởng – hướng XHCN';
    else if (gameScore >= 70) rank = '⭐⭐⭐⭐ Nhà tư bản cải cách tốt';
    else if (gameScore >= 55) rank = '⭐⭐⭐ Nhà tư bản cải cách';
    else if (gameScore >= 40) rank = '⭐⭐ Cần cải thiện đáng kể';
    else rank = '⭐ Kẻ bóc lột vô sản điển hình';
    
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
    
    const prompt = `Bạn là chuyên gia kinh tế Marxist phân tích kết quả điều hành nhà máy:

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

Yêu cầu phân tích (4-5 câu ngắn gọn):

1. **Đánh giá hiện trạng:** Nhận xét về tình hình hiện tại (bóc lột lao động? cân bằng? thua lỗ?)

2. **GỢI Ý CỤ THỂ để cải thiện điểm số:**
   - Nên TĂNG hay GIẢM số công nhân? (hiện tại: ${workers})
   - Nên TĂNG hay GIẢM lương? (hiện tại: $${wage})
   - Nên TĂNG hay GIẢM tự động hóa? (hiện tại: ${machineRatio}%)
   - Nên TĂNG hay GIẢM tốc độ làm việc? (hiện tại: ${workSpeed}%)

3. **Giải thích lý do:** Tại sao các điều chỉnh này sẽ giúp cân bằng hơn?

Lưu ý: 
- Điểm cao nhất đạt được khi: Thặng dư > $1500 + Bất bình đẳng < 25% + Lương ≥ $70
- Trả lời TIẾNG VIỆT, phong cách vừa phê phán vừa hướng dẫn cụ thể
- Đưa ra SỐ LIỆU CHÍNH XÁC để người chơi điều chỉnh`;

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
      // Enhanced fallback with specific suggestions
      let fallback = '';
      
      if (score >= 85) {
        fallback = `✅ **Xuất sắc!** Điểm ${score}/100 - Bạn đã đạt mức cân bằng lý tưởng!\n\n📊 Phân tích:\n- Thặng dư $${surplusValue} cho thấy hiệu quả kinh tế tốt\n- Bất bình đẳng ${inequality}% ở mức rất hợp lý\n- Lương $${wage} đảm bảo phúc lợi người lao động\n\n💡 Để duy trì: Giữ nguyên các chỉ số này, đây là mô hình XHCN lý tưởng!`;
      } else if (score >= 55) {
        fallback = `⚠️ **Cần cải thiện** - Điểm ${score}/100\n\n📊 Vấn đề:\n${surplusValue < 1200 ? `- Thặng dư chỉ $${surplusValue} (mục tiêu >$1500)\n` : ''}${inequality > 30 ? `- Bất bình đẳng ${inequality}% quá cao (mục tiêu <25%)\n` : ''}${wage < 70 ? `- Lương $${wage} thấp (mục tiêu ≥$70)\n` : ''}\n💡 GỢI Ý CỤ THỂ:\n${surplusValue < 1200 ? `- TĂNG số công nhân lên ${workers + 5}-${workers + 8} người\n- TĂNG tốc độ lên ${Math.min(200, workSpeed + 10)}%\n` : ''}${inequality > 30 && wage < 70 ? `- TĂNG lương lên $${Math.min(100, wage + 8)}-$${Math.min(100, wage + 12)}\n` : ''}${machineRatio > 45 ? `- GIẢM tự động hóa xuống ${Math.max(30, machineRatio - 10)}% để giảm bất bình đẳng\n` : ''}`;
      } else {
        fallback = `🚨 **Bóc lột nghiêm trọng!** - Điểm ${score}/100\n\n📊 Vấn đề chính:\n${surplusValue < 0 ? `- THUA LỖ $${Math.abs(surplusValue)}!\n` : `- Bất bình đẳng ${inequality}% cực cao!\n`}${wage < 55 ? `- Lương $${wage} quá thấp, bóc lột lao động!\n` : ''}\n💡 GỢI Ý KHẨN CẤP:\n${surplusValue < 0 ? `- TĂNG công nhân lên ${Math.min(50, workers + 12)} người\n- TĂNG tốc độ lên ${Math.min(200, workSpeed + 25)}%\n` : `- TĂNG lương ngay lên $${Math.min(100, wage + 18)}\n- ${machineRatio > 50 ? `GIẢM tự động hóa xuống ${Math.max(30, machineRatio - 20)}%\n` : `TĂNG công nhân lên ${workers + 12} người\n`}`}⚖️ Mục tiêu: Cân bằng Thặng dư >$1200 + Lương ≥$70 + Bất bình đẳng <25%`;
      }
      
      setAiComment(fallback);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const resetGame = () => {
    setShowIntro(true);
    setGameStarted(false);
    setTimeRemaining(GAME_DURATION);
    setCanFinishEarly(false);
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
          <h3 className="game-subtitle">Surplus Hunter - 30 Second Challenge</h3>
          
          <div className="intro-content">
            <div className="intro-section">
              <h4>🎯 Vai trò của bạn:</h4>
              <p>Bạn là <strong>chủ nhà máy / nhà đầu tư</strong> trong nền kinh tế thị trường định hướng XHCN.</p>
            </div>

            <div className="intro-section">
              <h4>⏱️ Cách chơi:</h4>
              <ul>
                <li>⏰ Bạn có <strong>30 giây</strong> để điều chỉnh các thông số sản xuất</li>
                <li>🎯 Tối ưu hóa giá trị thặng dư mà không làm mất cân bằng xã hội</li>
                <li>✅ Có thể <strong>kết thúc sớm</strong> sau 20 giây nếu đã hài lòng</li>
                <li>📊 Kết quả sẽ được công bố khi hết giờ hoặc bạn nhấn "Hoàn thành"</li>
              </ul>
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

          <button className="game-start-btn" onClick={startGame}>
            ▶ Bắt đầu thử thách 30 giây
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-overlay">
      <div className="game-container surplus-game">
        <button className="game-close-btn" onClick={onClose}>✕</button>
        
        {/* Title Bar with Timer */}
        <div className="game-header">
          <div>
            <h2 className="game-title">💰 Lao Động & Giá Trị Thặng Dư</h2>
            <p className="game-year">Mô phỏng nhà máy XHCN</p>
          </div>
          {gameStarted && !hasCalculated && (
            <div className={`timer ${timeRemaining <= 10 ? 'critical' : ''}`}>
              ⏱️ {timeRemaining}s
            </div>
          )}
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
          {gameStarted && !hasCalculated ? (
            <>
              <button 
                className="action-btn calculate-btn" 
                onClick={calculateEconomics}
                disabled={!canFinishEarly}
                style={{ opacity: canFinishEarly ? 1 : 0.5 }}
              >
                <span className="btn-icon">✅</span>
                {canFinishEarly ? 'Hoàn thành ngay' : `Chờ ${EARLY_FINISH_TIME - (GAME_DURATION - timeRemaining)}s nữa...`}
              </button>
            </>
          ) : (
            hasCalculated && (
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
            )
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
                  <div className="ai-disclaimer" style={{
                    marginTop: '16px',
                    padding: '10px 14px',
                    background: 'rgba(255, 193, 7, 0.1)',
                    border: '1px solid rgba(255, 193, 7, 0.3)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#FFB74D',
                    fontStyle: 'italic'
                  }}>
                    ⚠️ <strong>Lưu ý:</strong> Nhận xét này được tạo bởi AI (Gemini/ChatGPT) và chỉ mang tính tham khảo. 
                    Vui lòng tự kiểm chứng với lý thuyết Marx gốc.
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
