import React from 'react';
import { FileText } from 'lucide-react';

interface PdfSettingsProps {
  filename: string;
  setFilename: (filename: string) => void;
}

const PdfSettings: React.FC<PdfSettingsProps> = ({ filename, setFilename }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700 flex items-center">
        <FileText className="h-5 w-5 mr-2 text-blue-600" />
        PDF Settings
      </h3>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="filename" className="block text-sm font-medium text-gray-700 mb-1">
            Filename
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="filename"
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-8 py-2 sm:text-sm border border-gray-300 rounded-md"
              placeholder="Enter filename"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              .pdf
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfSettings;