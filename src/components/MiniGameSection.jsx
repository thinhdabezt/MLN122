import { useState } from 'react';
import OwnershipMixGame from './OwnershipMixGame';
import SurplusHunterGame from './SurplusHunterGame';
import LaborValueGame from './LaborValueGame';
import './MiniGameSection.css';

const MiniGameSection = ({ setActiveTab }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [playingGame, setPlayingGame] = useState(null);

  const games = [
    {
      id: 'ownership-mix',
      emoji: '⚖️',
      title: 'Quyền Sở Hữu Hỗn Hợp',
      subtitle: 'Ownership Mix',
      description: 'Mô phỏng quản lý kinh tế quốc gia với 3 loại hình sở hữu',
      teaser: 'Điều hành nền kinh tế trong 10 năm: cân bằng sở hữu Nhà nước, Tư nhân, Tập thể để tối ưu năng suất, công bằng và ổn định xã hội.',
      imagePlaceholder: 'ownership-mix-game',
      color: '#B53F3F',
      marxQuote: '"Sở hữu tư nhân về tư liệu sản xuất là gốc rễ của bóc lột." - K. Marx',
      tooltip: 'Game mô phỏng: Quản lý 3 chỉ số kinh tế qua 10 năm nhiệm kỳ',
      details: {
        gameplay: [
          'Bạn là Nhà quản lý kinh tế quốc gia trong 10 năm nhiệm kỳ',
          'Mỗi năm: gặp 1 sự kiện ngẫu nhiên, chọn 1 trong 3 phương án (Nhà nước, Tư nhân, Tập thể)',
          'Theo dõi 3 chỉ số: Năng suất (Productivity), Công bằng (Equity), Ổn định (Stability)',
          'Quản lý ngân sách: mỗi quyết định ảnh hưởng đến tài chính quốc gia',
          '⚠️ Lưu ý: Các chỉ số tự nhiên giảm mỗi năm nếu không được cải thiện!',
          'Mục tiêu: Hoàn thành 10 năm với điểm số cao nhất (max 100 điểm)'
        ],
        scoring: 'Điểm cơ bản: Trung bình 3 chỉ số. Bonus: Ngân sách dồi dào (+5), Ổn định cao (+5), Cân bằng hài hòa (+15). Penalty: Nợ công (-2/100 tỷ). Điểm tối đa: 100 (VERY HARD!).',
        aiReaction: 'AI Gemini 2.0 phân tích từng quyết định của bạn theo góc nhìn kinh tế Marxist, đánh giá tác động đến giai cấp công nhân, và đưa ra nhận xét tổng kết sau 10 năm nhiệm kỳ.',
        infographic: 'Dashboard kinh tế thời gian thực: 3 chỉ số chính + biểu đồ ngân sách + lịch sử quyết định'
      }
    },
    {
      id: 'surplus-hunter',
      emoji: '💰',
      title: 'Lao Động & Giá Trị Thặng Dư',
      subtitle: 'Surplus Hunter',
      description: 'Mô phỏng nhà máy: cân bằng giữa lợi nhuận và công bằng xã hội',
      teaser: 'Điều phối công nhân, lương, tự động hóa để tối đa giá trị thặng dư mà không gây bất ổn xã hội.',
      imagePlaceholder: 'surplus-value-game',
      color: '#F3C969',
      marxQuote: '"Giá trị thặng dư là nguồn gốc của lợi nhuận tư bản." - K. Marx, Tư bản',
      tooltip: '⚙️ Mô phỏng: Quản lý nhà máy với 4 biến số kinh tế',
      details: {
        gameplay: [
          'Bạn là chủ nhà máy trong nền kinh tế XHCN - thử thách 30 giây',
          'Điều chỉnh 4 tham số: Số công nhân (0-50), Lương ($0-100), Tự động hóa (0-100%), Tốc độ làm việc (0-200%)',
          'Hệ thống tính toán: Giá trị sản xuất, Chi phí lao động, Giá trị thặng dư, Mức bất bình đẳng',
          'Tác động thực tế: Tự động hóa cao → thất nghiệp tăng, Lương thấp → bóc lột lao động',
          'Mục tiêu: Thặng dư > $1500 + Bất bình đẳng < 25% + Lương ≥ $70 = Điểm cao'
        ],
        scoring: 'Hệ thống chấm điểm thách thức: Production (30pts - surplus >$2000), Inequality (35pts - <15%), Balance (20pts - cả hai), Welfare (15pts - wage ≥$70). Penalty nghiêm khắc. Đạt 85+ điểm = Lý tưởng XHCN!',
        aiReaction: 'AI Gemini 2.0 phân tích theo lý thuyết Marx về giá trị thặng dư (m/v), đánh giá mức độ bóc lột lao động, tác động xã hội của tự động hóa, và đề xuất điều chỉnh cụ thể với SỐ LIỆU CHÍNH XÁC.',
        infographic: 'Dashboard nhà máy với Timer 30s: Sliders điều khiển + Kết quả kinh tế + Biểu đồ bất bình đẳng + AI phân tích'
      }
    },
    {
      id: 'labor-value',
      emoji: '🧵',
      title: 'Trò Chơi Giá Trị Lao Động',
      subtitle: 'Labor Value Challenge',
      description: 'Xác định giá trị sản phẩm theo thời gian lao động xã hội cần thiết',
      teaser: 'Ước lượng giờ công cần thiết để tạo ra sản phẩm – bạn hiểu lý luận Mác đến đâu?',
      imagePlaceholder: 'labor-value-game',
      color: '#8B4513',
      marxQuote: '"Giá trị của hàng hóa được quyết định bởi thời gian lao động xã hội cần thiết." - K. Marx',
      tooltip: '⏱️ 15 giây mỗi sản phẩm | Công thức siêu dễ: e^(-x/50)',
      details: {
        gameplay: [
          'Phân tích 5 sản phẩm NGẪU NHIÊN từ 20 sản phẩm khả dụng (áo, điện thoại, xe, phở, laptop, giày, TV, cà phê, bàn, ô tô, bánh mì, điều hòa, sách, túi, đồng hồ, cốc, gạch, bút, khăn, nồi)',
          '⏱️ Bạn có 15 GIÂY để đưa ra đáp án cho mỗi sản phẩm (hết giờ = 0 điểm)',
          'Xem thông tin: Số công nhân, Thời gian lao động, Máy móc hỗ trợ',
          'Ước tính giá trị thực (tính theo giờ lao động xã hội cần thiết)',
          'So sánh với công thức Marx: (Giờ × Công nhân) / (1 + Máy × 0.2)',
          '⚡ 50% khả năng gặp 1 trong 10 sự kiện: khủng hoảng, đình công, tự động hóa, tăng thuế, đột phá, thiếu lao động, tăng nguyên liệu, trợ cấp, giảm giờ, nâng cấp...'
        ],
        scoring: 'Hệ thống SIÊU DỄ CHỊU: Chính xác 100% = 20đ. Sai lệch 5% = 18.1đ (90.5%), sai lệch 10% = 16.4đ (82%), sai lệch 15% = 14.8đ (74%). Công thức: 20×e^(-sai_lệch/50). Tổng 100 điểm. ⭐⭐⭐⭐⭐ (95+): Marxist chính thống!',
        aiReaction: 'AI Gemini 2.0 phân tích từ góc nhìn Marxist: Bạn có hiểu đúng "thời gian lao động xã hội cần thiết"? Giải thích sai lệch, liên hệ lý thuyết giá trị (giá trị sử dụng vs trao đổi, vai trò máy móc, bóc lột thặng dư). Phản hồi đặc biệt nếu đạt 100% chính xác! ⚠️ Hết giờ = không có AI phân tích.',
        infographic: 'Dashboard với Timer 15s: Sản phẩm ngẫu nhiên → Thông số (CN, giờ, máy) → Sự kiện (nếu có) → Ước tính → Giá trị thực → Sai lệch % → Điểm (e^-formula) → AI phân tích triết học'
      }
    },
    {
      id: 'guided-market',
      emoji: '🌏',
      title: 'Thị Trường Định Hướng XHCN',
      subtitle: 'The Guided Market',
      description: 'Điều hành nền kinh tế thị trường định hướng xã hội chủ nghĩa',
      teaser: 'Điều chỉnh thuế, đầu tư công, tỷ lệ sở hữu nhà nước để cân bằng tăng trưởng và công bằng.',
      imagePlaceholder: 'guided-market-game',
      color: '#DC143C',
      marxQuote: '"Trong giai đoạn quá độ, nhà nước công nhân nắm giữ những ngành then chốt." - V.I. Lenin',
      tooltip: '🇻🇳 Đầu tư công VN: 5.8% GDP (2023) | Mục tiêu 2030: 7-8% GDP',
      details: {
        gameplay: [
          'Bạn là Thủ tướng nền kinh tế ảo: điều chỉnh 5 công cụ chính sách',
          '1. Thuế doanh nghiệp (10-35%) | 2. Đầu tư công (3-10% GDP)',
          '3. Tỷ lệ sở hữu NN (20-60%) | 4. Hỗ trợ doanh nghiệp nhỏ | 5. Kiểm soát giá',
          'Theo dõi 4 chỉ số: Tăng trưởng GDP, Gini, Thất nghiệp, Nợ công',
          'Mục tiêu: Đạt GDP +7%, Gini <0.4, Thất nghiệp <3%, Nợ <65% GDP'
        ],
        scoring: 'Điểm tổng hợp dựa trên cân bằng 4 chỉ số. Bonus nếu đạt mục tiêu trong 10 bước.',
        aiReaction: 'AI đánh giá chiến lược của bạn theo mô hình kinh tế thị trường định hướng XHCN của Việt Nam và so sánh với các nước XHCN khác (Trung Quốc, Lào, Cuba).',
        infographic: 'Dashboard kinh tế với 4 biểu đồ thời gian thực + radar chart cân bằng mục tiêu'
      }
    }
  ];

  const openModal = (gameId) => {
    setSelectedGame(games.find(g => g.id === gameId));
  };

  const closeModal = () => {
    setSelectedGame(null);
  };

  return (
    <section className="minigame-section">
      {/* Header Area */}
      <div className="minigame-header">
        <h2 className="minigame-title text-gradient">
          Minigame – Tư Duy Marxist Qua Trải Nghiệm
        </h2>
        <p className="minigame-subtitle">
          Học lý luận qua hành động: từ sở hữu, lao động, giá trị đến thị trường định hướng XHCN.
        </p>
        <div className="title-divider"></div>
      </div>

      {/* Main Grid Area - 4 Game Cards */}
      <div className="games-grid">
        {games.map((game) => (
          <div
            key={game.id}
            className="game-card group"
            style={{ '--game-color': game.color }}
          >
            {/* Image Placeholder */}
            <div className="game-image-container">
              <div className="game-image-placeholder">
                <span className="game-emoji">{game.emoji}</span>
                <span className="placeholder-text">{game.imagePlaceholder}</span>
              </div>
              {/* Marx Quote Overlay - appears on hover */}
              <div className="marx-quote-overlay">
                <p className="quote-text">{game.marxQuote}</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="game-content">
              <div className="game-header">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-subtitle">{game.subtitle}</p>
              </div>

              <p className="game-description">{game.description}</p>
              <p className="game-teaser">{game.teaser}</p>

              {/* Tooltip - Stats */}
              <div className="game-tooltip">
                <span className="tooltip-icon">ℹ️</span>
                <span className="tooltip-text">{game.tooltip}</span>
              </div>

              {/* Play Button */}
              <button
                className="game-play-btn"
                onClick={() => openModal(game.id)}
                style={{ borderColor: game.color }}
              >
                <span className="play-icon">▶</span>
                Chơi ngay
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Footer Block */}
      <div className="minigame-cta">
        <p className="cta-text">
          💡 Lý thuyết Marxist thật sống động khi bạn được chơi!
        </p>
        <div className="cta-buttons">
          <button 
            className="cta-btn secondary"
            onClick={() => setActiveTab('case-study')}
          >
            ← Quay lại Case Study
          </button>
          <button 
            className="cta-btn primary"
            onClick={() => setActiveTab('home')}
          >
            Khám phá lý thuyết →
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedGame && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="game-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              ✕
            </button>

            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">
                {selectedGame.emoji} {selectedGame.title}
              </h2>
              <p className="modal-subtitle">{selectedGame.subtitle}</p>
            </div>

            {/* Game Image/Infographic Placeholder */}
            <div className="modal-image-container">
              <div className="modal-image-placeholder">
                <span className="modal-emoji">{selectedGame.emoji}</span>
                <p className="modal-image-text">{selectedGame.details.infographic}</p>
                <span className="placeholder-label">{selectedGame.imagePlaceholder}</span>
              </div>
            </div>

            {/* Gameplay Description */}
            <div className="modal-section gameplay-section">
              <h3 className="section-title">🎮 Cách Chơi</h3>
              <ul className="gameplay-list">
                {selectedGame.details.gameplay.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Scoring System */}
            <div className="modal-section scoring-section">
              <h3 className="section-title">🏆 Cơ Chế Chấm Điểm</h3>
              <p>{selectedGame.details.scoring}</p>
            </div>

            {/* AI Reaction Box */}
            <div className="modal-section ai-section">
              <h3 className="section-title">🤖 AI Phản Hồi Thông Minh</h3>
              <div className="ai-reaction-box">
                <p>{selectedGame.details.aiReaction}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button 
                className="modal-btn play-demo" 
                style={{ backgroundColor: selectedGame.color }}
                onClick={() => {
                  if (selectedGame.id === 'ownership-mix') {
                    setPlayingGame('ownership-mix');
                    closeModal();
                  } else if (selectedGame.id === 'surplus-hunter') {
                    setPlayingGame('surplus-hunter');
                    closeModal();
                  } else if (selectedGame.id === 'labor-value') {
                    setPlayingGame('labor-value');
                    closeModal();
                  } else {
                    alert('Game này đang trong quá trình phát triển. Hiện tại có 3 game khả dụng: "Sở Hữu Hỗn Hợp", "Giá Trị Thặng Dư", và "Giá Trị Lao Động".');
                  }
                }}
              >
                ▶ Chơi thử ngay
              </button>
              <button className="modal-btn close" onClick={closeModal}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render Actual Game */}
      {playingGame === 'ownership-mix' && (
        <OwnershipMixGame onClose={() => setPlayingGame(null)} />
      )}
      {playingGame === 'surplus-hunter' && (
        <SurplusHunterGame onClose={() => setPlayingGame(null)} />
      )}
      {playingGame === 'labor-value' && (
        <LaborValueGame onClose={() => setPlayingGame(null)} />
      )}
    </section>
  );
};

export default MiniGameSection;
