import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, Image } from 'lucide-react';

interface ImageDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.bmp', '.tiff']
    },
    multiple: true
  });

  let dropzoneClassName = 'border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors';
  
  if (isDragActive && isDragAccept) {
    dropzoneClassName += ' border-blue-500 bg-blue-50';
  } else if (isDragReject) {
    dropzoneClassName += ' border-red-500 bg-red-50';
  } else {
    dropzoneClassName += ' border-gray-300 hover:border-blue-400 hover:bg-blue-50';
  }

  return (
    <div 
      {...getRootProps()} 
      className={dropzoneClassName}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <FileUp className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
        ) : (
          <Image className="h-12 w-12 text-gray-400 mb-4 mx-auto" />
        )}
        
        <p className="text-lg font-medium text-gray-700 mb-2">
          {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          or <span className="text-blue-600">browse files</span>
        </p>
        <p className="text-xs text-gray-400">
          Supports JPG, PNG, GIF, WEBP and other image formats
        </p>
      </div>
    </div>
  );
};

export default ImageDropzone;