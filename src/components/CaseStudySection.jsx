import { useState } from 'react';
import { Factory, Building2, Users, X } from 'lucide-react';
import './CaseStudySection.css';

const CaseStudySection = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  const cases = [
    {
      id: 1,
      icon: Factory,
      emoji: '🏭',
      title: 'Kinh tế Nhà nước – Trụ cột chiến lược',
      image: '/images/case-study/state-enterprise.jpg',
      summary: 'Kinh tế nhà nước là hình thức sở hữu toàn dân về tư liệu sản xuất – một nguyên tắc cốt lõi trong lý luận của Karl Marx. Trong bối cảnh Việt Nam, đây là trụ cột chiến lược giúp Nhà nước định hướng và điều tiết nền kinh tế vĩ mô.',
      marxQuote: '"Nhà nước là công cụ của giai cấp nắm tư liệu sản xuất." - Karl Marx',
      details: {
        quote: '"Kinh tế nhà nước giữ vai trò chủ đạo trong nền kinh tế quốc dân." – Cương lĩnh xây dựng đất nước 2011',
        content: [
          'Các doanh nghiệp như EVN (Tập đoàn Điện lực Việt Nam), PVN (Dầu khí Việt Nam), Viettel hay Vinacomin đang nắm giữ các lĩnh vực then chốt: năng lượng, viễn thông, khoáng sản, hạ tầng.',
          'Những lĩnh vực này có tính chiến lược, tác động sâu rộng đến an ninh năng lượng, an ninh thông tin và phát triển bền vững.',
          'Từ góc nhìn Marxist, đây là sự vận dụng linh hoạt của hình thức "sở hữu công cộng về tư liệu sản xuất", nhằm đảm bảo nhà nước có thể kiểm soát và điều tiết nền kinh tế, tránh sự thống trị của tư bản tư nhân trong các ngành trọng yếu.',
        ],
        philosophy: [
          'Thể hiện vai trò trung tâm của nhà nước xã hội chủ nghĩa trong định hướng sản xuất và phân phối.',
          'Là công cụ chống lại tha hóa tư bản, bảo đảm phúc lợi chung và phát triển công bằng.',
        ],
      },
    },
    {
      id: 2,
      icon: Building2,
      emoji: '💼',
      title: 'Động lực sáng tạo – Kinh tế tư nhân',
      image: '/images/case-study/private-enterprise.jpg',
      summary: 'Kinh tế tư nhân thể hiện sự đa dạng sở hữu tư liệu sản xuất, phản ánh quá trình vận dụng sáng tạo lý luận Marxist vào nền kinh tế nhiều thành phần.',
      marxQuote: '"Sở hữu tư nhân là giai đoạn trung gian của lịch sử sản xuất." - Karl Marx',
      details: {
        quote: '',
        content: [
          'Trong thời kỳ đổi mới, Việt Nam khuyến khích khu vực tư nhân phát triển mạnh mẽ như một động lực thúc đẩy sản xuất, đổi mới và cạnh tranh.',
          'Các tập đoàn như Vingroup, FPT, Masan, Thaco là minh chứng tiêu biểu:',
          '• Vingroup: đầu tư đa ngành, tạo chuỗi giá trị khép kín, dẫn đầu trong công nghệ – xe điện – AI.',
          '• FPT: biểu tượng cho kinh tế tri thức và hội nhập toàn cầu.',
          '• Masan: đóng vai trò lớn trong công nghiệp thực phẩm, phân phối và nông sản.',
          'Theo Marx, sự phát triển của sở hữu tư nhân về tư liệu sản xuất là tất yếu trong giai đoạn tiền đề của chủ nghĩa xã hội. Tuy nhiên, dưới sự quản lý định hướng của Nhà nước, nó không nhằm mục tiêu tích lũy tư bản vô hạn mà phục vụ tăng năng suất và đời sống xã hội.',
        ],
        philosophy: [
          'Minh chứng cho sự linh hoạt và tiến hóa của lý luận Marxist trong bối cảnh mới.',
          'Tạo động lực sáng tạo nhưng vẫn gắn với định hướng công bằng và phát triển bền vững.',
        ],
      },
    },
    {
      id: 3,
      icon: Users,
      emoji: '🌾',
      title: 'Phân phối công bằng & hợp tác xã nông nghiệp',
      image: '/images/case-study/cooperative.jpg',
      summary: 'Hợp tác xã (HTX) là biểu tượng sống động của quan hệ sản xuất kiểu mới, kết hợp giữa sở hữu tập thể và phân phối theo lao động – một nguyên tắc cốt lõi trong lý luận Marxist.',
      marxQuote: '"Từ mỗi người theo năng lực, đến mỗi người theo nhu cầu." - Karl Marx',
      details: {
        quote: '',
        content: [
          'Các HTX nông nghiệp kiểu mới tại Việt Nam đang trở thành mô hình tiêu biểu cho kinh tế tập thể, nơi người nông dân vừa là chủ sở hữu, vừa là người lao động trực tiếp.',
          'Ví dụ:',
          '• HTX Đồng Tháp, HTX Lam Sơn, HTX Tân Cương – Thái Nguyên tổ chức sản xuất theo chuỗi giá trị, ứng dụng công nghệ và đảm bảo lợi ích hài hòa cho các thành viên.',
          '• Cùng với đó, các chính sách phúc lợi xã hội, thuế lũy tiến, và ngân sách Nhà nước đóng vai trò phân phối lại thu nhập, giảm bất bình đẳng.',
          'Theo Marx, "Phân phối phải dựa trên lao động, nhưng mục tiêu cuối cùng là thỏa mãn nhu cầu con người." Việt Nam đã vận dụng nguyên tắc này bằng cách kết hợp phân phối theo lao động, phúc lợi và cộng đồng.',
        ],
        philosophy: [
          'Thể hiện sự tiến hóa từ phân phối theo lao động → phân phối theo nhu cầu.',
          'Là hình mẫu cho kinh tế xã hội chủ nghĩa trong nền kinh tế thị trường – nơi công bằng và hiệu quả cùng tồn tại.',
        ],
      },
    },
  ];

  const openModal = (caseId) => {
    setSelectedCase(cases.find((c) => c.id === caseId));
  };

  const closeModal = () => {
    setSelectedCase(null);
  };

  return (
    <section className="case-study-section min-h-screen py-24 px-4 md:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-earth rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-soft-gold rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="case-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Case Study – Vận dụng lý luận Marxist vào thực tiễn Việt Nam
          </h2>
          <p className="text-lg md:text-xl text-smoke-gray font-light italic mb-8">
            Khi lý thuyết gặp đời sống: từ sở hữu, phân phối đến phát triển bền vững.
          </p>
          <div className="divider mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-soft-gold to-transparent"></div>
        </div>

        {/* Case Cards Grid */}
        <div className="cases-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="case-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-soft-gold/50 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="case-image-container h-56 relative overflow-hidden bg-gradient-to-br from-red-earth/20 via-soft-gold/10 to-red-earth/20">
                <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-30">
                  {caseItem.emoji}
                </div>
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Marx Quote Overlay - CHỈ hiện trên IMAGE khi hover */}
                <div className="marx-quote-overlay absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/90 to-transparent opacity-0 transition-opacity duration-500 flex items-end p-6 pointer-events-none">
                  <div className="quote-content">
                    <div className="quote-mark text-soft-gold text-4xl font-serif leading-none mb-2">"</div>
                    <p className="text-white text-xs italic leading-relaxed">
                      {caseItem.marxQuote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="case-content p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <caseItem.icon className="w-8 h-8 text-soft-gold" />
                  <h3 className="text-xl font-bold text-white flex-1">
                    {caseItem.title}
                  </h3>
                </div>
                <p className="text-smoke-gray text-sm leading-relaxed mb-6 flex-grow">
                  {caseItem.summary}
                </p>
                <button
                  onClick={() => openModal(caseItem.id)}
                  className="case-button w-full py-3 px-6 bg-gradient-to-r from-red-earth to-soft-gold text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-earth/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Block */}
        <div className="cta-block text-center bg-gradient-to-r from-red-earth/20 via-soft-gold/20 to-red-earth/20 rounded-2xl p-8 border border-white/10">
          <p className="text-xl text-white font-medium mb-4">
            Bạn hiểu lý thuyết rồi – giờ thử vận dụng nhé!
          </p>
          <a
            href="#market-balance"
            className="inline-block py-3 px-8 bg-gradient-to-r from-soft-gold to-red-earth text-white font-bold rounded-full hover:shadow-lg hover:shadow-soft-gold/50 transition-all duration-300 transform hover:scale-105"
          >
            Thử Minigame "Balance Builder"
          </a>
        </div>

      </div>

      {/* Modal Popup */}
      {selectedCase && (
        <div className="modal-overlay fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="modal-content bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl animate-scaleIn">
            
            {/* Modal Header */}
            <div className="modal-header bg-gradient-to-r from-red-earth to-soft-gold p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <selectedCase.icon className="w-10 h-10 text-white" />
                <h3 className="text-2xl font-bold text-white">
                  {selectedCase.title}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="close-button w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="modal-image h-64 relative overflow-hidden bg-gradient-to-br from-red-earth/20 via-soft-gold/10 to-red-earth/20">
              <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-20">
                {selectedCase.emoji}
              </div>
            </div>

            {/* Modal Body */}
            {/* Modal Body */}
            <div className="modal-body p-8 space-y-6">
              
              {/* Quote từ Cương lĩnh (nếu có) */}
              {selectedCase.details.quote && (
                <div className="government-quote bg-gradient-to-r from-red-earth/10 to-soft-gold/10 rounded-xl p-6 border-l-4 border-red-earth">
                  <div className="quote-mark text-red-earth text-4xl font-serif leading-none mb-2">"</div>
                  <p className="text-white text-base italic leading-relaxed">
                    {selectedCase.details.quote}
                  </p>
                </div>
              )}

              {/* Nội dung chi tiết */}
              <div>
                <h4 className="text-xl font-bold text-soft-gold mb-4">� Nội dung chi tiết</h4>
                <div className="space-y-4">
                  {selectedCase.details.content.map((paragraph, index) => (
                    <p key={index} className="text-smoke-gray leading-relaxed text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Ý nghĩa triết học */}
              <div className="philosophy-section bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl p-6 border border-soft-gold/30">
                <h4 className="text-xl font-bold text-soft-gold mb-4 flex items-center gap-2">
                  <span>🎓</span> Ý nghĩa triết học
                </h4>
                <ul className="space-y-3">
                  {selectedCase.details.philosophy.map((item, index) => (
                    <li key={index} className="text-white leading-relaxed flex items-start gap-3">
                      <span className="text-soft-gold text-xl">•</span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Marx Quote */}
              <div className="marx-quote-modal text-center py-6 border-t border-b border-white/10">
                <div className="quote-mark text-soft-gold text-5xl font-serif leading-none mb-2">"</div>
                <p className="text-white text-lg italic leading-relaxed max-w-2xl mx-auto">
                  {selectedCase.marxQuote}
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default CaseStudySection;
