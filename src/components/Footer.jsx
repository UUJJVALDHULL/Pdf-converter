import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Image to PDF Converter. All rights reserved.</p>
        <p className="mt-2">Designed by Uujjval Dhull</p>
      </div>
    </footer>
  );
};

export default Footer;