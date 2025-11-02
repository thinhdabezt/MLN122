import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Users, 
  DollarSign, 
  PiggyBank,
  Heart,
  Building,
  TrendingUp,
  GraduationCap,
  Hospital,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';
import './DistributionSection.css';

gsap.registerPlugin(ScrollTrigger);

const DistributionSection = () => {
  const sectionRef = useRef(null);
  const flowRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);
  const [flowAnimating, setFlowAnimating] = useState(false);

  // Flow animation - energy traveling through nodes
  const playFlowAnimation = () => {
    if (flowAnimating) return;
    setFlowAnimating(true);

    const nodes = document.querySelectorAll('.flow-node');
    const connections = document.querySelectorAll('.flow-connection');

    // Reset
    gsap.set(nodes, { className: '+=flow-node' });
    gsap.set(connections, { className: '+=flow-connection' });

    // Animate through each node
    const timeline = gsap.timeline({
      onComplete: () => {
        setFlowAnimating(false);
      },
    });

    nodes.forEach((node, index) => {
      timeline.to(node, {
        duration: 0.3,
        onStart: () => {
          node.classList.add('active');
          if (index > 0) {
            connections[index - 1]?.classList.add('active');
          }
        },
      });

      timeline.to({}, { duration: 0.4 }); // Pause between nodes
    });
  };

  const flowNodes = [
    {
      id: 'labor',
      icon: <Users className="w-8 h-8 md:w-10 md:h-10" />,
      title: 'Lao động',
      subtitle: 'Nguồn gốc giá trị',
      description: 'Marx: "Lao động là nguồn gốc của mọi giá trị". Người lao động đóng góp sức lao động, tạo ra sản phẩm và dịch vụ.',
      examples: [
        'Công nhân, nông dân, trí thức',
        'Lao động trực tiếp & gián tiếp',
        'Lao động chân tay & trí óc',
      ],
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      id: 'income',
      icon: <DollarSign className="w-8 h-8 md:w-10 md:h-10" />,
      title: 'Thu nhập',
      subtitle: 'Phân phối theo lao động',
      description: 'Nguyên tắc XHCN: "Làm theo năng lực, hưởng theo lao động". Thu nhập tương xứng với số lượng và chất lượng lao động.',
      examples: [
        'Lương, thưởng, phụ cấp',
        'Thu nhập từ kinh doanh',
        'Cổ tức, lợi nhuận',
      ],
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
    },
    {
      id: 'tax',
      icon: <PiggyBank className="w-8 h-8 md:w-10 md:h-10" />,
      title: 'Thuế & Ngân sách',
      subtitle: 'Điều tiết phân phối',
      description: 'Nhà nước thu thuế để điều tiết thu nhập, giảm bất bình đẳng, tạo nguồn lực cho phúc lợi xã hội.',
      examples: [
        'Thuế thu nhập cá nhân (TNCN)',
        'Thuế doanh nghiệp',
        'Thuế gián thu (VAT)',
      ],
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-500/10',
    },
    {
      id: 'welfare',
      icon: <Heart className="w-8 h-8 md:w-10 md:h-10" />,
      title: 'Phúc lợi XH',
      subtitle: 'An sinh & đảm bảo',
      description: 'Phân phối lại thông qua y tế, giáo dục, bảo hiểm xã hội - đảm bảo công bằng và đời sống tối thiểu cho mọi người.',
      examples: [
        'Bảo hiểm y tế, xã hội',
        'Giáo dục công lập',
        'Trợ cấp người nghèo, khuyết tật',
      ],
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-500/10',
    },
    {
      id: 'investment',
      icon: <Building className="w-8 h-8 md:w-10 md:h-10" />,
      title: 'Đầu tư công',
      subtitle: 'Phát triển bền vững',
      description: 'Đầu tư vào hạ tầng, giáo dục, y tế - tạo điều kiện cho tăng trưởng và phát triển bình đẳng giữa các vùng miền.',
      examples: [
        'Hạ tầng giao thông',
        'Trường học, bệnh viện',
        'Chính sách vùng miền',
      ],
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const distributionPrinciples = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Phân phối theo lao động',
      description: 'Nguyên tắc cơ bản của CNXH - Marx khẳng định lao động là thước đo phân phối chính đáng.',
      marxQuote: '"Mỗi người đóng góp theo khả năng, h향hưởng theo lao động"',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Phúc lợi xã hội',
      description: 'Việt Nam bổ sung: Y tế, giáo dục miễn phí/hỗ trợ - đảm bảo quyền cơ bản cho mọi công dân.',
      vietnamExample: 'Bảo hiểm y tế toàn dân, miễn học phí tiểu học',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: <Hospital className="w-8 h-8" />,
      title: 'An sinh xã hội',
      description: 'Hỗ trợ người yếu thế, giảm nghèo bền vững - thể hiện tính ưu việt của XHCN.',
      vietnamExample: 'Chương trình giảm nghèo, trợ cấp BHXH',
      color: 'from-red-500 to-pink-600',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Chính sách vùng miền',
      description: 'Đầu tư ưu tiên vùng khó khăn - thu hẹp khoảng cách giàu nghèo giữa các vùng.',
      vietnamExample: 'Chương trình 135, NTM, XDCB',
      color: 'from-purple-500 to-indigo-600',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="distribution-section min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-red-earth/10 border border-red-earth/20 rounded-full">
            <Zap className="w-5 h-5 text-red-earth" />
            <span className="text-red-earth font-semibold text-sm uppercase tracking-wider">
              Section 3: Phân phối công bằng
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Từ lao động đến{' '}
            <span className="text-gradient bg-gradient-to-r from-red-earth via-soft-gold to-red-earth bg-clip-text text-transparent">
              phúc lợi
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
            Theo Marx, <strong className="text-soft-gold">lao động là cơ sở phân phối</strong>, 
            nhưng Việt Nam còn bổ sung: phúc lợi xã hội, thuế, ngân sách, 
            đầu tư công - đảm bảo công bằng trong điều kiện thị trường.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Lao động</span>
            </div>
            <ArrowRight className="w-4 h-4" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Thu nhập</span>
            </div>
            <ArrowRight className="w-4 h-4" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Thuế</span>
            </div>
            <ArrowRight className="w-4 h-4" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Phúc lợi</span>
            </div>
            <ArrowRight className="w-4 h-4" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Đầu tư</span>
            </div>
          </div>
        </div>

        {/* Interactive Flow Chart */}
        <div ref={flowRef} className="flow-container mb-20">
          <div className="flow-wrapper">
            {flowNodes.map((node, index) => (
              <div key={node.id} className="flow-item">
                {/* Flow Node */}
                <div
                  className={`flow-node ${activeNode === node.id ? 'active' : ''}`}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  onClick={() => playFlowAnimation()}
                >
                  <div className={`node-icon bg-gradient-to-br ${node.color}`}>
                    {node.icon}
                    
                    {/* Energy pulse effect */}
                    <div className="energy-pulse"></div>
                  </div>

                  <div className="node-content">
                    <h3 className="node-title">{node.title}</h3>
                    <p className="node-subtitle">{node.subtitle}</p>
                  </div>

                  {/* Tooltip */}
                  <div className={`node-tooltip ${node.bgColor}`}>
                    <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                      {node.description}
                    </p>
                    <div className="space-y-1">
                      {node.examples.map((example, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="text-soft-gold">•</span>
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Node number badge */}
                  <div className="node-number">{index + 1}</div>
                </div>

                {/* Connection Arrow */}
                {index < flowNodes.length - 1 && (
                  <div className="flow-connection">
                    <div className="connection-line"></div>
                    <div className="connection-arrow">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    {/* Energy flow animation */}
                    <div className="energy-flow">
                      <div className="energy-particle"></div>
                      <div className="energy-particle"></div>
                      <div className="energy-particle"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Play Animation Button */}
          <div className="text-center mt-8">
            <button
              onClick={playFlowAnimation}
              disabled={flowAnimating}
              className="play-flow-btn"
            >
              <Zap className="w-5 h-5" />
              <span>{flowAnimating ? 'Đang chạy...' : 'Xem luồng phân phối'}</span>
            </button>
          </div>
        </div>

        {/* Distribution Principles Grid */}
        <div className="principles-grid">
          <h3 className="text-3xl font-bold text-white text-center mb-10">
            Nguyên tắc phân phối của Việt Nam
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {distributionPrinciples.map((principle, index) => (
              <div
                key={index}
                className="principle-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`principle-icon bg-gradient-to-br ${principle.color}`}>
                  {principle.icon}
                </div>

                <div className="principle-content">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {principle.title}
                  </h4>
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                    {principle.description}
                  </p>

                  {principle.marxQuote && (
                    <div className="marx-mini-quote">
                      <span className="text-soft-gold text-2xl leading-none">"</span>
                      <p className="text-xs text-gray-400 italic">
                        {principle.marxQuote}
                      </p>
                    </div>
                  )}

                  {principle.vietnamExample && (
                    <div className="vietnam-example">
                      <span className="text-xs font-semibold text-soft-gold">
                        🇻🇳 VN:
                      </span>
                      <span className="text-xs text-gray-400">
                        {principle.vietnamExample}
                      </span>
                    </div>
                  )}
                </div>

                {/* Decorative corner */}
                <div className="card-corner"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaway Box */}
        <div className="key-takeaway">
          <div className="flex items-start gap-4">
            <div className="takeaway-icon">
              <Shield className="w-8 h-8 text-soft-gold" />
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-white mb-3">
                Mục tiêu: Công bằng xã hội trong kinh tế thị trường
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Việt Nam kết hợp phân phối theo lao động (nguyên tắc XHCN) 
                với các hình thức phân phối khác (phúc lợi, thuế, đầu tư công) 
                để đảm bảo công bằng xã hội, thu hẹp khoảng cách giàu nghèo, 
                phát triển bền vững.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="stat-box">
                  <div className="stat-number">~30%</div>
                  <div className="stat-label">Chi tiêu công cho phúc lợi XH</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">87%</div>
                  <div className="stat-label">Dân số có BHYT</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">2.5%</div>
                  <div className="stat-label">Tỷ lệ hộ nghèo (2023)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistributionSection;
