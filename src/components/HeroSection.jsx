import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, ChevronDown } from 'lucide-react';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ setActiveTab }) => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const parallaxRef = useRef(null);
  const scrollHintRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fade-in animation cho nội dung
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set([contentRef.current], { opacity: 0, y: 50 });
      
      // Fade-in animation
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.3,
        ease: 'power3.out',
      });

      // Parallax effect cho background
      gsap.to(parallaxRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Scroll hint animation
      gsap.to(scrollHintRef.current, {
        y: 10,
        opacity: 0.7,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, heroRef);

    setIsLoaded(true);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={heroRef} className="hero-section relative h-screen overflow-hidden">
      {/* Background Parallax Layer */}
      <div ref={parallaxRef} className="parallax-bg absolute inset-0 w-full h-[120%] -top-[10%]">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-earth/30 via-transparent to-soft-gold/20 z-10"></div>
        
        {/* Vietnam City Background */}
        <div 
          className="vietnam-city-bg absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/vietnam-street.jpg')" }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="grid-pattern"></div>
          </div>
        </div>

        {/* Karl Marx Portrait - faded overlay */}
        <div 
          className={`marx-overlay absolute inset-0 bg-center bg-no-repeat bg-contain opacity-0 transition-opacity duration-[2000ms] ${
            isLoaded ? 'opacity-10' : ''
          }`}
          style={{
            backgroundImage: "url('/images/karl-marx-portrait.png')"
          }}
        ></div>

        {/* Animated Gears Overlay */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="gear-container">
            <div className="gear gear-1"></div>
            <div className="gear gear-2"></div>
            <div className="gear gear-3"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <div className="logo-container mb-8 transform hover:scale-110 transition-transform duration-300">
          <Globe className="w-16 h-16 md:w-20 md:h-20 text-soft-gold drop-shadow-lg animate-pulse-slow" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
          Từ Marx đến Việt Nam:
          <br />
          <span className="text-soft-gold">Sở hữu & Phân phối</span>
        </h1>

        {/* Subheading */}
        <h2 className="text-lg md:text-2xl lg:text-3xl text-smoke-gray font-light max-w-4xl mb-4 drop-shadow-lg">
          Khám phá lý luận – Trải nghiệm sáng tạo – Hiểu bản chất XHCN
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-300 max-w-3xl mb-12 leading-relaxed font-inter">
          Từ lý luận của Marx về quan hệ sản xuất đến thực tiễn Việt Nam – 
          nơi kinh tế thị trường và định hướng xã hội chủ nghĩa cùng tồn tại và phát triển.
          <span className="block mt-3 text-soft-gold font-medium">
            Hành trình khám phá sự giao thoa giữa triết học, kinh tế và thực tiễn đất nước.
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-16">
          <button 
            className="cta-button cta-primary group"
            onClick={() => setActiveTab('case-study')}
          >
            <span className="relative z-10">Tìm Hiểu Case Study</span>
            <div className="cta-shine"></div>
          </button>
          <button 
            className="cta-button cta-secondary group"
            onClick={() => setActiveTab('minigame')}
          >
            <span className="relative z-10">Chơi Minigame</span>
            <div className="cta-shine"></div>
          </button>
        </div>

        {/* Scroll Hint */}
        <div 
          ref={scrollHintRef}
          className="scroll-hint cursor-pointer"
          onClick={scrollToNext}
        >
          <ChevronDown className="w-8 h-8 text-soft-gold" />
          <span className="text-sm text-gray-400 mt-2">Cuộn xuống để khám phá</span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
    </section>
  );
};

export default HeroSection;
