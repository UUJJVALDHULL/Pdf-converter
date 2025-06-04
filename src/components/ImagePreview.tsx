import React from 'react';
import { X } from 'lucide-react';
import { ImageFile } from './ImageToPdfConverter';

interface ImagePreviewProps {
  image: ImageFile;
  onRemove: (id: string) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, onRemove }) => {
  return (
    <div className="relative group rounded-lg overflow-hidden bg-gray-100 border border-gray-200 aspect-square">
      <img 
        src={image.preview} 
        alt={image.file.name}
        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute bottom-0 w-full px-2 py-1.5 text-white text-xs truncate">
          {image.file.name}
        </div>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(image.id);
        }}
        className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Remove image"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ImagePreview;