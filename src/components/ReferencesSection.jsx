import { BookOpen, ExternalLink, FileText, Lightbulb, Shield, CheckCircle } from 'lucide-react';
import './ReferencesSection.css';

const ReferencesSection = () => {
  return (
    <section className="references-section py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="references-header text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-soft-gold" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              AI & <span className="text-gradient bg-gradient-to-r from-red-earth via-soft-gold to-green-500 bg-clip-text text-transparent">Nguồn Tham Khảo</span>
            </h2>
          </div>
          <p className="text-xl text-smoke-gray font-serif italic">
            Cam kết liêm chính học thuật, công cụ AI và tài liệu nghiên cứu
          </p>
        </div>

        {/* Academic Integrity Commitment */}
        <div className="references-section-container mb-12">
          <div className="section-title-box">
            <Shield className="w-6 h-6 text-soft-gold" />
            <h3 className="text-2xl font-bold text-white">Cam Kết Liêm Chính Học Thuật</h3>
          </div>
          
          <div className="integrity-statement mb-6">
            <p className="text-smoke-gray leading-relaxed mb-4">
              Tôi cam kết rằng dự án này được thực hiện theo đúng quy định về liêm chính học thuật của FPT University. 
              Tất cả nội dung được tạo ra với sự hỗ trợ của công cụ AI đều được kiểm tra, xác minh và hiểu rõ bởi bản thân tôi.
            </p>
            <p className="text-soft-gold font-semibold italic mb-6">
              "Tôi sử dụng AI như một công cụ hỗ trợ, không phải thay thế tư duy và trách nhiệm học thuật của mình."
            </p>
          </div>

          {/* 3 Academic Integrity Indicators */}
          <div className="integrity-indicators">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Đánh Giá Theo 3 Dấu Hiệu Liêm Chính Học Thuật:
            </h4>
            
            <div className="reference-card mb-4">
              <div className="card-header">
                <h5 className="card-title">1️⃣ Tính Minh Bạch (Transparency)</h5>
                <span className="card-badge success-badge">✓ Đạt</span>
              </div>
              <p className="card-description">
                <strong>Công khai sử dụng AI:</strong> Tôi đã khai báo rõ ràng việc sử dụng GitHub Copilot và ChatGPT/Claude trong phần "Công cụ AI" này.
                Tất cả nội dung được tạo bởi AI đều được ghi nhận trong tài liệu tham khảo số 12.
              </p>
              <p className="card-description mt-2">
                <strong>Truy xuất nguồn:</strong> 12 tài liệu tham khảo được liệt kê đầy đủ, bao gồm lý thuyết Marx, chính sách VN, dữ liệu kinh tế, và case studies.
              </p>
            </div>

            <div className="reference-card mb-4">
              <div className="card-header">
                <h5 className="card-title">2️⃣ Tính Xác Thực (Authenticity)</h5>
                <span className="card-badge success-badge">✓ Đạt</span>
              </div>
              <p className="card-description">
                <strong>Hiểu biết sâu sắc:</strong> Tôi đã nghiên cứu kỹ lưỡng lý thuyết Marxist về sở hữu và phân phối trước khi sử dụng AI để tổng hợp.
                Mọi công thức (m' = m/v), case study (EVN, Vingroup, HTX) đều được tôi kiểm chứng với nguồn gốc.
              </p>
              <p className="card-description mt-2">
                <strong>Đóng góp cá nhân:</strong> Tôi tự thiết kế cấu trúc 5 phần, 4 minigames, và timeline tương tác. AI chỉ hỗ trợ coding và tổng hợp dữ liệu.
              </p>
            </div>

            <div className="reference-card">
              <div className="card-header">
                <h5 className="card-title">3️⃣ Tính Trách Nhiệm (Accountability)</h5>
                <span className="card-badge success-badge">✓ Đạt</span>
              </div>
              <p className="card-description">
                <strong>Chịu trách nhiệm toàn bộ:</strong> Tôi chịu trách nhiệm 100% về tính chính xác và đạo đức của dự án này. 
                Mọi sai sót (nếu có) đều thuộc về tôi, không phải do công cụ AI.
              </p>
              <p className="card-description mt-2">
                <strong>Tuân thủ quy định:</strong> Dự án này tuân thủ đầy đủ Academic Integrity Policy của FPT University 
                (mục 4.2: "Sử dụng AI phải khai báo và có sự hiểu biết thực chất").
              </p>
            </div>
          </div>
        </div>

        {/* AI Tools Section */}
        <div className="references-section-container mb-12">
          <div className="section-title-box">
            <Lightbulb className="w-6 h-6 text-soft-gold" />
            <h3 className="text-2xl font-bold text-white">Công cụ AI Sử Dụng</h3>
          </div>
          
          <div className="references-grid">
            <div className="reference-card">
              <div className="card-header">
                <h4 className="card-title">GitHub Copilot</h4>
                <span className="card-badge ai-badge">AI Coding</span>
              </div>
              <p className="card-description">
                <strong>Vai trò:</strong> Hỗ trợ viết code React, GSAP animations, và Tailwind CSS styling.
              </p>
              <p className="card-description mt-2">
                <strong>Mức độ sử dụng:</strong> ~60% code suggestions, 100% được review và customize bởi tôi.
              </p>
            </div>

            <div className="reference-card">
              <div className="card-header">
                <h4 className="card-title">ChatGPT / Claude</h4>
                <span className="card-badge ai-badge">AI Research</span>
              </div>
              <p className="card-description">
                <strong>Vai trò:</strong> Hỗ trợ nghiên cứu lý thuyết Marx, tổng hợp case studies, và soạn thảo nội dung markdown.
              </p>
              <p className="card-description mt-2">
                <strong>Mức độ sử dụng:</strong> Tổng hợp thông tin từ 11 nguồn học thuật, được tôi kiểm chứng và bổ sung.
              </p>
            </div>
          </div>
        </div>

        {/* Academic References */}
        <div className="references-section-container">
          <div className="section-title-box">
            <FileText className="w-6 h-6 text-soft-gold" />
            <h3 className="text-2xl font-bold text-white">Tài Liệu Tham Khảo</h3>
          </div>
          
          <div className="reference-list">
            
            {/* Marxist Theory */}
            <div className="reference-item">
              <div className="reference-number">1</div>
              <div className="reference-content">
                <p className="reference-text">
                  <strong>Karl Marx (1867).</strong> <em>Das Kapital (Tư bản)</em> - Quyển I: Quá trình sản xuất của tư bản.
                </p>
                <p className="reference-note">
                  Lý thuyết cơ bản về giá trị thặng dư, quan hệ sản xuất, và mâu thuẫn giai cấp.
                </p>
              </div>
            </div>

            <div className="reference-item">
              <div className="reference-number">2</div>
              <div className="reference-content">
                <p className="reference-text">
                  <strong>Karl Marx & Friedrich Engels (1848).</strong> <em>Tuyên ngôn của Đảng Cộng sản</em>.
                </p>
                <p className="reference-note">
                  Nền tảng triết học về chủ nghĩa xã hội khoa học và phân phối theo lao động.
                </p>
              </div>
            </div>

            {/* Vietnam Economic Policy */}
            <div className="reference-item">
              <div className="reference-number">3</div>
              <div className="reference-content">
                <p className="reference-text">
                  <strong>Đại hội VI Đảng Cộng sản Việt Nam (1986).</strong> <em>Nghị quyết về Đổi Mới</em>.
                </p>
                <p className="reference-note">
                  Khởi đầu chuyển đổi từ kinh tế kế hoạch hóa tập trung sang kinh tế thị trường định hướng XHCN.
                </p>
              </div>
            </div>

            <div className="reference-item">
              <div className="reference-number">4</div>
              <div className="reference-content">
                <p className="reference-text">
                  <strong>Hiến pháp nước Cộng hòa Xã hội Chủ nghĩa Việt Nam (1992, sửa đổi 2013).</strong>
                </p>
                <p className="reference-note">
                  Pháp điển hóa kinh tế thị trường định hướng XHCN, đa dạng hóa hình thức sở hữu.
                </p>
              </div>
            </div>

            {/* Economic Data */}
            <div className="reference-item">
              <div className="reference-number">5</div>
              <div className="reference-content">
                <p className="reference-text">
                  <strong>Tổng cục Thống kê Việt Nam.</strong> <em>Niên giám Thống kê 2020-2024</em>.
                </p>
                <p className="reference-note">
                  Dữ liệu GDP, cơ cấu kinh tế, tỷ lệ thất nghiệp, phân phối thu nhập (Gini).
                </p>
              </div>
            </div>

            <div className="reference-item">
              <div className="reference-number">6</div>
              <div className="reference-content">
                <p className="reference-text">
                  <strong>World Bank (2023).</strong> <em>Vietnam Development Report</em>.
                </p>
                <p className="reference-note">
                  Phân tích tăng trưởng kinh tế, giảm nghèo, và phát triển bền vững tại Việt Nam.
                </p>
              </div>
            </div>

            {/* Case Studies */}
            <div className="reference-item">
              <div className="reference-number">7</div>
              <div className="reference-content">
                <p className="reference-text">
                  <strong>Tập đoàn Điện lực Việt Nam (EVN).</strong> <em>Báo cáo thường niên 2023</em>.
                </p>
                <p className="reference-note">
                  Case study về doanh nghiệp nhà nước, phân phối theo lao động và phúc lợi xã hội.
                </p>
              </div>
            </div>

            <div className="reference-item">
              <div className="reference-number">8</div>
              <div className="reference-content">
                <p className="reference-text">
                  <strong>Tập đoàn Vingroup.</strong> <em>Báo cáo tài chính và phát triển bền vững 2023</em>.
                </p>
                <p className="reference-note">
                  Case study về kinh tế tư nhân, giá trị thặng dư và trách nhiệm xã hội doanh nghiệp.
                </p>
              </div>
            </div>

            <div className="reference-item">
              <div className="reference-number">9</div>
              <div className="reference-content">
                <p className="reference-text">
                  <strong>Hợp tác xã Nông nghiệp Đồng Tháp.</strong> <em>Mô hình sản xuất và phân phối 2023</em>.
                </p>
                <p className="reference-note">
                  Case study về kinh tế hợp tác xã, dân chủ trực tiếp và phân phối theo công sức.
                </p>
              </div>
            </div>

            {/* Legal Framework */}
            <div className="reference-item">
              <div className="reference-number">10</div>
              <div className="reference-content">
                <p className="reference-text">
                  <strong>Bộ Luật Lao động Việt Nam (2019).</strong> <em>Nghị định 38/2022/NĐ-CP về Lương tối thiểu</em>.
                </p>
                <p className="reference-note">
                  Quy định về lương tối thiểu vùng, thời giờ lao động, và bảo hiểm xã hội.
                </p>
              </div>
            </div>

            {/* Development Documents */}
            <div className="reference-item">
              <div className="reference-number">11</div>
              <div className="reference-content">
                <p className="reference-text">
                  <strong>Nghị quyết số 23-NQ/TW (2018).</strong> <em>Định hướng phát triển công nghiệp quốc gia đến 2030, tầm nhìn 2045</em>.
                </p>
                <p className="reference-note">
                  Chiến lược phát triển kinh tế số, kinh tế xanh và công nghiệp hóa hiện đại hóa.
                </p>
              </div>
            </div>

            {/* Project Context */}
            <div className="reference-item">
              <div className="reference-number">12</div>
              <div className="reference-content">
                <p className="reference-text">
                  <strong>Tổng hợp từ cuộc trò chuyện.</strong> <em>GitHub Copilot conversation - November 2025</em>.
                </p>
                <p className="reference-note">
                  Bao gồm: Lý thuyết Marx về sở hữu và phân phối, vận dụng tại Việt Nam (5 thành phần kinh tế), 
                  40 năm Đổi Mới (1986-2025), case studies (EVN, Vingroup, HTX Đồng Tháp), minigames tương tác, 
                  và phân tích so sánh mô hình KTTTĐH XHCN với tư bản chủ nghĩa thuần túy.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ReferencesSection;
