import { useState } from 'react';
import OwnershipMixGame from './OwnershipMixGame';
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
      description: 'Điều phối sản xuất để tối ưu giá trị thặng dư',
      teaser: 'Cân bằng giữa năng suất lao động, chi phí sản xuất và công bằng xã hội.',
      imagePlaceholder: 'surplus-value-game',
      color: '#F3C969',
      marxQuote: '"Giá trị thặng dư là nguồn gốc của lợi nhuận tư bản." - K. Marx, Tư bản',
      tooltip: '⚙️ Năng suất lao động VN tăng 5.8%/năm (2015-2023)',
      details: {
        gameplay: [
          'Quản lý nhà máy ảo: điều chỉnh số lượng công nhân, giờ làm, mức lương',
          'Theo dõi 3 chỉ số: Giá trị tạo ra, Chi phí lao động, Giá trị thặng dư',
          'Mục tiêu: Tối đa hóa giá trị thặng dư NHƯNG phải đảm bảo lương tối thiểu',
          'Hiệu ứng thực tế: nếu lương quá thấp → đình công, năng suất giảm'
        ],
        scoring: 'Điểm cân bằng = (Lợi nhuận × 0.6) + (Phúc lợi công nhân × 0.4). Tối đa 100 điểm.',
        aiReaction: 'AI phân tích quyết định của bạn theo 3 góc độ: Tư bản chủ nghĩa, Chủ nghĩa xã hội, và Kinh tế thị trường định hướng XHCN.',
        infographic: 'Công thức Marx: m\' = m/v (tỷ suất giá trị thặng dư) với biểu đồ minh họa'
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
      tooltip: '⏱️ Thời gian lao động trung bình sản xuất 1 áo sơ mi: 2.5 giờ',
      details: {
        gameplay: [
          'Hiển thị 8 sản phẩm (áo, điện thoại, xe máy, tô phở...)',
          'Người chơi ước lượng số giờ lao động xã hội cần thiết',
          'So sánh với giá trị thực tế từ dữ liệu Tổng cục Thống kê',
          'Giải thích sự chênh lệch: tay nghề, công nghệ, điều kiện sản xuất'
        ],
        scoring: 'Độ chính xác ±15% = 10 điểm/câu. Tổng 8 câu = 80 điểm tối đa.',
        aiReaction: 'AI so sánh kết quả của bạn với lý thuyết giá trị lao động và giải thích các yếu tố tác động đến giá cả thực tế (cung-cầu, thương hiệu, độc quyền).',
        infographic: 'Bảng phân tích chuỗi giá trị: Nguyên liệu → Sản xuất → Phân phối → Bán lẻ'
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
                  } else {
                    alert('Game này đang trong quá trình phát triển. Hiện tại chỉ có "Sở Hữu Hỗn Hợp" khả dụng.');
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
    </section>
  );
};

export default MiniGameSection;
