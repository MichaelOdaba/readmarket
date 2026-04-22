import {
  Copyright,
  Facebook,
  Github,
  Instagram,
  Twitter,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = {
    Product: ["Browse", "Search", "Upload", "Categories"],
    Company: ["About Us", "Contact", "Blog", "Careers"],
    Legal: ["Privacy Policy", "Terms of Service", "Contact Support"],
    Resources: ["FAQ", "Documentation", "Community", "API"],
  };

  const handleNavigation = (path: string) => {
    navigate(`/${path.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <footer className="bg-gradient-to-b from-white to-neutral-50 border-t border-neutral-200 mt-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex gap-2 items-center mb-4">
              <BookOpen className="text-accent" size={28} />
              <div>
                <p className="font-bold text-primary text-lg">
                  READ <span className="text-secondary">MARKET</span>
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Your premier platform for discovering and sharing educational
              content.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-primary mb-4 text-sm uppercase tracking-wide">
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.Product.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNavigation(link)}
                    className="text-sm text-neutral-600 hover:text-primary transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-primary mb-4 text-sm uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.Company.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNavigation(link)}
                    className="text-sm text-neutral-600 hover:text-primary transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links (Mobile: Hidden, Tablet+: Visible) */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-primary mb-4 text-sm uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.Resources.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNavigation(link)}
                    className="text-sm text-neutral-600 hover:text-primary transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200"></div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center gap-2 text-neutral-600 text-sm">
            <Copyright size={16} />
            <p>2026 ReadMarket. All Rights Reserved.</p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
            {footerLinks.Legal.map((link) => (
              <button
                key={link}
                onClick={() => handleNavigation(link)}
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
