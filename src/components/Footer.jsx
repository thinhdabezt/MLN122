import { Mail, Github, BookOpen } from 'lucide-react';
import './Footer.css';

const Footer = ({ setActiveTab }) => {
  return (
    <footer className="main-footer">
      <div className="footer-container max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Footer Content */}
        <div className="footer-content">
          
          {/* Motto */}
          <div className="footer-motto">
            <p className="motto-text">
              "Hiểu lý luận – Vận dụng sáng tạo – Phát triển Việt Nam bền vững."
            </p>
          </div>

          {/* Logo */}
          <div className="footer-logo">
            <img 
              src="/images/logo-fptu.jpg" 
              alt="FPT University Logo" 
              className="logo-image"
            />
          </div>

          {/* Links */}
          <div className="footer-links">
            <a 
              href="https://github.com/thinhdabezt"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="w-5 h-5" />
              <span>Liên hệ</span>
            </a>

            <div className="footer-divider">&</div>

            <a 
              href="https://github.com/thinhdabezt"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
              <span>Credits</span>
            </a>

            <div className="footer-divider">|</div>

            <button 
              onClick={() => setActiveTab('references')}
              className="footer-link footer-button"
            >
              <BookOpen className="w-5 h-5" />
              <span>Nguồn tham khảo</span>
            </button>
          </div>

          {/* Separator Line */}
          <div className="footer-separator">
            <div className="separator-line"></div>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            {/* <p className="copyright-text">
              © 2024 Marx to Vietnam Project. Made with ❤️ by Thinh TD
            </p> */}
                        <p className="copyright-text">
              © 2025 Marx to Vietnam Project.
            </p>
            <p className="copyright-subtext">
              Dự án nghiên cứu về sở hữu và phân phối trong KTTT ĐHXHCN
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
