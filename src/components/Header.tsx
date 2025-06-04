import React from 'react';
import { FileImage } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileImage className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">
            Image to PDF Converter
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;