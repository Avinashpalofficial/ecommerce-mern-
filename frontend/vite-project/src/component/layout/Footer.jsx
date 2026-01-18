import React from "react";
import { Typography } from "@material-tailwind/react";

const CLOVER_LINKS = [
  {
    title: "Company",
    links: ["About Us", "Our Team", "Careers"],
  },
  {
    title: "Resources",
    links: ["Blog", "Newsletter"],
  },
  {
    title: "Support",
    links: ["Contact Us", "Help Center"],
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {CLOVER_LINKS.map(({ title, links }, index) => (
            <div key={index}>
              <Typography
                variant="h6"
                className="mb-4 text-white font-semibold tracking-wide"
              >
                {title}
              </Typography>

              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li
                    key={i}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Typography variant="small" className="text-gray-400">
            © {currentYear} Clover • All Rights Reserved.
          </Typography>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {["facebook", "twitter", "instagram"].map((social) => (
              <button
                key={social}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-600 transition"
              >
                <i
                  className={`fa-brands fa-${social} text-white text-lg`}
                ></i>
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
