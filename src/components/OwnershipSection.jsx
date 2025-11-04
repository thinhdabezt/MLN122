import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Building2, TrendingUp, Heart } from "lucide-react";
import "./OwnershipSection.css";

gsap.registerPlugin(ScrollTrigger);

const OwnershipSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 100,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const concepts = [
    {
      icon: <Users className="w-12 h-12" />,
      title: "Sở hữu Xã hội",
      description:
        "Tài sản thuộc về cộng đồng, nhà nước đại diện cho lợi ích chung của nhân dân.",
      color: "from-red-earth to-red-600",
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      title: "Sở hữu Tư nhân",
      description:
        "Cá nhân hoặc doanh nghiệp sở hữu tài sản, được phép tích lũy và kinh doanh tự do.",
      color: "from-soft-gold to-yellow-600",
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Kinh tế Thị trường",
      description:
        "Cơ chế cung cầu điều tiết, khuyến khích cạnh tranh và đổi mới sáng tạo.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Định hướng XHCN",
      description:
        "Mục tiêu phát triển vì con người, đảm bảo công bằng và phúc lợi xã hội.",
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="ownership-section min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20 px-6 bg-no-repeat bg-center bg-cover"
      // style={{
      //   backgroundImage: "url('/images/ownership-bg.jpg')",
      // }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hệ thống <span className="text-soft-gold">Sở hữu & Phân phối</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Việt Nam đang xây dựng mô hình độc đáo: kinh tế thị trường định
            hướng xã hội chủ nghĩa - sự kết hợp hài hòa giữa hiệu quả và công
            bằng.
          </p>
        </div>

        {/* Concept Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {concepts.map((concept, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="concept-card group"
            >
              <div
                className={`icon-wrapper bg-gradient-to-br ${concept.color}`}
              >
                {concept.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-soft-gold transition-colors">
                {concept.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {concept.description}
              </p>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="mt-20 text-center">
          <blockquote className="quote-box">
            <p className="text-2xl md:text-3xl font-lora italic text-white mb-4">
              "Sự kết hợp giữa lý luận Marx và thực tiễn Việt Nam tạo nên con
              đường phát triển độc đáo và sáng tạo."
            </p>
            <cite className="text-soft-gold font-semibold">
              — Tư tưởng Hồ Chí Minh về chủ nghĩa xã hội
            </cite>
          </blockquote>
        </div>
      </div>
      {/* Decorative fade overlays - NOTE: Change color here if needed (currently gray-900) */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent z-10"></div>{" "}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
    </section>
  );
};

export default OwnershipSection;
