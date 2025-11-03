import { useState, useEffect, useRef } from 'react';
import './OwnershipMixGame.css';

const OwnershipMixGame = ({ onClose }) => {
  // Game State - Harder starting conditions
  const [gameState, setGameState] = useState({
    year: 1,
    budget: 800,  // Reduced from 1000 - tighter budget
    ownershipShares: { state: 40, private: 40, collective: 20 },
    productivity: 50,  // Reduced from 60 - economy needs improvement
    equity: 55,        // Reduced from 65 - more inequality
    stability: 60,     // Reduced from 70 - more social tension
    sectors: {
      agriculture: { state: 40, private: 30, collective: 30 },
      industry: { state: 50, private: 40, collective: 10 },
      services: { state: 30, private: 60, collective: 10 }
    },
    sentiment: 50  // Reduced from 60 - neutral public opinion
  });

  const [currentEvent, setCurrentEvent] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [aiComment, setAiComment] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Event Database (Rebalanced - harder choices, realistic trade-offs)
  const eventDatabase = [
    {
      id: 'fdi-energy',
      title: 'FDI đề nghị đầu tư năng lượng',
      description: 'Tập đoàn nước ngoài muốn đầu tư 500 tỷ vào ngành năng lượng, nhưng yêu cầu ưu đãi thuế 5 năm và chiếm 25% cổ phần.',
      choices: [
        { 
          label: 'Chấp thuận đầy đủ', 
          effects: { productivity: 5, equity: -10, stability: -3, budget: 300, sector: 'industry', ownership: { private: 20 } }
        },
        { 
          label: 'Từ chối hoàn toàn', 
          effects: { stability: -8, sentiment: -15, productivity: -3 }
        },
        { 
          label: 'Đàm phán (15% cổ phần, thuế 50%)', 
          effects: { productivity: 3, equity: -5, stability: -2, budget: 150, sector: 'industry', ownership: { private: 12 } }
        }
      ]
    },
    {
      id: 'strike',
      title: 'Đình công hàng loạt tại KCN',
      description: 'Hơn 50,000 công nhân đình công yêu cầu tăng lương 20% và cải thiện điều kiện làm việc. Sản xuất bị đình trệ.',
      choices: [
        { 
          label: 'Tăng lương 20% + cải thiện điều kiện', 
          effects: { budget: -200, stability: 8, equity: 10, productivity: -5, sentiment: 15 }
        },
        { 
          label: 'Đàm phán xuống 12%', 
          effects: { budget: -100, stability: 3, equity: 5, productivity: -2, sentiment: 5 }
        },
        { 
          label: 'Đàn áp đình công', 
          effects: { stability: -25, equity: -15, productivity: -8, sentiment: -30 }
        }
      ]
    },
    {
      id: 'drought',
      title: 'Hạn hán nghiêm trọng vùng ĐBSCL',
      description: 'Hạn mặn xâm nhập sâu, 500,000 ha lúa bị ảnh hưởng. HTX nông nghiệp cần hỗ trợ khẩn cấp 300 tỷ.',
      choices: [
        { 
          label: 'Cứu trợ toàn bộ 300 tỷ', 
          effects: { budget: -300, equity: 12, stability: 8, productivity: -3, sector: 'agriculture' }
        },
        { 
          label: 'Hỗ trợ một phần 120 tỷ + vay ưu đãi', 
          effects: { budget: -120, equity: 5, stability: 2, productivity: -5 }
        },
        { 
          label: 'Để HTX tự lo (khuyến khích tư nhân)', 
          effects: { equity: -18, stability: -12, productivity: -8, sentiment: -20, sector: 'agriculture', ownership: { collective: -10, private: 10 } }
        }
      ]
    },
    {
      id: 'tax-evasion',
      title: 'Phát hiện trốn thuế quy mô lớn',
      description: 'Thanh tra phát hiện hàng trăm DN tư nhân lách thuế, thiệt hại ngân sách ước tính 400 tỷ trong 3 năm.',
      choices: [
        { 
          label: 'Điều tra nghiêm túc + truy thu thuế', 
          effects: { budget: 200, equity: 8, productivity: -8, sentiment: -10, stability: -5 }
        },
        { 
          label: 'Ân xá nhưng cải cách hệ thống thuế', 
          effects: { budget: 80, equity: 3, productivity: -2, sentiment: -3 }
        },
        { 
          label: 'Không xử lý (tránh làm xấu môi trường KD)', 
          effects: { equity: -15, sentiment: -15, stability: -8, productivity: 4 }
        }
      ]
    },
    {
      id: 'tech-investment',
      title: 'Cơ hội chuyển đổi số quốc gia',
      description: 'Liên minh startup công nghệ đề xuất Nhà nước đầu tư 500 tỷ vào hạ tầng AI và Big Data, hứa hẹn tăng GDP 0.5%/năm.',
      choices: [
        { 
          label: 'Đầu tư toàn bộ (DN Nhà nước)', 
          effects: { budget: -500, productivity: 8, equity: 5, sector: 'services', ownership: { state: 12 } }
        },
        { 
          label: 'Hợp tác công-tư (PPP)', 
          effects: { budget: -250, productivity: 6, equity: -2, sector: 'services', ownership: { private: 8, state: 5 } }
        },
        { 
          label: 'Để hoàn toàn cho tư nhân', 
          effects: { productivity: 4, equity: -8, stability: -3 }
        }
      ]
    },
    {
      id: 'cooperative-crisis',
      title: 'Khủng hoảng mô hình HTX',
      description: '60% HTX hoạt động thua lỗ, nợ nần chồng chất. Cần quyết định cứu hay giải thể.',
      choices: [
        { 
          label: 'Tái cơ cấu + bơm vốn 250 tỷ', 
          effects: { budget: -250, productivity: 3, equity: 8, stability: 5, sentiment: 8 }
        },
        { 
          label: 'Tư nhân hóa 50% HTX yếu kém', 
          effects: { productivity: 6, equity: -12, stability: -5, sentiment: -8, sector: 'agriculture', ownership: { collective: -15, private: 15 } }
        },
        { 
          label: 'Giữ nguyên hiện trạng', 
          effects: { productivity: -8, stability: -10, equity: -5, budget: -100 }
        }
      ]
    },
    {
      id: 'export-boom',
      title: 'Cơ hội xuất khẩu bùng nổ',
      description: 'Thị trường EU-US mở cửa, nhu cầu nông sản tăng 40%. Cần quyết định mở rộng sản xuất thế nào.',
      choices: [
        { 
          label: 'Đầu tư DNNN mở rộng (400 tỷ)', 
          effects: { budget: -400, productivity: 7, equity: 6, sector: 'agriculture', ownership: { state: 12 } }
        },
        { 
          label: 'Hỗ trợ tư nhân + HTX mở rộng', 
          effects: { budget: -150, productivity: 8, equity: -5, sector: 'agriculture', ownership: { private: 10 } }
        },
        { 
          label: 'Chỉ tăng thuế xuất khẩu (thụ động)', 
          effects: { budget: 150, equity: 3, productivity: -2, sentiment: -8 }
        }
      ]
    },
    {
      id: 'education-crisis',
      title: 'Khủng hoảng lao động trình độ cao',
      description: 'Các công ty FDI phàn nàn 70% lao động thiếu kỹ năng. Brain drain nghiêm trọng, hàng nghìn kỹ sư ra nước ngoài.',
      choices: [
        { 
          label: 'Đại tu giáo dục nghề (500 tỷ)', 
          effects: { budget: -500, productivity: 6, equity: 12, stability: 6, sentiment: 10 }
        },
        { 
          label: 'Trợ cấp DN đào tạo (200 tỷ)', 
          effects: { budget: -200, productivity: 4, equity: 2, sentiment: 3 }
        },
        { 
          label: 'Không can thiệp', 
          effects: { productivity: -10, stability: -8, equity: -5, sentiment: -12 }
        }
      ]
    },
    {
      id: 'inflation-crisis',
      title: 'Lạm phát vượt kiểm soát',
      description: 'CPI tăng 12%, giá xăng tăng 35%, giá lương thực tăng 18%. Người dân biểu tình đòi can thiệp.',
      choices: [
        { 
          label: 'Kiểm soát giá cứng rắn + trợ cấp', 
          effects: { stability: 10, equity: 10, productivity: -12, budget: -300 }
        },
        { 
          label: 'Thắt chặt tiền tệ + tăng lãi suất', 
          effects: { stability: 2, productivity: -8, equity: -5, budget: -100 }
        },
        { 
          label: 'Để thị trường tự điều chỉnh', 
          effects: { stability: -20, equity: -18, sentiment: -25, productivity: -5 }
        }
      ]
    },
    {
      id: 'green-pressure',
      title: 'Áp lực carbon biên giới EU',
      description: 'EU áp thuế carbon, xuất khẩu Việt Nam có thể bị đánh thuế thêm 15%. Cần chuyển đổi xanh gấp.',
      choices: [
        { 
          label: 'Đầu tư mạnh năng lượng sạch (600 tỷ)', 
          effects: { budget: -600, stability: 3, sentiment: 12, productivity: -5, equity: 5 }
        },
        { 
          label: 'Chuyển đổi từ từ (200 tỷ)', 
          effects: { budget: -200, sentiment: 5, productivity: -2 }
        },
        { 
          label: 'Đàm phán hoãn + giữ nguyên', 
          effects: { sentiment: -15, stability: -8, productivity: -3 }
        }
      ]
    },
    {
      id: 'banking-collapse',
      title: 'Nguy cơ sụp đổ hệ thống ngân hàng',
      description: '3 ngân hàng lớn trên bờ vực phá sản do cho vay bất động sản rủi ro. Nguy cơ khủng hoảng tài chính hệ thống.',
      choices: [
        { 
          label: 'Quốc hữu hóa khẩn cấp (500 tỷ)', 
          effects: { budget: -500, stability: 12, equity: 8, sector: 'services', ownership: { state: 18 } }
        },
        { 
          label: 'Cho vay cứu trợ có điều kiện (250 tỷ)', 
          effects: { budget: -250, stability: 5, equity: -3 }
        },
        { 
          label: 'Để phá sản (thanh lọc thị trường)', 
          effects: { stability: -30, equity: -15, productivity: -10, sentiment: -35, budget: 100 }
        }
      ]
    },
    {
      id: 'trade-war',
      title: 'Chiến tranh thương mại Mỹ-Trung',
      description: 'Mỹ đề nghị Việt Nam thay thế Trung Quốc trong chuỗi cung ứng, nhưng yêu cầu cắt giảm quan hệ KT với TQ.',
      choices: [
        { 
          label: 'Chấp nhận (nghiêng Mỹ)', 
          effects: { productivity: 8, equity: -8, stability: -10, budget: 200, sentiment: -12 }
        },
        { 
          label: 'Từ chối (giữ cân bằng)', 
          effects: { productivity: -5, stability: 5, budget: -100 }
        },
        { 
          label: 'Đàm phán lợi ích cả 2 bên', 
          effects: { productivity: 3, stability: -3, budget: 80, sentiment: -5 }
        }
      ]
    }
  ];

  // Generate random event (30% chance of no event)
  const generateEvent = () => {
    if (Math.random() > 0.3) {  // 70% chance of event
      const randomEvent = eventDatabase[Math.floor(Math.random() * eventDatabase.length)];
      setCurrentEvent(randomEvent);
    } else {
      // 30% chance of no event - set to null to allow next turn
      setCurrentEvent(null);
    }
  };

  // Ref to prevent multiple event generations per year
  const hasGeneratedEvent = useRef(false);

  // Start game - trigger event/no-event at start of each year
  useEffect(() => {
    if (!showIntro && !currentEvent && gameState.year <= 10 && !hasGeneratedEvent.current) {
      hasGeneratedEvent.current = true;
      generateEvent();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showIntro, gameState.year]);
  
  // Reset event generation flag when event is cleared
  useEffect(() => {
    if (currentEvent === null) {
      hasGeneratedEvent.current = false;
    }
  }, [currentEvent]);

  // Handle event choice
  const handleEventChoice = async (choice) => {
    const effects = choice.effects;
    
    // Update game state based on choice effects
    setGameState(prev => {
      const newState = { ...prev };
      
      // Update budget
      if (effects.budget) newState.budget += effects.budget;
      
      // Update main indicators
      if (effects.productivity) newState.productivity = Math.max(0, Math.min(100, newState.productivity + effects.productivity));
      if (effects.equity) newState.equity = Math.max(0, Math.min(100, newState.equity + effects.equity));
      if (effects.stability) newState.stability = Math.max(0, Math.min(100, newState.stability + effects.stability));
      if (effects.sentiment) newState.sentiment = Math.max(0, Math.min(100, newState.sentiment + effects.sentiment));
      
      // Update sector ownership
      if (effects.sector && effects.ownership) {
        Object.keys(effects.ownership).forEach(type => {
          newState.sectors[effects.sector][type] = Math.max(0, Math.min(100, 
            newState.sectors[effects.sector][type] + effects.ownership[type]
          ));
        });
        
        // Normalize sector to 100%
        const sector = newState.sectors[effects.sector];
        const total = sector.state + sector.private + sector.collective;
        if (total > 0) {
          sector.state = (sector.state / total) * 100;
          sector.private = (sector.private / total) * 100;
          sector.collective = (sector.collective / total) * 100;
        }
      }
      
      return newState;
    });

    setCurrentEvent(null);
    
    // Get AI comment for this decision
    await getAIComment(choice.label, effects);
  };

  // Calculate turn effects - Rebalanced for harder gameplay
  const calculateTurnEffects = () => {
    // Calculate average ownership across sectors
    const avgState = (gameState.sectors.agriculture.state + gameState.sectors.industry.state + gameState.sectors.services.state) / 3;
    const avgPrivate = (gameState.sectors.agriculture.private + gameState.sectors.industry.private + gameState.sectors.services.private) / 3;
    const avgCollective = (gameState.sectors.agriculture.collective + gameState.sectors.industry.collective + gameState.sectors.services.collective) / 3;
    
    // Productivity change (reduced gains)
    // Private sector efficient but volatile, state stable but slower, collective moderate
    const productivityChange = (avgPrivate * 0.04 + avgState * 0.02 + avgCollective * 0.03) - 1.5;
    
    // Equity change (harder to maintain)
    // State & collective improve equity, private worsens it
    const equityChange = (avgState * 0.04 + avgCollective * 0.05 - avgPrivate * 0.04) - 1.2;
    
    // Stability change (affected by imbalance)
    // Penalize extreme imbalances, reward equity
    const imbalancePenalty = Math.abs(avgPrivate - avgState) / 20;
    const stabilityChange = 0.03 * gameState.equity - imbalancePenalty - 1.0;
    
    // Budget natural drain (running costs)
    const budgetDrain = -30; // Annual operational costs
    
    return {
      productivityChange,
      equityChange,
      stabilityChange,
      budgetDrain
    };
  };

  // Next turn
  const nextTurn = async () => {
    const effects = calculateTurnEffects();
    
    setGameState(prev => ({
      ...prev,
      year: prev.year + 1,
      productivity: Math.max(0, Math.min(100, prev.productivity + effects.productivityChange)),
      equity: Math.max(0, Math.min(100, prev.equity + effects.equityChange)),
      stability: Math.max(0, Math.min(100, prev.stability + effects.stabilityChange)),
      budget: prev.budget + 30 + effects.budgetDrain // Reduced annual revenue from 50 to 30, minus drain
    }));

    // Check game over conditions
    if (gameState.year >= 10) {
      await getAISummary();
      setShowSummary(true);
    } else if (gameState.stability < 30) {
      await getAISummary('crisis');
      setShowSummary(true);
    } else if (gameState.budget < -500) {
      await getAISummary('bankruptcy');
      setShowSummary(true);
    } else {
      generateEvent();
    }
  };

  // Adjust sector ownership
  const adjustSectorOwnership = (sector, type, value) => {
    setGameState(prev => {
      const newSectors = { ...prev.sectors };
      const newSector = { ...newSectors[sector] };
      
      newSector[type] = Math.max(0, Math.min(100, value));
      
      // Normalize to 100%
      const total = newSector.state + newSector.private + newSector.collective;
      if (total > 0) {
        newSector.state = (newSector.state / total) * 100;
        newSector.private = (newSector.private / total) * 100;
        newSector.collective = (newSector.collective / total) * 100;
      }
      
      newSectors[sector] = newSector;
      
      return {
        ...prev,
        sectors: newSectors
      };
    });
  };

  // Call Gemini AI for comments
  const getAIComment = async (choice, effects) => {
    setIsLoadingAI(true);
    try {
      const prompt = `Bạn là chuyên gia kinh tế Marxist phân tích chính sách trong bối cảnh kinh tế thị trường định hướng XHCN của Việt Nam.

**Quyết định vừa đưa ra:** "${choice}"

**Tác động trực tiếp:**
- Năng suất: ${effects.productivity > 0 ? '+' : ''}${effects.productivity || 0} điểm
- Công bằng xã hội: ${effects.equity > 0 ? '+' : ''}${effects.equity || 0} điểm
- Ổn định chính trị: ${effects.stability > 0 ? '+' : ''}${effects.stability || 0} điểm
- Ngân sách nhà nước: ${effects.budget > 0 ? '+' : ''}${effects.budget || 0} tỷ

**Hiện trạng sau quyết định (Năm ${gameState.year}/10):**
- Năng suất: ${gameState.productivity.toFixed(1)}/100
- Công bằng: ${gameState.equity.toFixed(1)}/100
- Ổn định: ${gameState.stability.toFixed(1)}/100
- Ngân sách: ${gameState.budget} tỷ

**Yêu cầu phân tích:**
Hãy đưa ra nhận xét CHỈ 2-3 câu ngắn gọn, sắc bén về:
1. Đánh giá quyết định này (tốt/xấu/trung bình) với emoji 🟢 (tốt) / 🟡 (chấp nhận được) / 🔴 (có vấn đề)
2. Hệ quả dài hạn hoặc rủi ro tiềm ẩn
3. Góc nhìn theo lý thuyết Marxist về mối quan hệ sở hữu-sản xuất

Giữ ngắn gọn, KHÔNG quá 3 câu!`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_API_KEY_G1}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const comment = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không thể tải phản hồi AI.';
      setAiComment(comment);
    } catch (error) {
      console.error('AI Error Details:', error);
      console.error('API Key exists:', !!import.meta.env.VITE_API_KEY_G1);
      
      // Smart fallback comment based on effects analysis
      let fallback = '';
      const netEffect = (effects.productivity || 0) + (effects.equity || 0) + (effects.stability || 0);
      
      // Overall assessment
      if (netEffect > 5) {
        fallback = '🟢 Quyết định tích cực trong ngắn hạn. ';
      } else if (netEffect < -5) {
        fallback = '🔴 Quyết định này có rủi ro cao. ';
      } else {
        fallback = '🟡 Quyết định cân bằng, có cả lợi và hại. ';
      }
      
      // Specific warnings
      if (effects.stability && effects.stability < -10) {
        fallback += '⚠️ Ổn định xã hội đang bị đe dọa nghiêm trọng! ';
      }
      if (effects.equity && effects.equity < -10) {
        fallback += '� Khoảng cách giàu nghèo đang tăng nhanh. ';
      }
      if (effects.budget && effects.budget < -300) {
        fallback += '� Ngân sách cạn kiệt, cần thận trọng! ';
      }
      
      // Positive highlights
      if (effects.productivity && effects.productivity > 5) {
        fallback += '📈 Năng suất được cải thiện đáng kể. ';
      }
      if (effects.equity && effects.equity > 8) {
        fallback += '⚖️ Công bằng xã hội tăng mạnh. ';
      }
      
      fallback += '\n\n(Không thể kết nối AI để phân tích sâu)';
      setAiComment(fallback);
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Get AI summary at game end
  const getAISummary = async (endType = 'normal') => {
    setIsLoadingAI(true);
    try {
      const totalScore = calculateFinalScore();
      const rating = getFinalRating();
      
      const prompt = `Bạn là chuyên gia đánh giá chính sách kinh tế theo lý thuyết Marxist và thực tiễn kinh tế thị trường định hướng XHCN của Việt Nam.

**📊 TỔNG KẾT NHIỆM KỲ NĂM ${gameState.year}/10**

**Kết quả cuối cùng:**
- Năng suất kinh tế: ${gameState.productivity.toFixed(1)}/100
- Công bằng xã hội: ${gameState.equity.toFixed(1)}/100
- Ổn định chính trị: ${gameState.stability.toFixed(1)}/100
- Ngân sách nhà nước: ${gameState.budget} tỷ
- Điểm tổng hợp: ${totalScore.toFixed(1)}/100
- Xếp hạng: ${rating.title}

**Cơ cấu sở hữu cuối nhiệm kỳ:**
- Nông nghiệp: Nhà nước ${gameState.sectors.agriculture.state.toFixed(0)}% | Tư nhân ${gameState.sectors.agriculture.private.toFixed(0)}% | HTX ${gameState.sectors.agriculture.collective.toFixed(0)}%
- Công nghiệp: Nhà nước ${gameState.sectors.industry.state.toFixed(0)}% | Tư nhân ${gameState.sectors.industry.private.toFixed(0)}% | HTX ${gameState.sectors.industry.collective.toFixed(0)}%
- Dịch vụ: Nhà nước ${gameState.sectors.services.state.toFixed(0)}% | Tư nhân ${gameState.sectors.services.private.toFixed(0)}% | HTX ${gameState.sectors.services.collective.toFixed(0)}%

${endType === 'crisis' ? '⚠️ **Nhiệm kỳ kết thúc sớm do khủng hoảng ổn định xã hội nghiêm trọng.**' : ''}
${endType === 'bankruptcy' ? '⚠️ **Nhiệm kỳ kết thúc sớm do phá sản ngân sách quốc gia.**' : ''}
${endType === 'normal' && gameState.year >= 10 ? '✅ **Hoàn thành đầy đủ 10 năm nhiệm kỳ.**' : ''}

**Yêu cầu đánh giá (4-5 câu):**
1. Nhận xét tổng quan về con đường phát triển đã chọn
2. So sánh với mô hình KTTT định hướng XHCN của VN hiện tại
3. Đánh giá cân bằng giữa tăng trưởng và công bằng xã hội
4. Gợi ý cải thiện cho lần chơi tiếp theo (nếu chưa tốt)

Giữ trong 5 câu, súc tích và sắc bén!`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_API_KEY_G1}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const summary = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không thể tải tổng kết AI.';
      setAiComment(summary);
    } catch (error) {
      console.error('AI Summary Error Details:', error);
      console.error('API Key exists:', !!import.meta.env.VITE_API_KEY_G1);
      
      // Fallback summary
      const totalScore = (gameState.productivity + gameState.equity + gameState.stability) / 3;
      let fallbackSummary = `📊 Kết quả sau ${gameState.year} năm:\n\n`;
      
      if (totalScore >= 70) {
        fallbackSummary += '🎉 Bạn đã điều hành nền kinh tế rất tốt, cân bằng giữa tăng trưởng và công bằng xã hội. ';
      } else if (totalScore >= 50) {
        fallbackSummary += '👍 Kết quả khá ổn, nhưng còn nhiều thách thức cần giải quyết. ';
      } else {
        fallbackSummary += '⚠️ Nền kinh tế gặp nhiều khó khăn, cần cải cách mạnh mẽ. ';
      }
      
      if (endType === 'crisis') {
        fallbackSummary += '\n\n💥 Ổn định xã hội suy giảm nghiêm trọng dẫn đến khủng hoảng.';
      } else if (endType === 'bankruptcy') {
        fallbackSummary += '\n\n💸 Ngân sách quốc gia bị phá sản do quản lý tài chính kém.';
      }
      
      fallbackSummary += '\n\n(Không thể kết nối AI để phân tích chi tiết)';
      setAiComment(fallbackSummary);
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Calculate final score - CAPPED AT 100, harder to achieve high scores
  const calculateFinalScore = () => {
    const avgScore = (gameState.productivity + gameState.equity + gameState.stability) / 3;
    
    // Reduced bonuses, harder to get
    let bonus = 0;
    if (gameState.budget > 800) bonus += 5;        // Reduced from 10, raised threshold from 500
    if (gameState.stability > 75) bonus += 5;      // Reduced from 10, raised threshold from 70
    if (Math.min(gameState.productivity, gameState.equity, gameState.stability) > 65) bonus += 8;  // Reduced from 15
    
    // Balance bonus - reward harmony between indicators
    const maxDiff = Math.max(
      Math.abs(gameState.productivity - gameState.equity),
      Math.abs(gameState.equity - gameState.stability),
      Math.abs(gameState.stability - gameState.productivity)
    );
    if (maxDiff < 15) bonus += 7;  // All three indicators close together
    
    // Penalty for bad budget management
    let penalty = 0;
    if (gameState.budget < 0) penalty += Math.abs(gameState.budget) / 50;  // -2 per 100 tỷ debt
    if (gameState.budget < -300) penalty += 5;  // Extra penalty for high debt
    
    // HARD CAP at 100
    return Math.min(100, Math.max(0, avgScore + bonus - penalty));
  };

  const getFinalRating = () => {
    const score = calculateFinalScore();
    const { productivity, equity, stability } = gameState;
    
    // Crisis endings
    if (stability < 30) return { title: 'Khủng hoảng xã hội', stars: 0, emoji: '💀', color: '#ff0000' };
    if (gameState.budget < -500) return { title: 'Phá sản quốc gia', stars: 0, emoji: '💸', color: '#ff0000' };
    
    // Perfect ending - VERY HARD to achieve
    if (productivity >= 80 && equity >= 80 && stability >= 80 && gameState.budget > 500) {
      return { title: 'Kỳ tích kinh tế XHCN', stars: 5, emoji: '🌟🌟🌟🌟🌟', color: '#ffd700' };
    }
    
    // Excellent - well balanced
    if (productivity >= 75 && equity >= 75 && stability >= 75) {
      return { title: 'Xã hội thịnh vượng', stars: 4, emoji: '⭐⭐⭐⭐', color: '#4CAF50' };
    }
    
    // Imbalanced growth
    if (productivity > 80 && equity < 55) {
      return { title: 'Tăng trưởng mất cân bằng', stars: 2, emoji: '⚠️⭐⭐', color: '#ff9800' };
    }
    
    // Stagnant but stable
    if (stability > 80 && productivity < 55) {
      return { title: 'Ổn định nhưng trì trệ', stars: 2, emoji: '😴⭐⭐', color: '#9e9e9e' };
    }
    
    // Good performance
    if (score >= 70) {
      return { title: 'Phát triển cân bằng tốt', stars: 3, emoji: '⭐⭐⭐', color: '#2196F3' };
    }
    
    // Moderate
    if (score >= 55) {
      return { title: 'Đạt yêu cầu cơ bản', stars: 2, emoji: '⭐⭐', color: '#607d8b' };
    }
    
    // Poor
    return { title: 'Cần cải thiện nhiều', stars: 1, emoji: '⭐', color: '#f44336' };
  };

  // Render intro modal
  if (showIntro) {
    return (
      <div className="game-overlay">
        <div className="game-modal intro-modal">
          <h2>🎮 Sở Hữu Hỗn Hợp</h2>
          <h3>The Ownership Mix Simulator</h3>
          
          <div className="intro-content">
            <p className="intro-text">
              <strong>Vai trò của bạn:</strong> Nhà quản lý kinh tế quốc gia Việt Nam
            </p>
            
            <div className="intro-objectives">
              <h4>🎯 Mục tiêu:</h4>
              <p><strong>Hoàn thành 10 năm nhiệm kỳ</strong> với điểm số tốt nhất bằng cách cân bằng 3 loại hình sở hữu:</p>
              <ul>
                <li>🏛️ <strong>Nhà nước:</strong> Tăng công bằng + ổn định, giảm năng suất</li>
                <li>💼 <strong>Tư nhân:</strong> Tăng năng suất, giảm công bằng + ổn định</li>
                <li>🤝 <strong>Tập thể (HTX):</strong> Cân bằng giữa năng suất và công bằng</li>
              </ul>
            </div>
            
            <div className="intro-indicators">
              <h4>📊 Quản lý 3 chỉ số chính:</h4>
              <div className="indicator-list">
                <span>🏭 <strong>Năng suất</strong> (Productivity)</span>
                <span>⚖️ <strong>Công bằng</strong> (Equity)</span>
                <span>🕊️ <strong>Ổn định</strong> (Stability)</span>
              </div>
              <p style={{marginTop: '10px', fontSize: '14px', color: '#888'}}>
                💡 Mỗi chỉ số sẽ <strong>tự nhiên giảm</strong> mỗi năm nếu không được cải thiện!
              </p>
            </div>
            
            <div className="intro-warning">
              <p>⚠️ <strong>Điều kiện Game Over:</strong></p>
              <ul>
                <li>Ổn định &lt; 30 điểm → 💀 Khủng hoảng xã hội</li>
                <li>Ngân sách &lt; -500 tỷ → 💸 Phá sản quốc gia</li>
              </ul>
            </div>
            
            <div className="intro-scoring">
              <h4>🏆 Cơ chế chấm điểm:</h4>
              <ul>
                <li><strong>Điểm cơ bản:</strong> Trung bình 3 chỉ số (max 100)</li>
                <li><strong>Bonus:</strong> Ngân sách &gt; 800 tỷ (+5), Stability &gt; 75 (+5), Cả 3 chỉ số &gt; 65 (+8), Cân bằng hài hòa (+7)</li>
                <li><strong>Penalty:</strong> Nợ công (-2 điểm/100 tỷ), Nợ &gt; 300 tỷ (-5 thêm)</li>
                <li><strong>Điểm tối đa:</strong> 100 (VERY HARD to achieve!)</li>
              </ul>
            </div>
            
            <div className="intro-difficulty">
              <p>🎯 <strong>Mức độ:</strong></p>
              <div style={{display: 'flex', gap: '10px', marginTop: '5px', flexWrap: 'wrap'}}>
                <span style={{padding: '5px 10px', background: '#4CAF50', borderRadius: '5px'}}>85-100: Xuất sắc ⭐⭐⭐⭐⭐</span>
                <span style={{padding: '5px 10px', background: '#4CAF50', borderRadius: '5px'}}>85-100: Xuất sắc ⭐⭐⭐⭐⭐</span>
                <span style={{padding: '5px 10px', background: '#2196F3', borderRadius: '5px'}}>70-84: Tốt ⭐⭐⭐⭐</span>
                <span style={{padding: '5px 10px', background: '#FF9800', borderRadius: '5px'}}>55-69: Trung bình ⭐⭐</span>
                <span style={{padding: '5px 10px', background: '#f44336', borderRadius: '5px'}}>&lt;55: Yếu ⭐</span>
              </div>
            </div>
          </div>
          
          <button className="btn-primary" onClick={() => setShowIntro(false)}>
            Bắt đầu nhiệm kỳ
          </button>
        </div>
      </div>
    );
  }

  // Render summary modal
  if (showSummary) {
    const rating = getFinalRating();
    const finalScore = calculateFinalScore();
    
    return (
      <div className="game-overlay">
        <div className="game-modal summary-modal">
          <h2>📊 Tổng kết nhiệm kỳ</h2>
          <h3>Năm {gameState.year}/10</h3>
          
          <div className="summary-rating">
            <div className="rating-title">{rating.emoji}</div>
            <h3>{rating.title}</h3>
            <p className="final-score">Điểm số: {finalScore.toFixed(1)}/100</p>
          </div>
          
          <div className="summary-stats">
            <div className="stat-row">
              <span>🏭 Năng suất:</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${gameState.productivity}%`, background: '#4CAF50' }}></div>
                <span>{gameState.productivity.toFixed(1)}</span>
              </div>
            </div>
            <div className="stat-row">
              <span>⚖️ Công bằng:</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${gameState.equity}%`, background: '#2196F3' }}></div>
                <span>{gameState.equity.toFixed(1)}</span>
              </div>
            </div>
            <div className="stat-row">
              <span>🕊️ Ổn định:</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${gameState.stability}%`, background: '#FF9800' }}></div>
                <span>{gameState.stability.toFixed(1)}</span>
              </div>
            </div>
            <div className="stat-row">
              <span>💰 Ngân sách:</span>
              <span className={gameState.budget >= 0 ? 'positive' : 'negative'}>
                {gameState.budget >= 0 ? '+' : ''}{gameState.budget} tỷ
              </span>
            </div>
          </div>
          
          <div className="ai-summary">
            <h4>🤖 Nhận xét của AI</h4>
            {isLoadingAI ? (
              <div className="loading-ai">
                <div className="spinner"></div>
                <p>AI đang phân tích kết quả...</p>
              </div>
            ) : (
              <p className="ai-text">{aiComment}</p>
            )}
          </div>
          
          <div className="summary-actions">
            <button className="btn-secondary" onClick={() => window.location.reload()}>
              Chơi lại
            </button>
            <button className="btn-primary" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main game UI
  return (
    <div className="ownership-game">
      {/* Header Bar */}
      <div className="game-header">
        <div className="game-logo">
          <span className="logo-icon">⚖️</span>
          <span className="logo-text">Sở Hữu Hỗn Hợp</span>
        </div>
        
        <div className="game-info">
          <div className="year-display">
            📅 Năm <strong>{gameState.year}</strong>/10
          </div>
          <div className="budget-display">
            💰 Ngân sách: <strong>{gameState.budget}</strong> tỷ
          </div>
        </div>
        
        <button className="btn-close" onClick={onClose}>✕</button>
      </div>

      {/* Indicators */}
      <div className="indicators-bar">
        <div className="indicator">
          <span className="indicator-icon">🏭</span>
          <span className="indicator-label">Năng suất</span>
          <div className="indicator-bar">
            <div 
              className="indicator-fill productivity" 
              style={{ width: `${gameState.productivity}%` }}
            ></div>
          </div>
          <span className="indicator-value">{gameState.productivity.toFixed(0)}</span>
        </div>
        
        <div className="indicator">
          <span className="indicator-icon">⚖️</span>
          <span className="indicator-label">Công bằng</span>
          <div className="indicator-bar">
            <div 
              className="indicator-fill equity" 
              style={{ width: `${gameState.equity}%` }}
            ></div>
          </div>
          <span className="indicator-value">{gameState.equity.toFixed(0)}</span>
        </div>
        
        <div className="indicator">
          <span className="indicator-icon">🕊️</span>
          <span className="indicator-label">Ổn định</span>
          <div className="indicator-bar">
            <div 
              className="indicator-fill stability" 
              style={{ width: `${gameState.stability}%` }}
            ></div>
          </div>
          <span className="indicator-value">{gameState.stability.toFixed(0)}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="game-content">
        {/* Center Panel - Economic Map */}
        <div className="center-panel">
          <h3 className="panel-title">🗺️ Bản đồ Kinh tế</h3>
          
          <div className="sectors-map">
            {Object.entries(gameState.sectors).map(([key, sector]) => {
              const sectorNames = {
                agriculture: '🌾 Nông nghiệp',
                industry: '🏭 Công nghiệp',
                services: '💼 Dịch vụ'
              };
              
              return (
                <div 
                  key={key} 
                  className={`sector-card ${selectedSector === key ? 'active' : ''}`}
                  onClick={() => setSelectedSector(selectedSector === key ? null : key)}
                >
                  <h4>{sectorNames[key]}</h4>
                  
                  <div className="sector-chart">
                    <div 
                      className="chart-segment state" 
                      style={{ width: `${sector.state}%` }}
                      title={`Nhà nước: ${sector.state.toFixed(0)}%`}
                    ></div>
                    <div 
                      className="chart-segment private" 
                      style={{ width: `${sector.private}%` }}
                      title={`Tư nhân: ${sector.private.toFixed(0)}%`}
                    ></div>
                    <div 
                      className="chart-segment collective" 
                      style={{ width: `${sector.collective}%` }}
                      title={`HTX: ${sector.collective.toFixed(0)}%`}
                    ></div>
                  </div>
                  
                  {selectedSector === key && (
                    <div className="sector-details">
                      <div className="ownership-slider">
                        <label>
                          🏛️ Nhà nước: {sector.state.toFixed(0)}%
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={sector.state}
                          onChange={(e) => adjustSectorOwnership(key, 'state', parseFloat(e.target.value))}
                        />
                      </div>
                      
                      <div className="ownership-slider">
                        <label>
                          💼 Tư nhân: {sector.private.toFixed(0)}%
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={sector.private}
                          onChange={(e) => adjustSectorOwnership(key, 'private', parseFloat(e.target.value))}
                        />
                      </div>
                      
                      <div className="ownership-slider">
                        <label>
                          🤝 HTX: {sector.collective.toFixed(0)}%
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={sector.collective}
                          onChange={(e) => adjustSectorOwnership(key, 'collective', parseFloat(e.target.value))}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel - Events */}
        <div className="right-panel">
          <h3 className="panel-title">📰 Sự kiện & Chính sách</h3>
          
          {currentEvent ? (
            <div className="event-card">
              <h4 className="event-title">{currentEvent.title}</h4>
              <p className="event-description">{currentEvent.description}</p>
              
              <div className="event-choices">
                {currentEvent.choices.map((choice, index) => (
                  <button 
                    key={index}
                    className="choice-btn"
                    onClick={() => handleEventChoice(choice)}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-event">
              <p>Không có sự kiện mới</p>
              <button className="btn-primary" onClick={nextTurn}>
                Kết thúc năm {gameState.year} →
              </button>
            </div>
          )}
          
          {aiComment && !isLoadingAI && (
            <div className="ai-comment">
              <h4>🤖 Nhận xét AI</h4>
              <p>{aiComment}</p>
            </div>
          )}
          
          {isLoadingAI && (
            <div className="loading-ai">
              <div className="spinner"></div>
              <p>AI đang phân tích...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnershipMixGame;
