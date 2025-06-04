import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FileUp, Trash2, FilePlus, Download } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';
import ImageDropzone from './ImageDropzone';
import ImagePreview from './ImagePreview';
import PdfSettings from './PdfSettings';

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

const ImageToPdfConverter = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filename, setFilename] = useState('my-document');
  
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const newImages = acceptedFiles.map(file => ({
        id: `image-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  }, []);

  const handleRemoveImage = useCallback((id: string) => {
    setImages(prevImages => {
      const filteredImages = prevImages.filter(image => image.id !== id);
      return filteredImages;
    });
  }, []);

  const handleClearAll = useCallback(() => {
    // Release object URLs to avoid memory leaks
    images.forEach(image => URL.revokeObjectURL(image.preview));
    setImages([]);
  }, [images]);

  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setImages(items);
  }, [images]);

  const handleGeneratePDF = useCallback(async () => {
    if (images.length === 0) return;
    
    setIsGenerating(true);
    try {
      await generatePDF(images, filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [images, filename]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Convert Images to PDF
        </h2>
        
        <ImageDropzone onDrop={handleDrop} />
        
        {images.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700">
                {images.length} {images.length === 1 ? 'Image' : 'Images'} Selected
              </h3>
              <button
                onClick={handleClearAll}
                className="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </button>
            </div>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="images" direction="horizontal">
                {(provided) => (
                  <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                  >
                    {images.map((image, index) => (
                      <Draggable key={image.id} draggableId={image.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ImagePreview 
                              image={image} 
                              onRemove={handleRemoveImage} 
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <PdfSettings 
                filename={filename} 
                setFilename={setFilename} 
              />
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleGeneratePDF}
                  disabled={isGenerating}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                        <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5 mr-2" />
                      Generate & Download PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToPdfConverter;