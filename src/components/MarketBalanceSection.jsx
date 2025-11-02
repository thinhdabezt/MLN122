import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale, TrendingUp, Users, ShieldCheck, Award, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import './MarketBalanceSection.css';

gsap.registerPlugin(ScrollTrigger);

const MarketBalanceSection = () => {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  const [sliderValues, setSliderValues] = useState({
    market: 50,
    state: 50,
    welfare: 50
  });
  const [balanceStatus, setBalanceStatus] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.balance-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.slider-control', {
        scrollTrigger: {
          trigger: '.sliders-container',
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
      });

      gsap.from('.balance-chart-container', {
        scrollTrigger: {
          trigger: '.balance-chart-container',
          start: 'top 80%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Update chart bars when sliders change
  useEffect(() => {
    if (chartRef.current) {
      gsap.to('.chart-bar', {
        height: (index) => {
          const values = [sliderValues.market, sliderValues.state, sliderValues.welfare];
          return `${values[index] * 2.5}px`;
        },
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [sliderValues]);

  const handleSliderChange = (key, value) => {
    setSliderValues(prev => ({
      ...prev,
      [key]: parseInt(value)
    }));
    setShowResult(false);

    // Play subtle sound effect (optional)
    playSliderSound();
  };

  const playSliderSound = () => {
    // Tạo âm thanh nhẹ khi kéo slider
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playBalanceSound = () => {
    // Âm thanh khi đạt cân bằng
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 523.25; // Note C5
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const checkBalance = () => {
    const { market, state, welfare } = sliderValues;
    
    // Tính điểm cân bằng dựa trên mô hình XHCN Việt Nam
    // Tối ưu: Market ~50-70, State ~40-60, Welfare ~50-70
    const marketScore = Math.abs(market - 60) < 15 ? 1 : 0;
    const stateScore = Math.abs(state - 50) < 15 ? 1 : 0;
    const welfareScore = Math.abs(welfare - 60) < 15 ? 1 : 0;
    
    const totalScore = marketScore + stateScore + welfareScore;

    let status = null;
    if (totalScore === 3) {
      status = {
        type: 'perfect',
        icon: CheckCircle,
        title: 'Hoàn hảo! Cân bằng XHCN đạt mức tối ưu! 🎉',
        message: 'Bạn đã tạo ra một mô hình kinh tế thị trường định hướng xã hội chủ nghĩa cân bằng, phù hợp với con đường của Việt Nam.',
        color: '#10B981',
        details: [
          '✅ Thị trường tự do đủ để kích thích tăng trưởng',
          '✅ Nhà nước định hướng hiệu quả',
          '✅ Phúc lợi xã hội được đảm bảo'
        ]
      };
      playBalanceSound();
      // Hiệu ứng rung nhẹ
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    } else if (totalScore === 2) {
      status = {
        type: 'good',
        icon: AlertCircle,
        title: 'Gần đạt! Cần điều chỉnh nhẹ',
        message: 'Mô hình của bạn đang tiến gần đến cân bằng XHCN. Hãy tinh chỉnh thêm!',
        color: '#F59E0B',
        details: getAdjustmentTips(market, state, welfare)
      };
    } else {
      status = {
        type: 'imbalance',
        icon: XCircle,
        title: 'Chưa cân bằng - Cần điều chỉnh',
        message: 'Mô hình này có thể gây mất cân bằng kinh tế - xã hội.',
        color: '#EF4444',
        details: getAdjustmentTips(market, state, welfare)
      };
    }

    setBalanceStatus(status);
    setShowResult(true);

    // Animate result popup
    gsap.from('.balance-result', {
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    });
  };

  const getAdjustmentTips = (market, state, welfare) => {
    const tips = [];
    
    if (market < 45) {
      tips.push('⚠️ Thị trường quá hạn chế → Thiếu động lực tăng trưởng');
    } else if (market > 75) {
      tips.push('⚠️ Thị trường quá tự do → Nguy cơ bất bình đẳng cao');
    } else {
      tips.push('✅ Tự do thị trường ở mức hợp lý');
    }

    if (state < 35) {
      tips.push('⚠️ Nhà nước quản lý yếu → Thiếu định hướng');
    } else if (state > 65) {
      tips.push('⚠️ Nhà nước can thiệp quá mức → Kìm hãm sáng tạo');
    } else {
      tips.push('✅ Quản lý Nhà nước ở mức phù hợp');
    }

    if (welfare < 45) {
      tips.push('⚠️ Phúc lợi xã hội thấp → Thiếu công bằng');
    } else if (welfare > 75) {
      tips.push('⚠️ Phúc lợi quá cao → Nguy cơ gánh nặng ngân sách');
    } else {
      tips.push('✅ Phúc lợi xã hội đảm bảo hài hòa');
    }

    return tips;
  };

  const resetSliders = () => {
    setSliderValues({
      market: 50,
      state: 50,
      welfare: 50
    });
    setShowResult(false);
    setBalanceStatus(null);
  };

  // Preset mô hình kinh tế
  const applyPreset = (preset) => {
    const presets = {
      capitalism: { market: 85, state: 25, welfare: 35 },
      socialism: { market: 30, state: 85, welfare: 75 },
      vietnam: { market: 60, state: 50, welfare: 60 }
    };

    setSliderValues(presets[preset]);
    setShowResult(false);
  };

  return (
    <section ref={sectionRef} className="market-balance-section py-20 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="balance-header text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scale className="w-12 h-12 text-soft-gold" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Kinh tế thị trường định hướng <span className="text-gradient bg-gradient-to-r from-soft-gold to-red-earth bg-clip-text text-transparent">XHCN</span>
            </h2>
          </div>
          <p className="text-xl text-smoke-gray font-serif italic">
            Tăng trưởng – Công bằng – Ổn định
          </p>
          <p className="mt-4 text-smoke-gray max-w-3xl mx-auto leading-relaxed">
            Không phải tư bản thuần túy, không phải kế hoạch hóa tập trung. 
            Việt Nam chọn con đường kết hợp hài hòa: <strong className="text-soft-gold">thị trường tự do + định hướng Nhà nước + phúc lợi xã hội</strong>.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Interactive Sliders */}
          <div className="sliders-container">
            <div className="sliders-wrapper bg-gradient-to-br from-gray-900/80 to-gray-800/90 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-soft-gold" />
                Điều chỉnh các yếu tố
              </h3>
              <p className="text-smoke-gray mb-8 text-sm">
                Thử nghiệm các mô hình kinh tế khác nhau bằng cách điều chỉnh ba yếu tố chính
              </p>

              {/* Slider 1: Tự do thị trường */}
              <div className="slider-control mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Tự do thị trường
                  </label>
                  <span className="text-soft-gold font-bold text-lg">{sliderValues.market}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValues.market}
                  onChange={(e) => handleSliderChange('market', e.target.value)}
                  className="slider market-slider"
                />
                <div className="flex justify-between text-xs text-smoke-gray mt-2">
                  <span>Kế hoạch hóa</span>
                  <span>Tự do tuyệt đối</span>
                </div>
              </div>

              {/* Slider 2: Quản lý Nhà nước */}
              <div className="slider-control mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-red-400" />
                    Quản lý Nhà nước
                  </label>
                  <span className="text-soft-gold font-bold text-lg">{sliderValues.state}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValues.state}
                  onChange={(e) => handleSliderChange('state', e.target.value)}
                  className="slider state-slider"
                />
                <div className="flex justify-between text-xs text-smoke-gray mt-2">
                  <span>Tự do hoàn toàn</span>
                  <span>Kiểm soát toàn diện</span>
                </div>
              </div>

              {/* Slider 3: Phúc lợi xã hội */}
              <div className="slider-control mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-400" />
                    Phúc lợi xã hội
                  </label>
                  <span className="text-soft-gold font-bold text-lg">{sliderValues.welfare}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValues.welfare}
                  onChange={(e) => handleSliderChange('welfare', e.target.value)}
                  className="slider welfare-slider"
                />
                <div className="flex justify-between text-xs text-smoke-gray mt-2">
                  <span>Tự lo liệu</span>
                  <span>Phúc lợi toàn diện</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={checkBalance}
                  className="check-balance-btn flex-1 bg-gradient-to-r from-red-earth to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Award className="w-5 h-5" />
                  Kiểm tra cân bằng
                </button>
                <button
                  onClick={resetSliders}
                  className="reset-btn bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300"
                >
                  Reset
                </button>
              </div>

              {/* Preset Models */}
              <div className="preset-models">
                <p className="text-smoke-gray text-sm mb-3">Hoặc thử các mô hình mẫu:</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => applyPreset('capitalism')}
                    className="preset-btn bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 py-2 px-3 rounded-lg text-xs font-semibold transition-all"
                  >
                    Tư bản
                  </button>
                  <button
                    onClick={() => applyPreset('socialism')}
                    className="preset-btn bg-red-900/40 hover:bg-red-800/60 text-red-200 py-2 px-3 rounded-lg text-xs font-semibold transition-all"
                  >
                    XHCN cổ điển
                  </button>
                  <button
                    onClick={() => applyPreset('vietnam')}
                    className="preset-btn bg-yellow-900/40 hover:bg-yellow-800/60 text-yellow-200 py-2 px-3 rounded-lg text-xs font-semibold transition-all"
                  >
                    Việt Nam
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Real-time Bar Chart */}
          <div className="balance-chart-container">
            <div ref={chartRef} className="chart-wrapper bg-gradient-to-br from-gray-900/80 to-gray-800/90 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Biểu đồ cân bằng động
              </h3>
              
              {/* Bar Chart */}
              <div className="chart-bars flex items-end justify-around gap-6 h-[300px] mb-8">
                <div className="chart-bar-wrapper flex flex-col items-center">
                  <div className="chart-bar-container relative w-20 h-full flex items-end">
                    <div 
                      className="chart-bar market-bar w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-xl transition-all duration-400 relative"
                      style={{ height: `${sliderValues.market * 2.5}px` }}
                    >
                      <div className="bar-glow"></div>
                    </div>
                  </div>
                  <p className="text-white font-semibold mt-3 text-center text-sm">Thị trường</p>
                  <p className="text-soft-gold font-bold text-lg">{sliderValues.market}%</p>
                </div>

                <div className="chart-bar-wrapper flex flex-col items-center">
                  <div className="chart-bar-container relative w-20 h-full flex items-end">
                    <div 
                      className="chart-bar state-bar w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-xl transition-all duration-400 relative"
                      style={{ height: `${sliderValues.state * 2.5}px` }}
                    >
                      <div className="bar-glow"></div>
                    </div>
                  </div>
                  <p className="text-white font-semibold mt-3 text-center text-sm">Nhà nước</p>
                  <p className="text-soft-gold font-bold text-lg">{sliderValues.state}%</p>
                </div>

                <div className="chart-bar-wrapper flex flex-col items-center">
                  <div className="chart-bar-container relative w-20 h-full flex items-end">
                    <div 
                      className="chart-bar welfare-bar w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-xl transition-all duration-400 relative"
                      style={{ height: `${sliderValues.welfare * 2.5}px` }}
                    >
                      <div className="bar-glow"></div>
                    </div>
                  </div>
                  <p className="text-white font-semibold mt-3 text-center text-sm">Phúc lợi</p>
                  <p className="text-soft-gold font-bold text-lg">{sliderValues.welfare}%</p>
                </div>
              </div>

              {/* Optimal Range Indicator */}
              <div className="optimal-range-box bg-soft-gold/10 border border-soft-gold/30 rounded-xl p-4">
                <p className="text-soft-gold font-semibold mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Vùng cân bằng XHCN tối ưu:
                </p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="text-center">
                    <p className="text-blue-300 font-semibold">Thị trường</p>
                    <p className="text-white">50-70%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-red-300 font-semibold">Nhà nước</p>
                    <p className="text-white">40-60%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-300 font-semibold">Phúc lợi</p>
                    <p className="text-white">50-70%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Balance Result Popup */}
        {showResult && balanceStatus && (
          <div className="balance-result mt-12 bg-gradient-to-br from-gray-900/95 to-gray-800/95 p-8 rounded-3xl border-2 backdrop-blur-sm shadow-2xl" style={{ borderColor: balanceStatus.color }}>
            <div className="flex items-start gap-4">
              <div className="result-icon p-4 rounded-2xl" style={{ backgroundColor: `${balanceStatus.color}20` }}>
                <balanceStatus.icon className="w-10 h-10" style={{ color: balanceStatus.color }} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2" style={{ color: balanceStatus.color }}>
                  {balanceStatus.title}
                </h3>
                <p className="text-smoke-gray mb-4 leading-relaxed">
                  {balanceStatus.message}
                </p>
                <div className="details-list space-y-2">
                  {balanceStatus.details.map((detail, index) => (
                    <p key={index} className="text-white text-sm flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{detail}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Educational Cards */}
        <div className="educational-cards grid md:grid-cols-3 gap-6 mt-16">
          
          {/* Card 1: Capitalism */}
          <div className="edu-card bg-gradient-to-br from-blue-900/40 to-blue-800/40 p-6 rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
            <div className="card-icon w-14 h-14 bg-blue-500/30 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-blue-300" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Chủ nghĩa tư bản</h4>
            <p className="text-blue-100 text-sm mb-3 leading-relaxed">
              <strong>Bàn tay vô hình:</strong> Thị trường tự điều tiết cung-cầu, giá cả.
            </p>
            <ul className="text-blue-200 text-xs space-y-1">
              <li>✅ Hiệu quả kinh tế cao</li>
              <li>✅ Khuyến khích cạnh tranh</li>
              <li>❌ Bất bình đẳng gia tăng</li>
              <li>❌ Khủng hoảng chu kỳ</li>
            </ul>
          </div>

          {/* Card 2: Socialism */}
          <div className="edu-card bg-gradient-to-br from-red-900/40 to-red-800/40 p-6 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105">
            <div className="card-icon w-14 h-14 bg-red-500/30 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7 text-red-300" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">XHCN cổ điển</h4>
            <p className="text-red-100 text-sm mb-3 leading-relaxed">
              <strong>Kế hoạch hóa tập trung:</strong> Nhà nước chi phối mọi hoạt động kinh tế.
            </p>
            <ul className="text-red-200 text-xs space-y-1">
              <li>✅ Công bằng xã hội cao</li>
              <li>✅ Ổn định giá cả</li>
              <li>❌ Thiếu động lực cạnh tranh</li>
              <li>❌ Kém hiệu quả sản xuất</li>
            </ul>
          </div>

          {/* Card 3: Vietnam Model */}
          <div className="edu-card bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 p-6 rounded-2xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
            <div className="card-icon w-14 h-14 bg-yellow-500/30 rounded-xl flex items-center justify-center mb-4">
              <Scale className="w-7 h-7 text-yellow-300" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">KTTTĐH XHCN VN</h4>
            <p className="text-yellow-100 text-sm mb-3 leading-relaxed">
              <strong>Hài hòa 3 yếu tố:</strong> Thị trường + Nhà nước + Phúc lợi.
            </p>
            <ul className="text-yellow-200 text-xs space-y-1">
              <li>✅ Tăng trưởng bền vững</li>
              <li>✅ Công bằng xã hội</li>
              <li>✅ Linh hoạt thích ứng</li>
              <li>✅ Phát triển con người</li>
            </ul>
          </div>

        </div>

      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/4 left-10 w-40 h-40 bg-soft-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-60 h-60 bg-red-earth/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default MarketBalanceSection;
