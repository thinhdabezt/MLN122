import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Flag, 
  Factory, 
  TrendingUp, 
  Users, 
  Rocket,
  Calendar,
  MapPin,
  BookOpen
} from 'lucide-react';
import './TimelineSection.css';

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentScroll, setCurrentScroll] = useState(0);

  // Timeline data
  const milestones = [
    {
      year: 1986,
      title: 'Đổi Mới',
      subtitle: 'Khởi đầu chuyển đổi',
      icon: Flag,
      color: '#EF4444',
      image: '/images/timeline/doi-moi-1986.jpg',
      description: 'Đại hội VI Đảng Cộng sản Việt Nam khởi xướng chính sách Đổi Mới, chuyển từ nền kinh tế kế hoạch hóa tập trung sang kinh tế thị trường có sự quản lý của Nhà nước.',
      highlights: [
        'Công nhận nền kinh tế nhiều thành phần',
        'Đa dạng hóa hình thức sở hữu',
        'Mở cửa hội nhập kinh tế quốc tế',
        'Phá bỏ bao cấp, khuyến khích sản xuất'
      ],
      marxTheory: 'Vận dụng linh hoạt lý luận Marx về sở hữu và phân phối, không giáo조교条, phù hợp với điều kiện Việt Nam.',
      impact: 'GDP tăng trưởng từ âm sang dương, thoát khỏi khủng hoảng kinh tế - xã hội.'
    },
    {
      year: 1992,
      title: 'Hiến pháp 1992',
      subtitle: 'Pháp điển hóa Đổi Mới',
      icon: BookOpen,
      color: '#F59E0B',
      image: '/images/timeline/hien-phap-1992.jpg',
      description: 'Hiến pháp 1992 chính thức ghi nhận "Kinh tế thị trường định hướng xã hội chủ nghĩa" - mô hình độc đáo của Việt Nam, kết hợp Marx với thực tiễn dân tộc.',
      highlights: [
        'Pháp luật hóa kinh tế thị trường',
        'Bảo vệ đa dạng hình thức sở hữu',
        'Quyền tự do kinh doanh',
        'Vai trò định hướng của Nhà nước'
      ],
      marxTheory: 'Kế thừa tư tưởng Marx về vai trò Nhà nước trong quá trình chuyển đổi, nhưng công nhận động lực thị trường.',
      impact: 'Tạo khung pháp lý vững chắc cho phát triển kinh tế - xã hội bền vững.'
    },
    {
      year: 2000,
      title: 'Hội nhập WTO',
      subtitle: 'Bước tiến toàn cầu',
      icon: TrendingUp,
      color: '#10B981',
      image: '/images/timeline/wto-2007.jpg',
      description: 'Việt Nam gia nhập WTO (2007), đánh dấu hội nhập sâu rộng vào nền kinh tế toàn cầu. Kinh tế tư nhân và FDI bùng nổ, song vẫn giữ định hướng xã hội chủ nghĩa.',
      highlights: [
        'Mở cửa thị trường, thu hút FDI',
        'Kinh tế tư nhân chiếm 40% GDP',
        'Xuất khẩu tăng trưởng mạnh mẽ',
        'Công nghiệp hóa, hiện đại hóa'
      ],
      marxTheory: 'Vận dụng sáng tạo Marx: Hội nhập toàn cầu nhưng không "tự do hóa" vô tội vạ, vẫn định hướng XHCN.',
      impact: 'GDP tăng trưởng bình quân 6-7%/năm, Việt Nam thoát nghèo, trở thành nước thu nhập trung bình.'
    },
    {
      year: 2013,
      title: 'Hiến pháp 2013',
      subtitle: 'Hoàn thiện thể chế',
      icon: Users,
      color: '#3B82F6',
      image: '/images/timeline/hien-phap-2013.jpg',
      description: 'Hiến pháp 2013 hoàn thiện thể chế KTTTĐH XHCN, nhấn mạnh "Phát triển kinh tế gắn liền với tiến bộ và công bằng xã hội".',
      highlights: [
        'Bảo vệ quyền con người, dân chủ',
        'Quyền sở hữu tư nhân thần thánh',
        'Công bằng xã hội là ưu tiên',
        'Nhà nước pháp quyền XHCN'
      ],
      marxTheory: 'Phát triển tư tưởng Marx về con người - mục tiêu cao nhất của chủ nghĩa xã hội.',
      impact: 'Thể chế minh bạch, thu hút đầu tư, bảo vệ quyền lợi người lao động.'
    },
    {
      year: 2030,
      title: 'Tầm nhìn 2030',
      subtitle: 'Nước công nghiệp hiện đại',
      icon: Rocket,
      color: '#8B5CF6',
      image: '/images/timeline/vision-2030.jpg',
      description: 'Mục tiêu 2030: Việt Nam trở thành nước đang phát triển có công nghiệp hiện đại, thu nhập trung bình cao. 2045: Nước phát triển, thu nhập cao.',
      highlights: [
        'GDP bình quân đầu người: $7,500',
        'Kinh tế số, kinh tế xanh',
        'Năng suất lao động tăng gấp 2',
        'Phúc lợi xã hội toàn diện'
      ],
      marxTheory: 'Thực hiện ước mơ Marx: Giải phóng sức lao động, phát triển toàn diện con người trong kỷ nguyên số.',
      impact: 'Việt Nam trở thành "Con hổ châu Á" mới, mô hình XHCN thành công trong thời đại toàn cầu hóa.'
    }
  ];

  // Scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.timeline-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Timeline path animation
      gsap.from('.timeline-path', {
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
        },
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.5,
        ease: 'power2.out'
      });

      // Milestone items stagger
      gsap.from('.milestone-item', {
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Light propagation effect
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to('.timeline-glow', {
        x: '+=100%',
        duration: 3,
        ease: 'linear',
        modifiers: {
          x: (x) => parseFloat(x) % 100 + '%'
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollTimeline = (direction) => {
    if (!timelineRef.current) return;
    
    const scrollAmount = 400;
    const newScroll = direction === 'left' 
      ? Math.max(0, currentScroll - scrollAmount)
      : currentScroll + scrollAmount;
    
    timelineRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });
    
    setCurrentScroll(newScroll);
  };

  const openModal = (index) => {
    setActiveIndex(index);
    setShowModal(true);
    
    // Animate modal
    gsap.from('.timeline-modal', {
      scale: 0.5,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(1.7)'
    });
  };

  const closeModal = () => {
    gsap.to('.timeline-modal', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: () => setShowModal(false)
    });
  };

  return (
    <section ref={sectionRef} className="timeline-section py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="timeline-header text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-10 h-10 text-soft-gold" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Từ Marx đến Việt Nam – <span className="text-gradient bg-gradient-to-r from-red-earth via-soft-gold to-green-500 bg-clip-text text-transparent">Hành trình Đổi Mới</span>
            </h2>
          </div>
          <p className="text-xl text-smoke-gray font-serif italic">
            40 năm vận dụng sáng tạo tư tưởng Marx vào thực tiễn Việt Nam
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-wrapper relative">
          
          {/* Navigation Buttons */}
          <button
            onClick={() => scrollTimeline('left')}
            className="timeline-nav-btn left-0"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => scrollTimeline('right')}
            className="timeline-nav-btn right-0"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Timeline */}
          <div 
            ref={timelineRef}
            className="timeline-container"
            onScroll={(e) => setCurrentScroll(e.target.scrollLeft)}
          >
            <div className="timeline-track">
              
              {/* Timeline Path */}
              <div className="timeline-path">
                <div className="timeline-glow"></div>
              </div>

              {/* Milestones */}
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                return (
                  <div
                    key={milestone.year}
                    className="milestone-item"
                    onClick={() => openModal(index)}
                  >
                    {/* Icon Circle */}
                    <div 
                      className="milestone-circle"
                      style={{ 
                        background: `linear-gradient(135deg, ${milestone.color}, ${milestone.color}dd)` 
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                      <div className="milestone-pulse" style={{ borderColor: milestone.color }}></div>
                    </div>

                    {/* Content */}
                    <div className="milestone-content">
                      <div className="milestone-year" style={{ color: milestone.color }}>
                        {milestone.year}
                      </div>
                      <h3 className="milestone-title">{milestone.title}</h3>
                      <p className="milestone-subtitle">{milestone.subtitle}</p>
                      
                      {/* Hover Tooltip */}
                      <div className="milestone-tooltip">
                        <p className="text-xs text-smoke-gray">
                          Click để xem chi tiết →
                        </p>
                      </div>
                    </div>

                    {/* Connection Line to next */}
                    {index < milestones.length - 1 && (
                      <div className="milestone-connector"></div>
                    )}
                  </div>
                );
              })}

            </div>
          </div>

        </div>

        {/* Year Markers - thay cho slider */}
        <div className="year-markers flex items-center justify-center gap-4 md:gap-8 mt-12">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className="year-marker text-center cursor-pointer group"
              onClick={() => {
                const container = timelineRef.current;
                const milestoneElements = container.querySelectorAll('.timeline-milestone');
                const targetElement = milestoneElements[index];
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
              }}
            >
              <div 
                className="year-dot w-3 h-3 rounded-full mx-auto mb-2 transition-all duration-300 group-hover:scale-150"
                style={{ backgroundColor: milestone.color }}
              ></div>
              <div 
                className="year-text text-sm font-bold transition-colors duration-300 group-hover:text-soft-gold"
                style={{ color: milestone.color }}
              >
                {milestone.year}
              </div>
              <div className="year-label text-xs text-smoke-gray opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                {milestone.title.split('–')[0].trim()}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal */}
      {showModal && activeIndex !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="timeline-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="modal-close-btn"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="modal-content">
              
              {/* Header */}
              <div className="modal-header">
                <div 
                  className="modal-icon"
                  style={{ background: `linear-gradient(135deg, ${milestones[activeIndex].color}, ${milestones[activeIndex].color}dd)` }}
                >
                  {(() => {
                    const IconComponent = milestones[activeIndex].icon;
                    return <IconComponent className="w-10 h-10 text-white" />;
                  })()}
                </div>
                <div>
                  <div className="modal-year" style={{ color: milestones[activeIndex].color }}>
                    {milestones[activeIndex].year}
                  </div>
                  <h3 className="modal-title">{milestones[activeIndex].title}</h3>
                  <p className="modal-subtitle">{milestones[activeIndex].subtitle}</p>
                </div>
              </div>

              {/* Image Placeholder */}
              <div 
                className="modal-image"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${milestones[activeIndex].color}20, ${milestones[activeIndex].color}10)`
                }}
              >
                <div className="image-placeholder-icon">
                  <MapPin className="w-16 h-16 text-smoke-gray/30" />
                  <p className="text-smoke-gray/50 text-sm mt-2">
                    Thêm ảnh: {milestones[activeIndex].image}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="modal-description">
                <p className="text-smoke-gray leading-relaxed">
                  {milestones[activeIndex].description}
                </p>
              </div>

              {/* Highlights */}
              <div className="modal-section">
                <h4 className="section-title">
                  <TrendingUp className="w-5 h-5 text-soft-gold" />
                  Điểm nhấn chính sách
                </h4>
                <ul className="highlights-list">
                  {milestones[activeIndex].highlights.map((item, i) => (
                    <li key={i} className="highlight-item">
                      <span className="bullet" style={{ background: milestones[activeIndex].color }}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Marx Theory */}
              <div className="modal-section marx-section">
                <h4 className="section-title">
                  <BookOpen className="w-5 h-5 text-red-earth" />
                  Vận dụng Marx
                </h4>
                <p className="text-smoke-gray text-sm italic">
                  "{milestones[activeIndex].marxTheory}"
                </p>
              </div>

              {/* Impact */}
              <div className="modal-section impact-section">
                <h4 className="section-title">
                  <Rocket className="w-5 h-5 text-green-500" />
                  Tác động & Kết quả
                </h4>
                <p className="text-white font-semibold">
                  {milestones[activeIndex].impact}
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Background Decoration */}
      <div className="absolute top-20 left-10 w-60 h-60 bg-red-earth/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-soft-gold/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default TimelineSection;
