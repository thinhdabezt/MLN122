import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  User, 
  Building2, 
  Users, 
  Factory, 
  TrendingUp,
  Sparkles,
  Globe,
  ChevronRight
} from 'lucide-react';
import './OwnershipTypesSection.css';

gsap.registerPlugin(ScrollTrigger);

const OwnershipTypesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const chartRef = useRef(null);
  const [selectedSegment, setSelectedSegment] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 80,
              rotateY: -15,
            },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Animate chart
      if (chartRef.current) {
        gsap.fromTo(
          chartRef.current,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: chartRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ownershipTypes = [
    {
      id: 'individual',
      icon: <User className="w-12 h-12" />,
      title: 'Sở hữu Cá nhân',
      subtitle: 'Công cụ lao động đơn giản',
      description:
        'Người lao động sở hữu công cụ sản xuất nhỏ, tự mình làm việc không bóc lột người khác.',
      marxView:
        'Marx mô tả đây là hình thức sở hữu tiền tư bản chủ nghĩa, nơi người thợ thủ công sở hữu dụng cụ của mình.',
      vietnamExample: {
        title: 'Ví dụ Việt Nam',
        items: [
          '👨‍🌾 Hộ nông dân canh tác trên mảnh đất của mình',
          '👨‍🔧 Thợ thủ công làm nghề truyền thống',
          '🛒 Tiểu thương kinh doanh nhỏ lẻ',
          '💼 Freelancer, dịch vụ cá nhân',
        ],
        note: 'Chiếm tỷ trọng lớn trong nền kinh tế, đặc biệt ở nông thôn',
      },
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      id: 'private',
      icon: <Factory className="w-12 h-12" />,
      title: 'Sở hữu Tư nhân TBCN',
      subtitle: 'Tư liệu sản xuất tập trung',
      description:
        'Giai cấp tư sản sở hữu tư liệu sản xuất, người lao động bán sức lao động và bị bóc lột giá trị thặng dư.',
      marxView:
        'Marx chỉ ra đây là nguồn gốc của sự bất bình đẳng và mâu thuẫn giai cấp trong TBCN.',
      vietnamExample: {
        title: 'Ví dụ Việt Nam (Vận dụng sáng tạo)',
        items: [
          '🏢 Vingroup - Tập đoàn tư nhân lớn nhất VN',
          '🏪 Masan Group - Bán lẻ & tiêu dùng',
          '🏭 Hòa Phát - Sản xuất thép',
          '🌾 TH True Milk - Nông nghiệp công nghệ cao',
        ],
        note: 'Động lực quan trọng cho tăng trưởng, tạo việc làm - được Nhà nước khuyến khích phát triển',
      },
      color: 'from-red-earth to-red-700',
      bgColor: 'bg-red-earth/10',
    },
    {
      id: 'public',
      icon: <Users className="w-12 h-12" />,
      title: 'Sở hữu Công cộng/XHCN',
      subtitle: 'Toàn dân làm chủ',
      description:
        'Nhà nước đại diện cho nhân dân nắm giữ tư liệu sản xuất quan trọng, phục vụ lợi ích chung.',
      marxView:
        'Marx cho rằng đây là hình thức sở hữu tiến bộ nhất, xóa bỏ bóc lột, xây dựng xã hội bình đẳng.',
      vietnamExample: {
        title: 'Ví dụ Việt Nam (Vai trò chủ đạo)',
        items: [
          '⚡ EVN - Điện lực Việt Nam',
          '🛢️ PetroVietnam - Dầu khí quốc gia',
          '🏦 Vietcombank - Ngân hàng TMCP nhà nước',
          '✈️ Vietnam Airlines - Hàng không quốc gia',
        ],
        note: 'Kinh tế nhà nước giữ vai trò chủ đạo, định hướng phát triển bền vững',
      },
      color: 'from-soft-gold to-yellow-600',
      bgColor: 'bg-soft-gold/10',
    },
  ];

  // Dữ liệu biểu đồ tỷ trọng các thành phần kinh tế VN
  const economicSegments = [
    {
      id: 'state',
      name: 'Kinh tế Nhà nước',
      percentage: 28.5,
      color: '#F3C969',
      description: 'Vai trò chủ đạo, định hướng',
      examples: 'EVN, Petrovietnam, VNPT, Viettel',
    },
    {
      id: 'private',
      name: 'Kinh tế Tư nhân',
      percentage: 42.3,
      color: '#B53F3F',
      description: 'Động lực tăng trưởng chính',
      examples: 'Vingroup, Masan, Hòa Phát, TH',
    },
    {
      id: 'fdi',
      name: 'Vốn đầu tư nước ngoài (FDI)',
      percentage: 20.8,
      color: '#60A5FA',
      description: 'Chuyển giao công nghệ, xuất khẩu',
      examples: 'Samsung, Intel, LG, Toyota',
    },
    {
      id: 'cooperative',
      name: 'Kinh tế Hợp tác xã',
      percentage: 8.4,
      color: '#34D399',
      description: 'Phát triển cộng đồng',
      examples: 'HTX nông nghiệp, tín dụng',
    },
  ];

  // Calculate SVG pie chart paths
  const getPieChartPath = (percentage, startAngle = 0) => {
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    const largeArc = angle > 180 ? 1 : 0;

    const startX = 200 + 150 * Math.cos((Math.PI * startAngle) / 180);
    const startY = 200 + 150 * Math.sin((Math.PI * startAngle) / 180);
    const endX = 200 + 150 * Math.cos((Math.PI * endAngle) / 180);
    const endY = 200 + 150 * Math.sin((Math.PI * endAngle) / 180);

    return {
      path: `M 200 200 L ${startX} ${startY} A 150 150 0 ${largeArc} 1 ${endX} ${endY} Z`,
      angle: endAngle,
    };
  };

  let currentAngle = -90; // Start from top

  return (
    <section
      ref={sectionRef}
      className="ownership-types-section min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-soft-gold/10 border border-soft-gold/20 rounded-full">
            <Sparkles className="w-5 h-5 text-soft-gold" />
            <span className="text-soft-gold font-semibold text-sm uppercase tracking-wider">
              Section 2: Phân tích sở hữu
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ai nắm, ai làm chủ?
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ba hình thức sở hữu và sự vận dụng sáng tạo ở Việt Nam
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
            <Globe className="w-5 h-5" />
            <span className="text-sm">
              Từ lý luận Marx đến thực tiễn kinh tế nhiều thành phần
            </span>
          </div>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {ownershipTypes.map((type, index) => (
            <div
              key={type.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="ownership-card-3d"
            >
              <div className="card-inner">
                {/* Front Side */}
                <div className={`card-front ${type.bgColor}`}>
                  <div className={`icon-wrapper-gradient bg-gradient-to-br ${type.color}`}>
                    {type.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {type.title}
                  </h3>
                  
                  <p className="text-soft-gold text-sm mb-4 font-semibold">
                    {type.subtitle}
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {type.description}
                  </p>

                  <div className="marx-quote">
                    <div className="flex items-start gap-2">
                      <span className="text-soft-gold text-2xl leading-none">"</span>
                      <p className="text-sm text-gray-400 italic flex-1">
                        {type.marxView}
                      </p>
                    </div>
                  </div>

                  <div className="flip-hint">
                    <ChevronRight className="w-5 h-5" />
                    <span>Hover để xem ví dụ VN</span>
                  </div>

                  {/* Decorative gear */}
                  <div className="card-gear">
                    <div className="mini-gear"></div>
                  </div>
                </div>

                {/* Back Side - Vietnam Examples */}
                <div className={`card-back bg-gradient-to-br ${type.color}`}>
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="w-6 h-6 text-white" />
                      <h4 className="text-xl font-bold text-white">
                        {type.vietnamExample.title}
                      </h4>
                    </div>

                    <ul className="space-y-3 mb-4 flex-1">
                      {type.vietnamExample.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-white/90 flex items-start gap-2 text-sm"
                        >
                          <span className="text-lg leading-none">{item.split(' ')[0]}</span>
                          <span>{item.substring(item.indexOf(' ') + 1)}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                      <p className="text-xs text-white/90 italic">
                        💡 {type.vietnamExample.note}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vietnam's Creative Application */}
        <div className="vietnam-application-box mb-20">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-soft-gold" />
            <h3 className="text-3xl font-bold text-white">
              Việt Nam vận dụng sáng tạo
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="application-card">
              <div className="number-badge">01</div>
              <h4 className="text-xl font-bold text-white mb-3">
                Kinh tế nhiều thành phần
              </h4>
              <p className="text-gray-300 text-sm">
                Nhà nước, tư nhân, hợp tác xã, FDI... cùng phát triển, 
                tạo sức mạnh tổng hợp cho nền kinh tế.
              </p>
            </div>

            <div className="application-card">
              <div className="number-badge">02</div>
              <h4 className="text-xl font-bold text-white mb-3">
                Kinh tế nhà nước chủ đạo
              </h4>
              <p className="text-gray-300 text-sm">
                Nắm giữ các ngành then chốt (năng lượng, tài chính, hạ tầng), 
                định hướng phát triển bền vững.
              </p>
            </div>

            <div className="application-card">
              <div className="number-badge">03</div>
              <h4 className="text-xl font-bold text-white mb-3">
                Tư nhân là động lực
              </h4>
              <p className="text-gray-300 text-sm">
                Khuyến khích phát triển kinh tế tư nhân, tạo việc làm, 
                thúc đẩy đổi mới sáng tạo trong thời kỳ công nghiệp hóa.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Pie Chart - Economic Components */}
        <div ref={chartRef} className="chart-container">
          <h3 className="text-3xl font-bold text-white text-center mb-4">
            Tỷ trọng các thành phần kinh tế Việt Nam
          </h3>
          <p className="text-gray-400 text-center mb-10">
            Hover vào từng mảnh để xem chi tiết
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* SVG Pie Chart */}
            <div className="pie-chart-wrapper">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-auto max-w-md"
              >
                {economicSegments.map((segment) => {
                  const { path, angle } = getPieChartPath(
                    segment.percentage,
                    currentAngle
                  );
                  const previousAngle = currentAngle;
                  currentAngle = angle;

                  return (
                    <g key={segment.id}>
                      <path
                        d={path}
                        fill={segment.color}
                        className={`pie-segment ${
                          selectedSegment === segment.id ? 'active' : ''
                        }`}
                        onMouseEnter={() => setSelectedSegment(segment.id)}
                        onMouseLeave={() => setSelectedSegment(null)}
                      />
                      {/* Percentage Label */}
                      <text
                        x={
                          200 +
                          100 *
                            Math.cos(
                              (Math.PI * (previousAngle + angle)) / 2 / 180
                            )
                        }
                        y={
                          200 +
                          100 *
                            Math.sin(
                              (Math.PI * (previousAngle + angle)) / 2 / 180
                            )
                        }
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pie-label"
                        fill="white"
                        fontSize="18"
                        fontWeight="bold"
                      >
                        {segment.percentage}%
                      </text>
                    </g>
                  );
                })}
                
                {/* Center circle */}
                <circle cx="200" cy="200" r="60" fill="#1a1a1a" />
                <text
                  x="200"
                  y="200"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#F3C969"
                  fontSize="16"
                  fontWeight="bold"
                >
                  100%
                </text>
              </svg>
            </div>

            {/* Legend & Details */}
            <div className="chart-legend">
              {economicSegments.map((segment) => (
                <div
                  key={segment.id}
                  className={`legend-item ${
                    selectedSegment === segment.id ? 'active' : ''
                  }`}
                  onMouseEnter={() => setSelectedSegment(segment.id)}
                  onMouseLeave={() => setSelectedSegment(null)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="legend-color"
                      style={{ backgroundColor: segment.color }}
                    ></div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1">
                        {segment.name}
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        {segment.description}
                      </p>
                      <p className="text-xs text-soft-gold">
                        Ví dụ: {segment.examples}
                      </p>
                      <div className="percentage-bar mt-2">
                        <div
                          className="percentage-fill"
                          style={{
                            width: `${segment.percentage}%`,
                            backgroundColor: segment.color,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {segment.percentage}%
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-soft-gold/10 border border-soft-gold/20 rounded-lg">
                <p className="text-sm text-gray-300 italic">
                  📊 <strong className="text-soft-gold">Lưu ý:</strong> Số liệu ước tính năm 2024, 
                  thể hiện sự đa dạng và cân bằng trong mô hình kinh tế thị trường 
                  định hướng xã hội chủ nghĩa của Việt Nam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnershipTypesSection;
