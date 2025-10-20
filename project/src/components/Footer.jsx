import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-xl font-bold text-white">ElectronicsHub ⚡</h1>
          <p className="text-gray-400 text-sm">
            Your one-stop shop for electronics and gadgets.
          </p>
        </div>

        {/* Center: Social Media */}
        <div className="flex gap-6 mb-4 md:mb-0">
          <a href="https://www.linkedin.com/in/ganesh-borole-85a7862b0/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
            <FaLinkedin />
          </a>
          <a href="https://github.com/GaneshBorole" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
            <FaGithub />
          </a>
          <a href="https://www.instagram.com/__ganesh.07__/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
            <FaInstagram />
          </a>
        </div>

        {/* Right */}
        <div className="text-gray-400 text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} ElectronicsHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
