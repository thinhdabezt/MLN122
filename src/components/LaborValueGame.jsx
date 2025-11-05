import { useState, useEffect, useRef } from 'react';
import './LaborValueGame.css';

const LaborValueGame = ({ onClose }) => {
  // Expanded products database with labor data (15 products)
  const allProducts = [
    {
      id: 1,
      name: 'Áo sơ mi',
      emoji: '👔',
      workers: 2,
      laborHours: 3,
      machines: 1,
      description: 'May áo sơ mi cotton cơ bản'
    },
    {
      id: 2,
      name: 'Điện thoại thông minh',
      emoji: '📱',
      workers: 8,
      laborHours: 12,
      machines: 4,
      description: 'Lắp ráp smartphone tầm trung'
    },
    {
      id: 3,
      name: 'Xe máy',
      emoji: '🏍️',
      workers: 15,
      laborHours: 20,
      machines: 6,
      description: 'Lắp ráp xe máy phổ thông'
    },
    {
      id: 4,
      name: 'Tô phở',
      emoji: '🍜',
      workers: 1,
      laborHours: 0.5,
      machines: 0,
      description: 'Nấu một tô phở bò'
    },
    {
      id: 5,
      name: 'Laptop',
      emoji: '💻',
      workers: 10,
      laborHours: 15,
      machines: 5,
      description: 'Lắp ráp laptop văn phòng'
    },
    {
      id: 6,
      name: 'Giày da',
      emoji: '👞',
      workers: 3,
      laborHours: 5,
      machines: 2,
      description: 'Sản xuất giày da thủ công'
    },
    {
      id: 7,
      name: 'Tivi LED',
      emoji: '📺',
      workers: 12,
      laborHours: 18,
      machines: 7,
      description: 'Lắp ráp TV màn hình phẳng'
    },
    {
      id: 8,
      name: 'Tách cà phê',
      emoji: '☕',
      workers: 1,
      laborHours: 0.3,
      machines: 0,
      description: 'Pha một tách cà phê phin'
    },
    {
      id: 9,
      name: 'Bàn gỗ',
      emoji: '🪑',
      workers: 4,
      laborHours: 8,
      machines: 3,
      description: 'Đóng bàn gỗ tự nhiên'
    },
    {
      id: 10,
      name: 'Ô tô',
      emoji: '🚗',
      workers: 25,
      laborHours: 40,
      machines: 12,
      description: 'Lắp ráp xe hơi 4 chỗ'
    },
    {
      id: 11,
      name: 'Bánh mì',
      emoji: '🥖',
      workers: 1,
      laborHours: 1,
      machines: 1,
      description: 'Nướng bánh mì baguette'
    },
    {
      id: 12,
      name: 'Điều hòa',
      emoji: '❄️',
      workers: 6,
      laborHours: 10,
      machines: 4,
      description: 'Lắp ráp máy lạnh 1 chiều'
    },
    {
      id: 13,
      name: 'Sách in',
      emoji: '📖',
      workers: 2,
      laborHours: 2,
      machines: 2,
      description: 'In và đóng quyển sách 200 trang'
    },
    {
      id: 14,
      name: 'Túi xách',
      emoji: '👜',
      workers: 2,
      laborHours: 4,
      machines: 1,
      description: 'May túi xách da cao cấp'
    },
    {
      id: 15,
      name: 'Đồng hồ',
      emoji: '⌚',
      workers: 5,
      laborHours: 7,
      machines: 3,
      description: 'Lắp ráp đồng hồ cơ'
    },
    {
      id: 16,
      name: 'Cốc thủy tinh',
      emoji: '🥤',
      workers: 2,
      laborHours: 1.5,
      machines: 2,
      description: 'Thổi và tạo hình cốc thủy tinh'
    },
    {
      id: 17,
      name: 'Gạch ốp lát',
      emoji: '🧱',
      workers: 4,
      laborHours: 2,
      machines: 3,
      description: 'Ép và nung gạch ceramic'
    },
    {
      id: 18,
      name: 'Bút bi',
      emoji: '🖊️',
      workers: 3,
      laborHours: 0.8,
      machines: 2,
      description: 'Lắp ráp bút bi nhựa'
    },
    {
      id: 19,
      name: 'Khăn tay',
      emoji: '🧣',
      workers: 2,
      laborHours: 4,
      machines: 1,
      description: 'Dệt khăn len tay'
    },
    {
      id: 20,
      name: 'Nồi inox',
      emoji: '🍲',
      workers: 3,
      laborHours: 3,
      machines: 2,
      description: 'Dập và hàn nồi inox'
    }
  ];

  // Expanded random events (10 events - increased from 6)
  const events = [
    {
      name: 'Khủng hoảng năng lượng',
      effect: 'machines',
      multiplier: 0.8,
      description: 'Giảm 20% năng suất máy móc'
    },
    {
      name: 'Tăng thuế lao động',
      effect: 'labor',
      multiplier: 1.15,
      description: 'Chi phí lao động tăng 15%'
    },
    {
      name: 'Tự động hóa hoàn toàn',
      effect: 'machines',
      multiplier: 1.5,
      description: 'Tăng 50% hiệu quả máy móc'
    },
    {
      name: 'Công nhân đình công',
      effect: 'labor',
      multiplier: 1.3,
      description: 'Giá trị lao động xã hội tăng 30%'
    },
    {
      name: 'Đột phá công nghệ',
      effect: 'machines',
      multiplier: 1.8,
      description: 'Công nghệ mới tăng 80% năng suất'
    },
    {
      name: 'Thiếu hụt lao động',
      effect: 'labor',
      multiplier: 1.4,
      description: 'Khan hiếm công nhân, giá trị lao động tăng 40%'
    },
    {
      name: 'Giá nguyên liệu tăng',
      effect: 'labor',
      multiplier: 1.2,
      description: 'Chi phí đầu vào tăng 20%'
    },
    {
      name: 'Chính sách hỗ trợ',
      effect: 'machines',
      multiplier: 1.3,
      description: 'Chính phủ trợ cấp máy móc, tăng 30% hiệu quả'
    },
    {
      name: 'Giảm giờ làm việc',
      effect: 'labor',
      multiplier: 0.85,
      description: 'Luật lao động mới, giảm 15% giờ làm'
    },
    {
      name: 'Nâng cấp dây chuyền',
      effect: 'machines',
      multiplier: 1.6,
      description: 'Modernize thiết bị, tăng 60% năng suất'
    }
  ];

  // State management
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [playerValue, setPlayerValue] = useState('');
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [aiComment, setAiComment] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [randomEvent, setRandomEvent] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef(null);

  // Initialize game with 5 random products
  const initializeGame = () => {
    const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);
    setProducts(selected);
    setCurrentProductIndex(0);
    setPlayerValue('');
    setResults([]);
    setShowResult(false);
    setGameCompleted(false);
    setAiComment('');
    setRandomEvent(null);
    setTimeRemaining(15);
    setTimedOut(false);
  };

  const currentProduct = products[currentProductIndex];

  // Initialize game on component mount
  useEffect(() => {
    if (products.length === 0 && !showIntro) {
      initializeGame();
    }
  }, [showIntro]); // eslint-disable-line react-hooks/exhaustive-deps

  // Timer countdown for each product (15 seconds)
  useEffect(() => {
    if (!showResult && !gameCompleted && products.length > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up! Auto-submit with 0 score
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    }
  }, [showResult, gameCompleted, currentProductIndex, products.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle timeout
  const handleTimeOut = () => {
    const trueVal = calculateTrueValue(currentProduct, randomEvent);
    
    const result = {
      product: currentProduct.name,
      playerValue: 0,
      trueValue: trueVal,
      errorRate: 100, // Maximum error
      score: 0, // No score for timeout
      event: randomEvent,
      timedOut: true
    };

    setResults([...results, result]);
    setTimedOut(true);
    setShowResult(true);
    clearInterval(timerRef.current);
  };

  // Calculate true labor value based on Marx's theory
  const calculateTrueValue = (product, event = null) => {
    let { laborHours, workers, machines } = product;
    
    // Apply random event effects
    if (event) {
      if (event.effect === 'labor') {
        laborHours *= event.multiplier;
      } else if (event.effect === 'machines') {
        machines = Math.floor(machines * event.multiplier);
      }
    }

    // Marx formula: value = socially necessary labor time
    // Machines reduce labor time needed
    const machineEfficiency = 1 + (machines * 0.2);
    const trueValue = (laborHours * workers) / machineEfficiency;
    
    return Math.round(trueValue * 100) / 100; // Round to 2 decimals
  };

  // Calculate error rate
  const calculateErrorRate = (playerVal, trueVal) => {
    return Math.round(Math.abs(playerVal - trueVal) / trueVal * 100);
  };

  // Calculate score for single product (EASIER: more forgiving, max 20 points)
  const calculateProductScore = (errorRate) => {
    // Only 100% accuracy gets full 20 points
    // Super forgiving formula for a better learning experience
    if (errorRate === 0) return 20; // Perfect accuracy
    
    // Ultra-forgiving formula: 20 * e^(-errorRate/50)
    // Progression: e^(-x/15) → e^(-x/25) → e^(-x/35) → e^(-x/50)
    // This makes 5% error = 18.1pts (90.5%), 10% error = 16.4pts (82%)
    const score = 20 * Math.exp(-errorRate / 50);
    
    return Math.max(0, Math.round(score * 10) / 10); // Round to 1 decimal, min 0
  };

  // Handle value submission
  const handleSubmit = () => {
    // Stop the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (!playerValue || playerValue <= 0) {
      alert('Vui lòng nhập giá trị ước tính hợp lệ!');
      // Restart timer if invalid input
      const resumeInterval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      timerRef.current = resumeInterval;
      return;
    }

    const playerVal = parseFloat(playerValue);
    const trueVal = calculateTrueValue(currentProduct, randomEvent);
    const errorRate = calculateErrorRate(playerVal, trueVal);
    const score = calculateProductScore(errorRate);

    const result = {
      product: currentProduct.name,
      playerValue: playerVal,
      trueValue: trueVal,
      errorRate,
      score,
      event: randomEvent,
      timedOut: false
    };

    setResults([...results, result]);
    setShowResult(true);
  };

  // Move to next product
  const handleNext = () => {
    if (currentProductIndex < products.length - 1) {
      setCurrentProductIndex(currentProductIndex + 1);
      setPlayerValue('');
      setShowResult(false);
      setAiComment('');
      
      // Reset timer for next product
      setTimeRemaining(15);
      setTimedOut(false);
      
      // 50% chance of random event (increased from 40%)
      if (Math.random() < 0.5) {
        const randomIdx = Math.floor(Math.random() * events.length);
        setRandomEvent(events[randomIdx]);
      } else {
        setRandomEvent(null);
      }
    } else {
      setGameCompleted(true);
    }
  };

  // Calculate final score and ranking
  const getFinalScore = () => {
    return Math.round(results.reduce((sum, r) => sum + r.score, 0) * 10) / 10;
  };

  const getRanking = () => {
    const score = getFinalScore();
    if (score >= 95) return '⭐⭐⭐⭐⭐ Nhà kinh tế Marxist chính thống';
    if (score >= 85) return '⭐⭐⭐⭐ Người học trò chăm chỉ của Marx';
    if (score >= 70) return '⭐⭐⭐ Hiểu cơ bản lý thuyết giá trị lao động';
    if (score >= 50) return '⭐⭐ Cần học thêm về kinh tế Marx';
    return '⭐ Nhà tư bản cảm tính';
  };

  // Get AI analysis
  const getAIAnalysis = async () => {
    setIsLoadingAI(true);

    const lastResult = results[results.length - 1];
    
    const prompt = `Bạn là chuyên gia kinh tế Marxist phân tích khả năng xác định giá trị lao động:

📦 SẢN PHẨM: ${lastResult.product}
- Giá trị người chơi ước tính: ${lastResult.playerValue} giờ lao động
- Giá trị thực (theo lý thuyết Marx): ${lastResult.trueValue} giờ lao động
- Độ sai lệch: ${lastResult.errorRate}%
- Điểm đạt được: ${lastResult.score}/20

${lastResult.event ? `⚡ SỰ KIỆN: ${lastResult.event.name} - ${lastResult.event.description}` : ''}

Yêu cầu phân tích (3-4 câu ngắn gọn):

1. **Đánh giá kết quả:** Người chơi có hiểu đúng về "thời gian lao động xã hội cần thiết" không?

2. **Giải thích sai lệch:** Tại sao có chênh lệch giữa ước tính và giá trị thực?

3. **Triết học mở rộng:** Liên hệ với lý thuyết giá trị lao động của Marx (giá trị sử dụng vs giá trị trao đổi, vai trò máy móc, bóc lột thặng dư...)

4. **Gợi ý cải thiện:** Nên chú ý điều gì khi ước tính sản phẩm tiếp theo?

Trả lời TIẾNG VIỆT, phong cách triết học nhưng dễ hiểu, kết hợp lý thuyết và thực tiễn.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_API_KEY_G3}`,
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
      
      // Enhanced fallback based on error rate
      let fallback = '';
      
      if (lastResult.errorRate === 0) {
        fallback = `🎯 **HOÀN HẢO!** Bạn đã xác định CHÍNH XÁC 100% giá trị lao động!\n\n✨ Điểm tối đa: ${lastResult.score}/20\n\n💡 **Triết học:** Đây là sự thấu hiểu tuyệt đối về "thời gian lao động xã hội cần thiết" - nền tảng của lý thuyết giá trị Marx. Bạn không bị chi phối bởi giá cả thị trường hay cảm tính, mà phân tích khách quan dựa trên lượng lao động kết tinh.\n\n📚 **Marx khen ngợi:** "Chỉ khi nào con người hiểu được bản chất của giá trị, họ mới có thể vạch trần bản chất của sự bóc lột tư bản."`;
      } else if (lastResult.errorRate < 5) {
        fallback = `✅ **Xuất sắc!** Sai lệch chỉ ${lastResult.errorRate}% - bạn đã xác định giá trị rất sát với thời gian lao động xã hội cần thiết.\n\n Điểm: ${lastResult.score}/20\n\n💡 **Triết học:** Giá trị của hàng hóa được quyết định bởi thời gian lao động xã hội cần thiết để sản xuất ra nó. Bạn đã nắm vững nguyên lý này!\n\n📚 **Marx nói:** "Giá trị là lao động kết tinh trong hàng hóa" - và bạn đã chứng minh điều đó.`;
      } else if (lastResult.errorRate < 15) {
        fallback = `⚠️ **Khá tốt!** Giá trị bạn ước tính hợp lý (sai lệch ${lastResult.errorRate}%), nhưng chưa phản ánh đúng toàn bộ lao động kết tinh trong sản phẩm.\n\n📊 Điểm: ${lastResult.score}/20\n\n💡 **Phân tích:** ${lastResult.playerValue > lastResult.trueValue ? 'Bạn đã ĐÁNH GIÁ QUÁ CAO - có thể nhầm lẫn giữa giá trị và giá cả thị trường. Máy móc giúp giảm thời gian lao động cần thiết.' : 'Bạn đã ĐÁNH GIÁ THẤP - có thể chưa tính đủ lao động gián tiếp (công nhân phụ trợ, bảo trì máy móc...).'}\n\n📖 **Gợi ý:** Hãy chú ý đến vai trò của máy móc - chúng không tạo ra giá trị mới, chỉ chuyển giao giá trị cũ vào sản phẩm!`;
      } else if (lastResult.errorRate < 30) {
        fallback = `⚠️ **Cần cải thiện!** Sai lệch ${lastResult.errorRate}% cho thấy bạn chưa hiểu rõ bản chất của giá trị lao động.\n\n Điểm: ${lastResult.score}/20\n\n🚨 **Vấn đề:** ${lastResult.playerValue > lastResult.trueValue * 1.5 ? 'Bạn đang nhầm lẫn giữa GIÁ TRỊ TRAO ĐỔI (market price) và GIÁ TRỊ LAO ĐỘNG (labor value). Giá cả có thể dao động do cung-cầu, nhưng giá trị chỉ phụ thuộc vào lao động!' : 'Bạn chưa tính đủ tổng lượng lao động xã hội cần thiết - bao gồm cả lao động trực tiếp và gián tiếp.'}\n\n💭 **Marx cảnh báo:** "Giá trị sử dụng không quyết định giá trị trao đổi - chỉ có lao động mới tạo ra giá trị."\n\n🎯 **Lời khuyên:** Tập trung vào THỜI GIAN LAO ĐỘNG, không phải giá cả hay cảm nhận chủ quan!`;
      } else {
        fallback = `🚨 **Sai lệch nghiêm trọng ${lastResult.errorRate}%!** Bạn đã hiểu sai cơ bản về lý luận giá trị lao động.\n\n📊 Điểm: ${lastResult.score}/20\n\n❌ **Lỗi tư duy:** Bạn đang định giá theo CẢM TÍNH hoặc dựa vào GIÁ THỊ TRƯỜNG, thay vì phân tích lượng lao động xã hội cần thiết.\n\n📚 **Bài học cơ bản:** \n- Giá trị ≠ Giá cả\n- Giá trị = Thời gian lao động xã hội cần thiết\n- Máy móc chỉ chuyển giao giá trị, KHÔNG tạo giá trị mới\n- Lao động sống (living labor) là nguồn gốc duy nhất của giá trị\n\n⚡ **Marx nói:** "Trong xã hội tư bản, người ta nhầm lẫn giá trị với giá cả - đó là ảo tưởng của tư duy thị trường."\n\n🎓 **Khuyến nghị:** Hãy quay lại đọc Chương 1 của "Tư Bản" - về hàng hóa và giá trị!`;
      }
      
      setAiComment(fallback);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const resetGame = () => {
    initializeGame();
    setShowIntro(true);
  };

  if (showIntro) {
    return (
      <div className="labor-value-overlay">
        <div className="labor-value-modal intro-modal">
          <button className="close-btn" onClick={onClose}>✕</button>
          
          <div className="intro-header">
            <h1 className="intro-title">🧵 Trò Chơi Giá Trị Lao Động</h1>
            <p className="intro-subtitle">Labor Value Challenge</p>
          </div>

          <div className="intro-content">
            <div className="intro-section">
              <h3>🎯 Mục tiêu</h3>
              <p>Xác định <strong>giá trị thực</strong> của sản phẩm dựa trên <strong>lượng lao động xã hội cần thiết</strong>, theo lý luận của Marx.</p>
              <p className="intro-challenge">💡 Thử thách: Bạn có thể định giá công bằng theo lao động, thay vì bị chi phối bởi cung-cầu hay lợi nhuận?</p>
            </div>

            <div className="intro-section">
              <h3>🎮 Cách chơi</h3>
              <ul className="intro-list">
                <li>Phân tích <strong>5 sản phẩm NGẪU NHIÊN</strong> từ 20 sản phẩm khả dụng</li>
                <li>Xem thông tin: Số công nhân, Thời gian lao động, Máy móc hỗ trợ</li>
                <li>⏱️ Bạn có <strong>15 GIÂY</strong> để đưa ra đáp án cho mỗi sản phẩm</li>
                <li>⚠️ Hết giờ = 0 điểm và không có phân tích AI</li>
                <li>Ước tính <strong>giá trị thực</strong> (tính theo giờ lao động)</li>
                <li>Hệ thống so sánh với công thức Marx và tính điểm</li>
                <li>⚡ 50% khả năng gặp sự kiện ngẫu nhiên (10 sự kiện khác nhau)!</li>
              </ul>
            </div>

            <div className="intro-section">
              <h3>📐 Công thức Marx</h3>
              <div className="formula-box">
                <p><strong>Giá trị = (Giờ lao động × Số công nhân) / (1 + Máy móc × 0.2)</strong></p>
                <p className="formula-note">💭 Máy móc không tạo giá trị mới, chỉ chuyển giao giá trị và giảm thời gian lao động cần thiết</p>
              </div>
            </div>

            <div className="intro-section">
              <h3>🏆 Chấm điểm - Siêu dễ chịu!</h3>
              <div className="scoring-table">
                <div className="score-row">
                  <span>🎯 Chính xác 100% (0% sai lệch):</span>
                  <span className="score-value">20 điểm</span>
                </div>
                <div className="score-row">
                  <span>Sai lệch ~5%:</span>
                  <span className="score-value">~18.1 điểm (90.5%)</span>
                </div>
                <div className="score-row">
                  <span>Sai lệch ~10%:</span>
                  <span className="score-value">~16.4 điểm (82%)</span>
                </div>
                <div className="score-row">
                  <span>Sai lệch ~15%:</span>
                  <span className="score-value">~14.8 điểm (74%)</span>
                </div>
                <div className="score-row">
                  <span>Sai lệch ~25%:</span>
                  <span className="score-value">~12.1 điểm (60.5%)</span>
                </div>
              </div>
              <p className="max-score">Tổng điểm tối đa: <strong>100 điểm</strong> (5 sản phẩm × 20)</p>
              <p className="formula-note">⚡ Công thức siêu dễ: Điểm = 20 × e^(-sai_lệch/50)</p>
            </div>

            <div className="intro-section">
              <h3>⭐ Xếp hạng</h3>
              <ul className="ranking-list">
                <li>95-100: ⭐⭐⭐⭐⭐ Nhà kinh tế Marxist chính thống</li>
                <li>85-94: ⭐⭐⭐⭐ Người học trò chăm chỉ của Marx</li>
                <li>70-84: ⭐⭐⭐ Hiểu cơ bản lý thuyết giá trị lao động</li>
                <li>50-69: ⭐⭐ Cần học thêm về kinh tế Marx</li>
                <li>&lt;50: ⭐ Nhà tư bản cảm tính</li>
              </ul>
            </div>
          </div>

          <button className="start-game-btn" onClick={() => {
            initializeGame();
            setShowIntro(false);
          }}>
            ▶ Bắt đầu phân tích giá trị lao động
          </button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const finalScore = getFinalScore();
    const ranking = getRanking();
    const avgError = Math.round(results.reduce((sum, r) => sum + r.errorRate, 0) / results.length);

    return (
      <div className="labor-value-overlay">
        <div className="labor-value-modal results-modal">
          <button className="close-btn" onClick={onClose}>✕</button>

          <div className="results-header">
            <h1 className="results-title">🏆 Kết Quả Cuối Cùng</h1>
            <div className="final-score-display">
              <div className="score-big">{finalScore}/100</div>
              <div className="ranking-big">{ranking}</div>
            </div>
          </div>

          <div className="results-stats">
            <div className="stat-card">
              <div className="stat-label">Độ chính xác trung bình</div>
              <div className="stat-value">{100 - avgError}%</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Sản phẩm hoàn thành</div>
              <div className="stat-value">{results.length}/5</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Điểm cao nhất</div>
              <div className="stat-value">{Math.max(...results.map(r => r.score)).toFixed(1)}/20</div>
            </div>
          </div>

          <div className="results-breakdown">
            <h3>📊 Chi tiết từng sản phẩm</h3>
            <div className="results-table">
              {results.map((result, idx) => (
                <div key={idx} className="result-row">
                  <div className="result-product">{result.product}</div>
                  <div className="result-values">
                    <span>Ước tính: {result.playerValue}h</span>
                    <span>Thực tế: {result.trueValue}h</span>
                    <span className={`error-rate ${result.errorRate < 15 ? 'good' : result.errorRate < 30 ? 'medium' : 'bad'}`}>
                      Sai lệch: {result.errorRate}%
                    </span>
                  </div>
                  <div className="result-score">{result.score.toFixed(1)}/20</div>
                </div>
              ))}
            </div>
          </div>

          <div className="final-comment">
            <h3>💭 Nhận xét triết học</h3>
            {finalScore >= 95 && (
              <p>"Bạn đã chứng minh sự thấu hiểu sâu sắc về lý thuyết giá trị lao động của Marx. Giá trị không phải là con số chủ quan, mà là biểu hiện của thời gian lao động xã hội cần thiết - bạn đã nắm vững điều này. Đây là nền tảng để hiểu bản chất của chế độ tư bản và sự bóc lột giá trị thặng dư."</p>
            )}
            {finalScore >= 85 && finalScore < 95 && (
              <p>"Bạn đã hiểu được nguyên lý cơ bản: giá trị xuất phát từ lao động, không phải từ cung-cầu hay lợi nhuận. Tuy nhiên, vẫn còn những sai lệch cho thấy bạn đôi khi còn bị ảnh hưởng bởi tư duy thị trường. Hãy nhớ: máy móc chỉ chuyển giao giá trị, chứ không tạo ra giá trị mới - chỉ có lao động sống mới làm được điều đó."</p>
            )}
            {finalScore >= 70 && finalScore < 85 && (
              <p>"Bạn đã nắm được khái niệm cơ bản về giá trị lao động, nhưng còn nhầm lẫn giữa giá trị và giá cả, giữa giá trị sử dụng và giá trị trao đổi. Marx đã chỉ ra rằng trong xã hội tư bản, con người thường bị mê hoặc bởi hình thức bề ngoài của thị trường, quên mất rằng mọi giá trị đều xuất phát từ lao động con người."</p>
            )}
            {finalScore >= 50 && finalScore < 70 && (
              <p>"Kết quả cho thấy bạn đang định giá theo cảm tính hoặc theo logic thị trường tư bản, thay vì phân tích khoa học về lượng lao động. Đây chính là 'bệnh' của kinh tế học tư sản - xa rời thực tại sản xuất, chỉ nhìn vào bề mặt trao đổi. Hãy quay lại nghiên cứu Chương 1 của 'Tư Bản' - Marx đã giải thích rất rõ về bản chất của giá trị và hàng hóa."</p>
            )}
            {finalScore < 50 && (
              <p>"Bạn cần học lại từ đầu về lý thuyết giá trị lao động. Sai lệch lớn cho thấy bạn hoàn toàn bị chi phối bởi tư duy thị trường tư bản, không hiểu rằng giá trị không phải là giá cả, mà là thời gian lao động xã hội cần thiết. Hãy bắt đầu với những khái niệm cơ bản: hàng hóa, giá trị sử dụng, giá trị trao đổi, và vai trò của lao động trong việc tạo ra giá trị."</p>
            )}
          </div>

          <div className="results-actions">
            <button className="action-btn primary" onClick={resetGame}>
              🔄 Chơi lại
            </button>
            <button className="action-btn secondary" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state while products are being initialized
  if (products.length === 0) {
    return (
      <div className="labor-value-overlay">
        <div className="labor-value-modal">
          <div className="loading-container">
            <h2>🔄 Đang chuẩn bị sản phẩm ngẫu nhiên...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="labor-value-overlay">
      <div className="labor-value-modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="game-header">
          <h1 className="game-title">🧵 Trò Chơi Giá Trị Lao Động</h1>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentProductIndex / products.length) * 100}%` }}></div>
          </div>
          <p className="progress-text">Sản phẩm {currentProductIndex + 1}/{products.length}</p>
        </div>

        {/* Random Event Banner */}
        {randomEvent && (
          <div className="event-banner">
            <span className="event-icon">⚡</span>
            <div className="event-info">
              <strong>{randomEvent.name}</strong>
              <p>{randomEvent.description}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="game-content">
          {/* Left: Product Info */}
          <div className="product-section">
            <div className="product-card">
              <div className="product-emoji">{currentProduct.emoji}</div>
              <h2 className="product-name">{currentProduct.name}</h2>
              <p className="product-description">{currentProduct.description}</p>

              <div className="product-stats">
                <div className="stat-item">
                  <span className="stat-icon">🧍‍♂️</span>
                  <div className="stat-info">
                    <div className="stat-label">Số công nhân</div>
                    <div className="stat-number">{currentProduct.workers} người</div>
                  </div>
                </div>

                <div className="stat-item">
                  <span className="stat-icon">⏱️</span>
                  <div className="stat-info">
                    <div className="stat-label">Thời gian lao động</div>
                    <div className="stat-number">{currentProduct.laborHours} giờ</div>
                  </div>
                </div>

                <div className="stat-item">
                  <span className="stat-icon">⚙️</span>
                  <div className="stat-info">
                    <div className="stat-label">Máy móc hỗ trợ</div>
                    <div className="stat-number">{currentProduct.machines} máy</div>
                  </div>
                </div>
              </div>

              <div className="theory-note">
                <strong>💭 Lý thuyết Marx:</strong>
                <p>Giá trị = Thời gian lao động xã hội cần thiết để sản xuất hàng hóa</p>
              </div>
            </div>
          </div>

          {/* Right: Input & Result */}
          <div className="analysis-section">
            {/* Timer Display */}
            <div className={`timer-display ${timeRemaining <= 5 ? 'timer-critical' : ''}`}>
              ⏱️ Thời gian: <strong>{timeRemaining}s</strong>
            </div>

            <div className="input-card">
              <h3>🧮 Ước tính giá trị thực</h3>
              <p className="input-hint">Theo bạn, sản phẩm này có giá trị bao nhiêu giờ lao động?</p>
              
              <div className="input-group">
                <input
                  type="number"
                  className="value-input"
                  value={playerValue}
                  onChange={(e) => setPlayerValue(e.target.value)}
                  placeholder="Nhập số giờ lao động..."
                  min="0"
                  step="0.1"
                  disabled={showResult}
                />
                <span className="input-unit">giờ</span>
              </div>

              {!showResult && (
                <button className="submit-btn" onClick={handleSubmit}>
                  ✅ Xác nhận giá trị
                </button>
              )}
            </div>

            {/* Result Display */}
            {showResult && (
              <div className="result-card">
                <h3>📊 Kết quả phân tích</h3>
                
                <div className="result-comparison">
                  <div className="comparison-item">
                    <div className="comparison-label">Ước tính của bạn</div>
                    <div className="comparison-value player">{results[results.length - 1].playerValue} giờ</div>
                  </div>
                  
                  <div className="comparison-arrow">→</div>
                  
                  <div className="comparison-item">
                    <div className="comparison-label">Giá trị thực (Marx)</div>
                    <div className="comparison-value true">{results[results.length - 1].trueValue} giờ</div>
                  </div>
                </div>

                <div className="result-metrics">
                  <div className="metric">
                    <span className="metric-label">Độ sai lệch:</span>
                    <span className={`metric-value ${results[results.length - 1].errorRate < 15 ? 'good' : results[results.length - 1].errorRate < 30 ? 'medium' : 'bad'}`}>
                      {results[results.length - 1].errorRate}%
                    </span>
                  </div>
                  
                  <div className="metric">
                    <span className="metric-label">Điểm số:</span>
                    <span className="metric-value score">{results[results.length - 1].score.toFixed(1)}/20</span>
                  </div>
                </div>

                <div className="result-actions">
                  <button 
                    className="action-btn ai-btn" 
                    onClick={getAIAnalysis}
                    disabled={isLoadingAI || aiComment || (results[results.length - 1].timedOut)}
                  >
                    {(results[results.length - 1].timedOut) ? '⏱️ Hết giờ - Không có AI' :
                     isLoadingAI ? '⏳ Đang phân tích...' : 
                     aiComment ? '✅ Đã có phân tích' : 
                     '🤖 Phân tích của AI'}
                  </button>
                  
                  <button className="action-btn next-btn" onClick={handleNext}>
                    {currentProductIndex < products.length - 1 ? '➡️ Sản phẩm tiếp theo' : '🏆 Xem kết quả'}
                  </button>
                </div>

                {/* AI Comment */}
                {aiComment && (
                  <div className="ai-comment-box">
                    <div className="ai-comment-header">
                      <span className="ai-icon">🤖</span>
                      <strong>Phân tích từ góc nhìn Marxist:</strong>
                    </div>
                    <div className="ai-comment-content">
                      {aiComment.split('\n').map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                    <div className="ai-disclaimer" style={{
                      marginTop: '12px',
                      padding: '8px 12px',
                      background: 'rgba(255, 193, 7, 0.1)',
                      border: '1px solid rgba(255, 193, 7, 0.3)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#FFB74D',
                      fontStyle: 'italic'
                    }}>
                      ⚠️ <strong>Lưu ý:</strong> Nhận xét này được tạo bởi AI (Gemini/ChatGPT) và chỉ mang tính tham khảo. 
                      Vui lòng tự kiểm chứng với lý thuyết Marx gốc.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Score Summary */}
            <div className="score-summary">
              <h4>📈 Tổng điểm hiện tại</h4>
              <div className="current-score">{getFinalScore()}/{results.length * 20}</div>
              <div className="completed-products">
                {results.map((r, idx) => (
                  <span key={idx} className={`product-dot ${r.score >= 15 ? 'good' : r.score >= 10 ? 'medium' : 'bad'}`}></span>
                ))}
                {Array.from({ length: 5 - results.length }).map((_, idx) => (
                  <span key={`empty-${idx}`} className="product-dot empty"></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaborValueGame;
