import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "New Arrivals", path: "/allproduct" },
      { name: "Best Sellers", path: "/allproduct" },
      { name: "Sale", path: "/allproduct" },
      { name: "Collections", path: "/allproduct" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Blog", path: "/blog" },
      { name: "Careers", path: "#" },
    ],
    support: [
      { name: "Help Center", path: "/clover-support" },
      { name: "Track Order", path: "/my-orders" },
      { name: "Returns", path: "#" },
      { name: "Shipping Info", path: "#" },
    ],
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-serif font-semibold">Clover</span>
            </Link>
            <p className="text-secondary-foreground/70 leading-relaxed mb-8 max-w-sm">
              Your destination for premium quality products. We curate the finest
              selections to elevate your everyday experience.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:support@clover.com"
                className="flex items-center gap-3 text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
              >
                <Mail size={18} />
                <span>support@clover.com</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
              >
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </a>
              <div className="flex items-start gap-3 text-secondary-foreground/70">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>123 Clover Street, Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold mb-6">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-foreground/60 text-sm">
              {currentYear} Clover. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
