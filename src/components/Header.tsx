import React from "react";
import { FileImage, Facebook, Instagram, Phone, Twitter, X } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-black shadow-sm">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Left: Logo and Title */}
        <div className="flex items-center space-x-2">
          <FileImage className="h-8 w-8 text-blue-50" />
          <h1 className="text-xl font-semibold text-white">
            Image to PDF Converter
          </h1>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex items-center space-x-4">
          <a
            href="https://instagram.com/mr._.dhull"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-6 w-6 text-white hover:text-pink-500 transition" />
          </a>
          <a
            href="https://x.com/ud_dhull"
            target="_blank"
            rel="noopener noreferrer"
          >
            <X className="h-6 w-6 text-white hover:text-blue-500 transition" />
          </a>
          <a
            href="https://wa.me/+919996066275"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone className="h-6 w-6 text-white hover:text-green-500 transition" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
